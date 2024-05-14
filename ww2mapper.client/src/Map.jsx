import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function MapComponent({ locations, defaultLocation }) {
    const mapRef = useRef(null);
    const [markers, setMarkers] = useState([]); // Added this line

    useEffect(() => {
        // Initialize map
        const center = defaultLocation ? [defaultLocation.lat, defaultLocation.lng] : [50, 10];
        if (!mapRef.current) {
            mapRef.current = L.map('map', {zoomControl: false}).setView(center, 8);

            // Add base layer
            L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 10
            }).addTo(mapRef.current);
        } else {
            mapRef.current.setView(center, 8);
        }

        // Remove old markers
        markers.forEach(marker => {
            mapRef.current.removeLayer(marker);
        });

        // Add new markers
        const newMarkers = [];
        if (locations && locations.length > 0) {
            locations.forEach(location => {
                const marker = L.marker([location.geocode.lat, location.geocode.lng]).addTo(mapRef.current);
                newMarkers.push(marker);
            });
        }
        setMarkers(newMarkers); // Update the markers state
    }, [defaultLocation, locations]);

    return <div id="map" style={{ width: '100%', height: '100vh' }}></div>;
}

MapComponent.propTypes = {
    defaultLocation: PropTypes.arrayOf(PropTypes.number),
    locations: PropTypes.arrayOf(PropTypes.shape({
        displayName: PropTypes.string.isRequired,
        formattedAddress: PropTypes.string.isRequired,
        types: PropTypes.arrayOf(PropTypes.string).isRequired,
        geocode: PropTypes.shape({
            lat: PropTypes.number.isRequired,
            lng: PropTypes.number.isRequired
        }).isRequired,
        locationType: PropTypes.string.isRequired
    })).isRequired,
    setFilteredLocations: PropTypes.func
};

export default MapComponent;