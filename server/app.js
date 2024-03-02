const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// parsing incoming requests with json payloads
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index', { title: 'Express' });
});

app.post('/', async (req, res) => {
    const inputData = req.body.input;
    try {
        console.log(`successfully retrieved user input ${inputData}`)
        const results = await placeSearch(inputData);
        console.log(results);
        res.status(200).json({ success: true, message: "Successful" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal server error.' })
    }
})

async function placeSearch(inputData) {
    try {
        const searchParams = new URLSearchParams({
            near: inputData,
        });

        const results = await fetch(
            `https://api.foursquare.com/v3/places/search?${searchParams}`,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: 'fsq3USQ8GOMl6egZ9eKt97OY2p9pOqLUrRP9ApHysvYk+5s=',
                }
            }
        );
        const data = await results.json();
        return data;
    } catch (err) {
        console.error(err);
    }
}

module.exports = app;
