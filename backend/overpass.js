const axios = require('axios');

const OVERPASS_API_URL = 'http://overpass-api.de/api/interpreter';

function createQueryString(landmarks) {
  // Logic to create Overpass QL query based on the landmarks
  return queryString;
}

async function queryOverpassAPI(queryString) {
  try {
    const response = await axios.get(OVERPASS_API_URL, {
      params: {
        data: queryString,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to query Overpass API', error);
    return null;
  }
}

module.exports = {
  createQueryString,
  queryOverpassAPI,
};
