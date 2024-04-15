import { useState } from 'react';
import './App.css';
import MapComponent from './Map';

function App() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div>
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
    // Add your filter components here
    return (
        <div id="filtersMenu">
            {/* Filter components */}
        </div>
    );
}

export default App;
