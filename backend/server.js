const express = require('express');
const axios = require('axios');
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

// Create route for example page
app.get('/example', async (req, res) => {
    if (!OPS_token) {
        await authenticate();
    }
    // Use OPS_token for any OPS API requests within your route handlers.
});

// Server
app.listen(3000, () => console.log('Server running on port 3000'));
