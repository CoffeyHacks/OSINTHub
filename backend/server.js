const express = require('express');
const axios = require('axios');
const shodanClient = require('shodan-client');
const SunCalc = require('suncalc');
const app = express();

app.use(express.json());

let OPS_token = null;

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
    // Add your Shodan API key here
    const SHODAN_API_KEY = 'your-shodan-api-key';
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

// Steve's Google Search route
app.post('/stevesgoogle', async (req, res) => {
    const { searchQuery } = req.body;
    // Add code here to make API request to Steve's Google Search API with search query.
});

// Dehashed route
app.post('/dehashed', async (req, res) => {
    const { searchCriteria } = req.body;
    // Add code here to make API request to Dehashed with search criteria.
});

// HaveIBeenPwned route
app.post('/haveibeenpwned', async (req, res) => {
    const { searchEmail } = req.body;
    // Add code here to make API request to HaveIBeenPwned with email address.
});

// WhatsMyName route
app.post('/whatsmyname', async (req, res) => {
    const { searchUsername } = req.body;
    // Add code here to make API request to WhatsMyName with username.
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

// Server
app.listen(3000, () => console.log('Server running on port 3000'));


