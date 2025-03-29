import {useTranslation} from "react-i18next";
import {Navigate, Route, Routes} from "react-router-dom";
import {useAuth} from "./context/AuthProvider.jsx";
import Registration from "./components/Registration.jsx";
import Login from "./components/Login.jsx";
import PrivateRoute from "./components/private/PrivateRoute.jsx";
import {LanguageSwitcher} from "./components/language-switcher-pill.jsx";
import bg from "./assets/ngapp.jpg";
import WelcomePage from "./components/private/AuthFirstPage.jsx";

const ProtectedRoute = ({children}) => {
    const {isAuthenticated} = useAuth();
    return isAuthenticated ? children : <Navigate to="/login"/>;
};

function App() {
    const {t} = useTranslation("common");

    return (
        <>
            <div className="h-screen w-full fixed z-0 bg-cover bg-center" style={{ backgroundImage: `url(${bg})` }}>
            </div>
        <div
            className="bg-transparent flex items-center z-[1] justify-center w-full"
        >
            <LanguageSwitcher/>

            {/* Transparent Container for Forms */}
            <div className=" p-8 rounded-lg shadow-lg backdrop-blur-md border-1 border-white">
                <Routes>
                    <Route path="/register" element={<Registration/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route element={<PrivateRoute/>}>
                        <Route path="/dashboard" element={<WelcomePage/>}/>
                    </Route>
                    <Route path='/' element={<Login/>}/>
                </Routes>
            </div>
        </div>
        </>
    );
}

export default App;
