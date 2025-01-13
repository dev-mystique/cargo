import './App.css';

import {useTranslation} from "react-i18next";
import Registration from "./components/Registration.jsx";
import {LanguageSwitcher} from "./components/LanguageSwitcher.jsx";
import CountryList from "./components/Country.jsx";

function App() {

    const {t} = useTranslation("common");

    return (
        <div className="App">
            <LanguageSwitcher/>
            <Registration/>
        </div>
    );
}

export default App;

