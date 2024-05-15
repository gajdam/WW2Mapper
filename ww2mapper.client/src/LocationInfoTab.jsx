import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import './App.css';

function LocationInfoTab({ location, onClose }) {
    const locationInfoRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (locationInfoRef.current && !locationInfoRef.current.contains(event.target)) {
                onClose();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    if (!location) {
        return null;
    }

    return (
        <div id="locationInfo" ref={locationInfoRef}>
            <h2>{location.displayName.text}</h2>
            <p>{location.formattedAddress}</p>
            <p>Location type: {location.locationType}</p>
        </div>
    );
}

LocationInfoTab.propTypes = {
    location: PropTypes.shape({
        displayName: PropTypes.string.isRequired,
        formattedAddress: PropTypes.string.isRequired,
        types: PropTypes.arrayOf(PropTypes.string).isRequired,
        geocode: PropTypes.shape({
            lat: PropTypes.number.isRequired,
            lng: PropTypes.number.isRequired
        }).isRequired,
        locationType: PropTypes.string.isRequired
    }),
    onClose: PropTypes.func.isRequired
};

export default LocationInfoTab;