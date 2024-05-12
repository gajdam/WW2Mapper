import { useState } from 'react';
import axios from 'axios';

const Locations = () => {
    const [locations, setLocations] = useState([]);
    const [locationQuery, setLocationQuery] = useState('WW2 places, France');

    const handleSearch = async () => {
        try {
            const response = await axios.post('https://localhost:7131/WeatherForecast', {
                textQuery: locationQuery
            });
            if (Array.isArray(response.data.places)) {
                setLocations(response.data.places);
            } else {
                console.error('Unexpected response format:', response.data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={locationQuery}
                onChange={e => setLocationQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            <ul>
                {locations.map((location, index) => (
                    <li key={index}>
                        <p>{location.displayName.text}</p>
                        <p>{location.formattedAddress}</p>
                        <p>
                            {location.types.includes('historical_landmark') && 'Historical Landmark'}
                            {location.types.includes('point_of_interest') && 'Point of Interest'}
                            {location.types.includes('establishment') && 'Establishment'}
                            {location.types.includes('tourist_attraction') && 'Tourist Attraction'}
                            {location.types.includes('museum') && 'Museum'}
                        </p>
                        <p>Language Code: {location.displayName.languageCode}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Locations;
