import { useState } from 'react';
import axios from 'axios';

const Locations = () => {
    const [locations, setLocations] = useState([]);
    const [locationQuery, setLocationQuery] = useState('WW2 places, France');

    const handleSearch = async () => {
    try {
        const query = "ww2 places, Poland"
        const response = await axios.post(`https://localhost:7131/GetPlaceByQuery/${query}`);
        console.log('Response:', response.data.places);
        if (Array.isArray(response.data.places)) {
            const combinedData = [];

            // Call GeocodePlace for each location
            for (const place of response.data.places) {
                try {
                    const geocodeResponse = await axios.post(`https://localhost:7131/Geocode/${place.formattedAddress}`);
                    console.log('Geocode response:', geocodeResponse.data);

                    // Combine the location data and the geocode data
                    const combinedLocation = {
                        displayName: place.displayName,
                        formattedAddress: place.formattedAddress,
                        types: place.types,
                        geocode: geocodeResponse.data.results[0].geometry.location
                    };

                    combinedData.push(combinedLocation);
                } catch (error) {
                    console.error('Geocode error:', error);
                }
            }

            setLocations(combinedData);
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
                {locations.map((place, index) => (
                    <li key={index}>
                        <p>{place.displayName.text}</p>
                        <p>{place.formattedAddress}</p>
                        {place.geocode && (
                            <>
                                <p>Latitude: {place.geocode.lat}</p>
                                <p>Longitude: {place.geocode.lng}</p>
                            </>
                        )}
                        <p>
                            {place.types.includes('historical_landmark') && 'Historical Landmark'}
                            {place.types.includes('point_of_interest') && 'Point of Interest'}
                            {place.types.includes('establishment') && 'Establishment'}
                            {place.types.includes('tourist_attraction') && 'Tourist Attraction'}
                            {place.types.includes('museum') && 'Museum'}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Locations;
