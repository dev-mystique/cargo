import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App'
import {I18nextProvider} from "react-i18next";
import i18next from "i18next";

import {AuthProvider} from "./context/AuthProvider.jsx";
import common_ka from "./translations/ka/common.json";
import common_en from "./translations/en/common.json";
import common_ru from "./translations/ru/common.json";


i18next.init({
    interpolation: {escapeValue: false},
    lng: 'en',
    resources: {
        en: {
            common: common_en
        },
        ka: {
            common: common_ka
        },
        ru: {
            common: common_ru
        },
    },
});

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <I18nextProvider i18n={i18next}>
            <AuthProvider>
                <App/>
            </AuthProvider>
        </I18nextProvider>
    </StrictMode>,
)
