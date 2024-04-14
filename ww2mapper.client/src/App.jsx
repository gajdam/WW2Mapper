import './App.css';
import MapComponent from './Map';

function App() {
        <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>

    return (
        <div>
            <div id="map"><MapComponent /></div>
            <h1 id="tabelLabel">Google places</h1>
            <p>This component demonstrates fetching data from the server.</p>
        </div>
    );
}

export default App;