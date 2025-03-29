"use client"

import { useTranslation } from "react-i18next"
import { useEffect, useState, useRef } from "react"
import { Globe, Check } from "lucide-react"

export const LanguageSwitcher = () => {
    const { t, i18n } = useTranslation("common")
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)

    // Language options with flags and labels
    const languages = [
        { code: "en", label: "English", flag: "🇬🇧" },
        { code: "ru", label: "Русский", flag: "🇷🇺" },
        { code: "ka", label: "ქართული", flag: "🇬🇪" },
    ]

    // Find current language
    const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0]

    // Load the saved language from localStorage when the component mounts
    useEffect(() => {
        const savedLanguage = localStorage.getItem("i18nextLng")
        if (savedLanguage && savedLanguage !== i18n.language) {
            i18n.changeLanguage(savedLanguage)
        }
    }, [i18n])

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const handleChangeLanguage = (languageCode) => {
        i18n.changeLanguage(languageCode)
        localStorage.setItem("i18nextLng", languageCode)
        setIsOpen(false)
    }

    return (
        <div className="fixed top-4 right-4 z-50" ref={dropdownRef}>
            <div className="relative">
                {/* Current language button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center backdrop-blur-md bg-white/40 border border-white/40 rounded-full px-3 py-2 text-sm font-medium shadow-sm hover:bg-white/50 transition-all duration-200"
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                >
                    <Globe className="w-4 h-4 text-gray-600 mr-2" />
                    <span className="mr-1">{currentLanguage.flag}</span>
                </button>

                {/* Dropdown menu */}
                <div
                    className={`absolute right-0 mt-2 backdrop-blur-md bg-white/60 border border-white/40 rounded-lg shadow-lg overflow-hidden transition-all duration-200 ${
                        isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
                >
                    <div className="p-2 space-y-1">
                        {languages.map((language) => (
                            <button
                                key={language.code}
                                className={`flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors ${
                                    language.code === i18n.language ? "bg-white/70 font-medium" : "hover:bg-white/40"
                                }`}
                                onClick={() => handleChangeLanguage(language.code)}
                            >
                                <span className="mr-2 text-base">{language.flag}</span>
                                <span className="flex-1 text-left">{language.label}</span>
                                {language.code === i18n.language && <Check className="w-4 h-4 text-green-500" />}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

