import { useState } from 'react';
import axios from 'axios';

export const Locations = () => {
    const [locations, setLocations] = useState([]);

    const handleSearch = async (query) => {
    try {
        const textQuery = "ww2 places, " + query;
        const response = await axios.post(`https://localhost:7131/GetPlaceByQuery/${textQuery}`);
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
    return { locations, handleSearch };
};