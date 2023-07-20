// GeoLocator.js
import React, { useState } from 'react';
import axios from 'axios';
import MapComponent from './MapComponent'; // import the MapComponent

const GeoLocator = () => {
    // Define states for your data, form inputs and any other values you need to keep track of
    const [data, setData] = useState(null);
    const [input, setInput] = useState("");
    const [center, setCenter] = useState({lat: 51.505, lng: -0.09}); // Define default center

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/overpass', { query: input });
            setData(response.data);

            // Here you might want to update the center state based on the returned data
            // For simplicity, I'm just demonstrating with a static latitude and longitude.
            // Replace this with actual data from the response.
            setCenter({lat: 52.505, lng: -1.09}); 
        } catch (error) {
            console.error(error);
        }
    }

    // Function to handle input changes
    const handleInputChange = (event) => {
        setInput(event.target.value);
    }

    return (
        <div>
            <h2>GeoLocator Tool</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Enter your query:
                    <input type="text" value={input} onChange={handleInputChange} />
                </label>
                <button type="submit">Submit</button>
            </form>
            {data && <div>Your data: {JSON.stringify(data)}</div>}
            {/* Include the MapComponent and pass in the center state */}
            <MapComponent center={center} zoom={13} radius={1} />
        </div>
    );
}

export default GeoLocator;
