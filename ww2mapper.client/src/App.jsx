import { useState } from 'react';
import './App.css';
import MapComponent from './Map';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
function App() {
    const [menuOpen, setMenuOpen] = useState(false);
    
    const location = 'Poland';

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
                {/* <MapComponent/> */}
                <MapComponent location={location}/>
                {menuOpen && <FiltersMenu />}
                <button id="menuButton" onClick={toggleMenu}>Filters</button>
            </div>
        </div>
    );
}

function FiltersMenu() {
    return (
        <div id="filtersMenu">
            {/* Filter components */}
        </div>
    );
}

export default App;
