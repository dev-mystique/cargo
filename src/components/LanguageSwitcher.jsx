import {useTranslation} from "react-i18next";

export const LanguageSwitcher = () => {
    const [t, i18n] = useTranslation('common');
    return (
        <div
            style={{
                position: 'fixed',
                top: '10px',
                right: '10px',
                zIndex: 1000, // Ensure it stays on top
            }}
        >
            <select
                onChange={(e) => i18n.changeLanguage(e.target.value)}
                defaultValue={i18n.language}
                style={{
                    padding: '5px',
                    fontSize: '14px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                <option value="ru">Россия</option>
                <option value="ka">ქართული</option>
                <option value="en">English</option>
            </select>
        </div>
    );
}