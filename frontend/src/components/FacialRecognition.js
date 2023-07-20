import React, { useState } from 'react';
import axios from 'axios';

function FacialRecognition() {
  const [data, setData] = useState(null);

  const getData = async () => {
    const response = await axios.get('/facialrecognition');
    setData(response.data);
  };

  return (
    <div>
      <h1>Facial Recognition Results</h1>
      <button onClick={getData}>Get Data</button>
      {data && (
        <div>
          {/* Display your data here */}
        </div>
      )}
    </div>
  );
}

export default FacialRecognition;
