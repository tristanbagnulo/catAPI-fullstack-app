const axios = require('axios');
const express = require('express');
const cors = require('cors')

const app = express();
// App starts on port 3000 by default. Can change later if needed.
const port = 3000;
const apiKey='live_S68Wc3bhKRn5rQ84vyjuwA9d658Xmh1inrm4h2eyDCPSgowlRDkaPwVjNrSA6dgM';
app.use(cors());


// Get the cat API data containing breedIds and breedNames
app.get('/breedsList', async (req, res) => {
    try {
        const response = await axios.get(`https://api.thecatapi.com/v1/breeds`);
        return res.json(response.data);
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred while fetching cat data');
    }
});

// Get a single cat's image.
app.get('/catImage', async (req, res) => {
    try {
        const breedId = req.query.breedId
        const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred while fetching cat data');
    }
});

// Get multiple images of a single cat.
app.get('/catImages', async (req, res) => {
    try {
        const breedId = req.query.breedId
        const response = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${breedId}&api_key=${apiKey}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred while fetching cat data');
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});