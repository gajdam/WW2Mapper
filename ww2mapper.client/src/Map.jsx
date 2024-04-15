import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';

function MapComponent({ location }) {
    const mapRef = useRef(null);

    useEffect(() => {
        if (!mapRef.current) {
            mapRef.current = L.map('map', {zoomControl: false}).setView([50, 10], 5); // Default to middle of Western Europe
            L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
                subdomains: 'abcd',
                maxZoom: 10
            }).addTo(mapRef.current);
        }
    }, []);

    useEffect(() => {
        if (location) {
            fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=your-google-api-key`)
                .then(response => response.json())
                .then(data => {
                    const { lat, lng } = data.results[0].geometry.location;
                    mapRef.current.setView([lat, lng], 13);
                });
        }
    }, [location]);

    useEffect(() => {
        // Resize the map when the window is resized
        const resizeMap = () => {
            if (mapRef.current) {
                mapRef.current.invalidateSize();
            }
        };

        window.addEventListener('resize', resizeMap);

        return () => {
            window.removeEventListener('resize', resizeMap);
        };
    }, []);

    return <div id="map" style={{ width: '100%', height: '100vh' }}></div>;
}


MapComponent.propTypes = { location: PropTypes.string };

export default MapComponent;