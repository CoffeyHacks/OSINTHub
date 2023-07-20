require('dotenv').config();
const express = require('express');
const axios = require('axios');
const shodanClient = require('shodan-client');
const SunCalc = require('suncalc');
const NodeGeocoder = require('node-geocoder');
const { auth } = require('express-openid-connect');
const overpass = require('./backend/overpass'); // Add this line
const app = express();

let options = {
    provider: 'openstreetmap'
  };
  
let geoCoder = NodeGeocoder(options);

app.use(express.json());

let OPS_token = null;

// Auth0 configuration
app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
  })
);

// Function to authenticate with OPS
async function authenticate() {
    try {
        const response = await axios.post('https://api.openpeoplesearch.com/api/v1/User/authenticate', {
            username: 'your-username',
            password: 'your-password'
        });
        OPS_token = response.data.token;
    } catch (error) {
        console.error(error);
    }
}

// Call the authenticate function when your server starts
authenticate();

// Routes
app.post('/createuser', async (req, res) => {
    if (!OPS_token) {
        await authenticate();
    }
    const { username, password, email } = req.body;
    // Add user creation logic here, using OPS_token for any OPS API requests.
});

app.post('/login', async (req, res) => {
    if (!OPS_token) {
        await authenticate();
    }
    const { username, password } = req.body;
    // Add login logic here, using OPS_token for any OPS API requests.
});

// Shodan search route
app.post('/shodan', async (req, res) => {
    const { searchType, searchInput } = req.body;
    const SHODAN_API_KEY = process.env.SHODAN_API_KEY;
    let results;
    try {
        if (searchType === 'host') {
            results = await shodanClient.host(searchInput, SHODAN_API_KEY);
        } else if (searchType === 'ip') {
            results = await shodanClient.search(searchInput, SHODAN_API_KEY);
        }
        // Handle other search types here...
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while searching Shodan.");
    }
    // Render the shodan.ejs template with the search results
    res.render('shodan', { results });
});

app.post('/suncalc', (req, res) => {
    const date = new Date(req.body.date + 'T' + req.body.time);
    const location = req.body.location;

    // You would need to convert location into longitude and latitude using a geocoding service
    // Let's use placeholder coordinates for now
    const latitude = 51.5074;
    const longitude = -0.1278;

    const sunPosition = SunCalc.getPosition(date, latitude, longitude);

    // The sunPosition object now contains the azimuth and altitude of the sun
    // These can be passed to your frontend for display on the map

    res.json({ sunPosition });
});

// Overpass route
app.post('/overpass', async (req, res) => {
    const { query } = req.body;
    try {
        const result = await overpass.runQuery(query);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while querying Overpass.");
    }
});

// Server
app.listen(3000, () => console.log('Server running on port 3000'));
