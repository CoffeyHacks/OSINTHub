import React, { useState } from 'react';
import axios from 'axios';

function SunCalc() {
  const [data, setData] = useState(null);

  const getData = async () => {
    const response = await axios.get('/suncalc');
    setData(response.data);
  };

  return (
    <div>
      <h1>SunCalc Results</h1>
      <button onClick={getData}>Get Data</button>
      {data && (
        <div>
          {/* Display your data here */}
        </div>
      )}
    </div>
  );
}

export default SunCalc;
