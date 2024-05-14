import { useState } from 'react';
import axios from 'axios';

export const Locations = () => {
    const [locations, setLocations] = useState([]);

    const handleSearch = async (query) => {
        try {
            const types = ["war footprint", "museum", "memorial"]
            const queries = ["ww2 places", "ww2 museums", "ww2 memorial"].map(q => q + ", " + query);
            const combinedData = [];

            for (const textQuery of queries) {
                const response = await axios.post(`https://localhost:7131/GetPlaceByQuery/${textQuery}`);
                console.log('Response:', response.data.places);
                if (Array.isArray(response.data.places)) {
                    // Call GeocodePlace for each unique location
                    for (const place of response.data.places) {
                        // Check if the location is already in the combinedData array
                        if (!combinedData.some(data => data.formattedAddress === place.formattedAddress)) {
                            try {
                                const geocodeResponse = await axios.post(`https://localhost:7131/Geocode/${place.formattedAddress}`);
                                console.log('Geocode response:', geocodeResponse.data);

                                // Combine the location data and the geocode data
                                const combinedLocation = {
                                    displayName: place.displayName,
                                    formattedAddress: place.formattedAddress,
                                    types: place.types,
                                    geocode: geocodeResponse.data.results[0].geometry.location,
                                    locationType: types[queries.indexOf(textQuery)]
                                };

                                combinedData.push(combinedLocation);
                            } catch (error) {
                                console.error('Geocode error:', error);
                            }
                        }
                    }
                } else {
                    console.error('Unexpected response format:', response.data);
                }
            }

            setLocations(combinedData);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return { locations, handleSearch };
};