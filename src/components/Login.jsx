"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useAuth } from "../context/AuthProvider.jsx"

function Login(props) {
    const [login, setLogin] = useState({
        email: "",
        password: "",
    })
    const auth = useAuth()
    const { t } = useTranslation("common")

    const handleChange = (e) => {
        const { name, value } = e.target
        setLogin((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        try {
            const response = await auth.loginAction(login)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="w-full max-w-md mx-auto px-4 sm:px-6 md:px-8">
            <div className="space-y-4 sm:space-y-5">
                <label className="input input-bordered flex items-center gap-2 w-full">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70 flex-shrink-0"
                    >
                        <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input
                        onChange={handleChange}
                        type="text"
                        className="grow"
                        name="email"
                        value={login.email}
                        placeholder="Email"
                    />
                </label>

                <label className="input input-bordered flex items-center gap-2 w-full">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70 flex-shrink-0"
                    >
                        <path
                            fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <input
                        type="password"
                        name="password"
                        className="grow"
                        placeholder="Password"
                        value={login.password}
                        onChange={handleChange}
                    />
                </label>

                <div className="flex justify-center items-center w-full text-center">
                    <p className="text-white text-sm sm:text-base">
                        Don&#39;t have an account?{" "}
                        <a href="/register" className="text-blue-400 hover:text-blue-300 underline">
                            Register here
                        </a>
                    </p>
                </div>

                <div className="flex justify-center items-center w-full">
                    <button
                        onClick={handleSubmit}
                        className="btn w-full sm:btn-wide px-4 sm:px-6 py-2 rounded-lg hover:bg-amber-500 text-sm sm:text-base"
                    >
                        {t("login")}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login

