import { useState, useEffect } from 'react';
import './App.css';
import MapComponent from './Map';
import FiltersMenu from './Filters';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Locations } from './api';

function App() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [defaultLocation, setDefaultLocation] = useState();
    const [locations, setLocations] = useState([]);
    const [filteredLocations, setFilteredLocations] = useState([]);

    const location = 'Poland'; // here will be passed the user input

    const { locations: apiLocations, handleSearch } = Locations(); // Renamed locations to apiLocations

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
    }, [location]);

    useEffect(() => {
        setLocations(apiLocations);
        setFilteredLocations(apiLocations);
    }, [apiLocations]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const goBack = () => {
        window.history.back();
    };

    return (
        <div>
            <div id="backButton" onClick={goBack}>
                <FontAwesomeIcon icon={faArrowLeft} /> 
            </div>
            <div id="map" style={{ position: 'relative' }}>
                <MapComponent defaultLocation={defaultLocation} locations={filteredLocations}/>
                {menuOpen && <FiltersMenu locations={locations} setFilteredLocations={setFilteredLocations} />}
                <button id="menuButton" onClick={toggleMenu}>Filters</button>
            </div>
        </div>
    );
}

export default App;