import {useEffect, useState} from "react";
import {useAuth} from "../../context/AuthProvider.jsx";
import apiClient from "../../axios/apiClient.js";
import plus from "../../assets/plus.svg";

const AuthFirstPage = () => {
    const auth = useAuth();
    const [profile, setProfile] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await apiClient.get(
                    "api/me",
                    {
                        headers: {
                            Authorization: `Bearer ${auth.token}`,
                        },
                    }
                );
                if (response.status !== 200) {
                    console.log(response.status);
                    throw new Error("Failed to fetch user data");
                }
                setProfile(response.data.profile || []);
                console.log(response.data.user);
                const data = response.data.user;
                auth.setUser(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [auth.token]);

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 space-y-6">
                <h1 className="text-3xl font-semibold text-gray-800 text-center">
                    Welcome!{" "}
                    {auth.user?.company?.name
                        ? auth.user.company.name
                        : auth.user?.individual?.full_name}
                </h1>


                <div className="text-center">
                    <p className="text-lg font-medium text-green-600">
                        Profile exists
                    </p>
                </div>

                <div className="text-center d-flex flex-row align-items-center justify-center">
                    <div>
                        <p className="text-xl mb-4">
                            <img src={plus} alt="Add new profile" className="w-12 h-12 mx-auto"/>
                        </p>
                        <button
                            className="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
                        >
                            Add Cargo profile
                        </button>
                    </div>
                    <div>
                        <p className="text-xl mb-4">
                            <img src={plus} alt="Add new profile" className="w-12 h-12 mx-auto"/>
                        </p>
                        <button
                            className="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
                        >
                            Add Transporter profile
                        </button>
                    </div>
                </div>


                <div className="text-center">
                    <button
                        onClick={() => auth.logOut()}
                        className="w-full py-2 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthFirstPage;
