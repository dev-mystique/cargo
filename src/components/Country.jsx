import {useEffect, useState} from 'react';
import axios from 'axios';

const CountryList = () => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('https://restcountries.com/v3.1/all');
                const countryData = response.data.map((country, index) => ({
                    id: index + 1,
                    name: country.name.common,
                    flag: country.flags.svg,
                }));
                setCountries(countryData);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };
        fetchCountries();
    }, []);

    return (
        <div>
            <h1>Country List</h1>
            <ul>
                {countries.map((country) => (
                    <li key={country.id}>
                        <img src={country.flag} alt={`${country.name} flag`} width={30}/>
                        {country.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CountryList;
