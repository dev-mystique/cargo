import React, {useEffect, useState} from "react";
import {useAuth} from "../../context/AuthProvider.jsx";
import apiClient from "../../axios/apiClient.js";

const AuthFirstPage = () => {
    const auth = useAuth();
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await apiClient.get(
                    'api/me',
                    {
                        headers: {
                            'Authorization': `Bearer ${auth.token}`,
                        }
                    }
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }
                const data = await response.json();
                auth.setUser(data.user); // Assuming your `useAuth` provides a `setUser` method
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [auth]);

    return (
        <div className="container">
            <div>
                <h1>Welcome! {auth.user?.company?.company_name}</h1>
                <button onClick={() => auth.logOut()} className="btn-submit">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default AuthFirstPage;
