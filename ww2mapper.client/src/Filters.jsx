import { useState } from 'react';
import PropTypes from 'prop-types';

function FiltersMenu({ locations, setFilteredLocations }) {
    const [filters, setFilters] = useState({
        "war footprint": true,
        "museum": true,
        "memorial": true
    });

    const handleCheckboxChange = (event) => {
        setFilters({
            ...filters,
            [event.target.name]: event.target.checked
        });
    };

    const applyFilters = () => {
        const filteredLocations = locations.filter(location => filters[location.locationType]);
        setFilteredLocations(filteredLocations);
        console.log('Filtered locations:', filteredLocations);
    };

    return (
        <div id="filtersMenu">
            {Object.keys(filters).map((filterKey) => (
                <div key={filterKey}>
                    <input
                        type="checkbox"
                        id={filterKey}
                        name={filterKey}
                        checked={filters[filterKey]}
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor={filterKey}>{filterKey}</label>
                </div>
            ))}
            <button onClick={applyFilters}>Apply</button>
        </div>
    );
}

FiltersMenu.propTypes = {
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
    setFilteredLocations: PropTypes.func.isRequired
};

export default FiltersMenu;