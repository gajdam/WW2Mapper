import { useState } from 'react';
import './App.css';
import MapComponent from './Map';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
function App() {
    const [menuOpen, setMenuOpen] = useState(false);

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
                <MapComponent />
                {menuOpen && <FiltersMenu />}
                <button id="menuButton" onClick={toggleMenu}>Filters</button>
            </div>
            <h1 id="tabelLabel">Google places</h1>
            <p>This component demonstrates fetching data from the server.</p>
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
