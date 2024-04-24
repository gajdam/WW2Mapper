import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function MapComponent({ location, pins }) {
    const mapRef = useRef(null);

    useEffect(() => {
        // Initialize map
        const center = location ? [location.lat, location.lng] : [50, 10];
        if (!mapRef.current) {
            mapRef.current = L.map('map', {zoomControl: false}).setView(center, 8);

            // Add base layer
            L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 10
            }).addTo(mapRef.current);
        }

        // Add markers
        pins.forEach(pin => {
            L.marker([pin.lat, pin.lng]).addTo(mapRef.current);
        });
    }, [location, pins]);

    return <div id="map" style={{ width: '100%', height: '100vh' }}></div>;
}

MapComponent.propTypes = {
    location: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired
    }),
    pins: PropTypes.arrayOf(
        PropTypes.shape({
            lat: PropTypes.number.isRequired,
            lng: PropTypes.number.isRequired
        })
    ).isRequired
};

export default MapComponent;