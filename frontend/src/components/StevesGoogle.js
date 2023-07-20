import React, { useState } from 'react';
import axios from 'axios';

function StevesGoogle() {
  const [data, setData] = useState(null);

  const getData = async () => {
    const response = await axios.get('/stevesgoogle');
    setData(response.data);
  };

  return (
    <div>
      <h1>Steve's Google Results</h1>
      <button onClick={getData}>Get Data</button>
      {data && (
        <div>
          {/* Display your data here */}
          {/* This will depend on the structure of your data */}
        </div>
      )}
    </div>
  );
}

export default StevesGoogle;
