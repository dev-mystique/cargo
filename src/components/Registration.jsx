import {useState, useEffect, useRef} from 'react';
import apiClient from "../axios/apiClient.js";
import {useTranslation} from "react-i18next";
import countries from '../assets/country.json';

const SignUpForm = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
        password_confirmation: "",
        user_type: ""

    });
    const {t} = useTranslation("common");

    const [, setErrors] = useState({});

    const dropdownRef = useRef(null);

    useEffect(() => {
        const closeOnOutsideClick = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("click", closeOnOutsideClick);
        return () => document.removeEventListener("click", closeOnOutsideClick);
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;

        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    };

    const handleSubmit = async (e) => {
        console.log(user)
        let newErrors = {};
        e.preventDefault();
        try {
            const response = await apiClient.post('/api/user', user);
            console.log(response.data);
            newErrors = response.errors;
            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
            }

        } catch (error) {
            newErrors = error.response.data.errors
            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
            }
        }
    }

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCountries, setFilteredCountries] = useState(countries);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleSearch = (event) => {
        const searchValue = event.target.value.toLowerCase();
        setSearchTerm(searchValue);

        const filtered = countries.filter((country) =>
            country.name.toLowerCase().includes(searchValue)
        );
        setFilteredCountries(filtered);
        setShowDropdown(true);
    };

    const handleSelect = (country) => {
        console.log('Selected Country:', country);
        setSearchTerm(country.name);
        setUser((prevState) => ({
            ...prevState,
            national_id: country.name,
        }))
        setShowDropdown(false);
    };
    useEffect(() => {
        const closeOnOutsideClick = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("click", closeOnOutsideClick);
        return () => document.removeEventListener("click", closeOnOutsideClick);
    }, []);


    return (
        <div className='space-y-5'>
            <span>{t('registration')}</span>
            <label className="input input-bordered flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                        d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"/>
                    <path
                        d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"/>
                </svg>
                <input
                    type="email"
                    name="email"
                    className="grow"
                    placeholder="Email"
                    value={user.email}
                    onChange={handleChange}
                />
            </label> {/* email*/}
            <label className="form-control w-full max-w-xs">
                <select
                    onChange={handleChange}
                    name='user_type' className="select select-bordered">
                    <option disabled selected>User type</option>
                    <option value="individual">Individual</option>
                    <option value="company">Company</option>
                </select>
            </label>{/* user type */}
            {user.user_type === "individual" && (
                <div className='space-y-5'>
                    <div className="form-control w-full max-w-xs relative">
                        <label className="label">Select Country</label>
                        {/* Search Input */}
                        <input
                            type="text"
                            placeholder="Search country..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="input input-bordered"
                        />

                        {showDropdown && (
                            <div
                                ref={dropdownRef}
                                className=" bg-black no mt-[20px] w-full max-h-40 overflow-y-auto border border-gray-300 rounded-md shadow-lg">
                                {filteredCountries.slice(0, 10).map((country) => (
                                    <div
                                        key={country.id}
                                        onClick={() => handleSelect(country)}
                                        className="cursor-pointer p-2 hover:bg-cyan-950 flex items-center"
                                    >
                                        <img
                                            src={country.flag}
                                            alt={country.name}
                                            className="w-5 h-5 mr-2"
                                        />
                                        {country.name}
                                    </div>
                                ))}

                                {filteredCountries.length === 0 && (
                                    <div className="p-2 text-gray-500 text-center">
                                        No results found
                                    </div>
                                )}
                            </div>
                        )}
                    </div>{/* country */}
                    <label className="input input-bordered flex items-center gap-2">
                        <input
                            type="text"
                            name="phone_number"
                            className="grow"
                            placeholder="Phone number"
                            value={user.phone_number}
                            onChange={handleChange}
                        />
                    </label> {/* phone number*/}
                    <label className="input input-bordered flex items-center gap-2">
                        <input
                            type="text"
                            name="full_name"
                            className="grow"
                            placeholder="Full Name"
                            value={user.full_name}
                            onChange={handleChange}
                        />
                    </label>{/* Full name*/}
                    <label className="input input-bordered flex items-center gap-2">
                        <input
                            type="date"
                            name="birth_date"
                            className="grow"
                            placeholder="Date of birth"
                            value={user.birth_date}
                            onChange={handleChange}
                        />
                    </label>{/* date of birth*/}
                    <label className="form-control w-full max-w-xs">
                        <select
                            onChange={handleChange}
                            name='gender' className="select select-bordered">
                            <option disabled selected>Select sex</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </label>{/* gender*/}
                </div> // individual
            )}
            {user.user_type === "company" && (
                <div className='space-y-5'>
                    <label className="input input-bordered flex items-center gap-2">
                        <input
                            type="text"
                            name="company_name"
                            className="grow"
                            placeholder="Company Name"
                            value={user.company_name}
                            onChange={handleChange}
                        />
                    </label> {/* company name*/}
                    <label className="input input-bordered flex items-center gap-2">
                        <input
                            type="text"
                            name="tax_id"
                            className="grow"
                            placeholder="Tax number"
                            value={user.tax_id}
                            onChange={handleChange}
                        />
                    </label>{/* tax number*/}
                    <label className="input input-bordered flex items-center gap-2">
                        <input
                            type="text"
                            name="company_phone"
                            className="grow"
                            placeholder="Telephone number"
                            value={user.company_phone}
                            onChange={handleChange}
                        />
                    </label>{/* company phone*/}
                </div>
            )}

            <label className="input input-bordered flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                        fillRule="evenodd"
                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                        clipRule="evenodd"/>
                </svg>
                <input
                    type="password"
                    name="password"
                    className="grow"
                    placeholder="Password"
                    value={user.password}
                    onChange={handleChange}
                />
            </label>{/* password */}

            <label className="input input-bordered flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                        fillRule="evenodd"
                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                        clipRule="evenodd"/>
                </svg>
                <input
                    type="password"
                    name="password_confirmation"
                    className="grow"
                    placeholder="Confirm Password"
                    value={user.password_confirmation}
                    onChange={handleChange}
                />
            </label>{/* password confirmation */}

            <button onClick={handleSubmit} className="btn btn-wide">{t('signup')}</button>
        </div>
    );
}

export default SignUpForm;
