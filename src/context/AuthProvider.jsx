import React, {createContext, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import apiClient from "../axios/apiClient.js";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("site") || "");
    const navigate = useNavigate();

    const signUpAction = async (res)=>{
        setUser(res.data.user);
        setToken(res.data.token);
        localStorage.setItem("site", res.data.token);
        navigate("/dashboard");
        return res;
    }
    const loginAction = async (data) => {
        try {
            const response = await apiClient.post('/api/login', data);
            const res = await response;
            if (res.data) {
                setUser(res.data.user);
                setToken(res.data.token);
                localStorage.setItem("site", res.data.token);
                navigate("/dashboard");
                return res;
            }
            throw new Error(res.message);
        } catch (err) {
            console.error(err);
            return err;

        }
    };
    const logOut = async () => {
        const response = await apiClient.post(
            'api/logout',
            {},
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }
        );

        if (response.status === 200) {
            setUser(null);
            setToken("");
            localStorage.removeItem("site");
            navigate("/login");
            return true
        }
        return false;
    };


    return (
        <AuthContext.Provider value={{token, user,setUser, loginAction, logOut,signUpAction}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);