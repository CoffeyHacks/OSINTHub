import React, { useState } from 'react';
import axios from 'axios';

function WhatsMyName() {
  const [data, setData] = useState(null);

  const getData = async () => {
    const response = await axios.get('/whatsmyname');
    setData(response.data);
  };

  return (
    <div>
      <h1>What's My Name Results</h1>
      <button onClick={getData}>Get Data</button>
      {data && (
        <div>
          {/* Display your data here */}
        </div>
      )}
    </div>
  );
}

export default WhatsMyName;
