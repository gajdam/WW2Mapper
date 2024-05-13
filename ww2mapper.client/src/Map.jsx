import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Locations } from './api';
import axios from 'axios';

function MapComponent({ location }) {
    const {locations, handleSearch} = Locations();
    const [defaultLocation, setDefaultLocation] = useState();
    const mapRef = useRef(null);

    useEffect(() => { 
        handleSearch(location ? location : 'France');
    }, []);

    useEffect(() => {
        const fetchLocationData = async () => {
            const response = await axios.post(`https://localhost:7131/Geocode/${location}`);
            console.log('Geocode response:', response.data);
            setDefaultLocation(response.data.results[0].geometry.location);
        };

        fetchLocationData();
    }, [location]); // Removed setDefaultLocation from the dependency array

    useEffect(() => {
        // Initialize map
        console.log('defaultLocation variable:', defaultLocation);
        const center = defaultLocation ? [defaultLocation.lat, defaultLocation.lng] : [50, 10];
        if (!mapRef.current) {
            mapRef.current = L.map('map', {zoomControl: false}).setView(center, 8);

            // Add base layer
            L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 10
            }).addTo(mapRef.current);
        } else {
            mapRef.current.setView(center, 8); // Added this line to update the map view when defaultLocation changes
        }
        if (locations && locations.length > 0) {
            locations.forEach(location => {
                L.marker([location.geocode.lat, location.geocode.lng]).addTo(mapRef.current);
            });
        }
    }, [defaultLocation, locations]); // Added defaultLocation to the dependency array

    return <div id="map" style={{ width: '100%', height: '100vh' }}></div>;
}

MapComponent.propTypes = {
    location: PropTypes.string
};

export default MapComponent;