const axios = require('axios');
const express = require('express');
const cors = require('cors')

const app = express();
// App starts on port 3000 by default. Can change later if needed.
const port = 3000;
app.use(cors());


//Get the list of breed id and name for querying list
app.get('/breedsList', async (req, res) => {
    try {
        const response = await axios.get(`https://api.thecatapi.com/v1/breeds`);

        //Just breen name and ID
        // const idNameBreeds = res.json(response.data.map(obj => ({id: obj.id, name: obj.name})))
        // console.log(res.json(response.data));
        return res.json(response.data);
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred while fetching cat data');
    }
});

//Get the data about a specific cat's image
// Test URL - http://localhost:3000/cats?breedId=beng
// Response - [{"id":"H_UWbOfra","url":"https://cdn2.thecatapi.com/images/H_UWbOfra.jpg","width":1200,"height":1200}]
app.get('/cats', async (req, res) => {
    try {
        const breedId = req.query.breedId
        const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred while fetching cat data');
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});