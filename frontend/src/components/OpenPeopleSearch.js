import React, { useState } from 'react';
import axios from 'axios';

function OpenPeopleSearch() {
  const [data, setData] = useState(null);

  const getData = async () => {
    const response = await axios.get('/openpeoplesearch');
    setData(response.data);
  };

  return (
    <div>
      <h1>Open People Search Results</h1>
      <button onClick={getData}>Get Data</button>
      {data && (
        <div>
          {/* Display your data here */}
        </div>
      )}
    </div>
  );
}

export default OpenPeopleSearch;
