import React, { useState } from 'react';
import axios from 'axios';

function HaveIBeenPwned() {
  const [data, setData] = useState(null);

  const getData = async () => {
    const response = await axios.get('/haveibeenpwned');
    setData(response.data);
  };

  return (
    <div>
      <h1>Have I Been Pwned Results</h1>
      <button onClick={getData}>Get Data</button>
      {data && (
        <div>
          {/* Display your data here */}
        </div>
      )}
    </div>
  );
}

export default HaveIBeenPwned;
