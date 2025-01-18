import './App.css';

import {useTranslation} from "react-i18next";
import Registration from "./components/Registration.jsx";
import {LanguageSwitcher} from "./components/LanguageSwitcher.jsx";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import {useAuth} from "./context/AuthProvider.jsx";
import Login from "./components/Login.jsx";
import bg from "./assets/ngapp.jpg";
import AuthFirstPage from "./components/private/AuthFirstPage.jsx";
import PrivateRoute from "./components/private/PrivateRoute.jsx";

const ProtectedRoute = ({children}) => {
    const {isAuthenticated} = useAuth();
    return isAuthenticated ? children : <Navigate to="/login"/>;
};

function App() {
    const {t} = useTranslation("common");
    return (
        <div
            style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh', // Ensures the background covers the full viewport
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
                <LanguageSwitcher/>
                <Routes>
                    <Route
                        path="/register"
                        element={
                            <div className="d-flex flex-col align-items-center justify-content-center">
                                <Registration/>
                            </div>
                        }
                    />
                    <Route path="/login" element={<Login/>}/>
                    <Route element={<PrivateRoute/>}>
                        <Route path="/dashboard" element={<AuthFirstPage/>}/>
                    </Route>
                </Routes>
        </div>
    );
}

export default App;

