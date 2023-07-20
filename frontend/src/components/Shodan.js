import React, { useState } from 'react';
import axios from 'axios';

function Shodan() {
  const [data, setData] = useState(null);

  const getData = async () => {
    const response = await axios.get('/shodan');
    setData(response.data);
  };

  return (
    <div>
      <h1>Shodan Results</h1>
      <button onClick={getData}>Get Data</button>
      {data && (
        <div>
          {/* Display your data here */}
        </div>
      )}
    </div>
  );
}

export default Shodan;
