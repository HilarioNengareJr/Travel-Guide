const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

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

app.post('/', (req, res) => {
    const inputData = req.body.input;
    console.log(`successfully retrieved user input ${inputData}`)
    res.json({success: true, message: "Successful"})
})

async function getPlacesData(inputData){

    const clientId = 'ZW1PUYYK335DQCTOTT4WL255GABOXG4RHHI23KYA2XETKUTO';
    const clientSecret = 'FPSZ2CUAPBQO5G0BXTL23ZNUFV04DBGEETJB2A1TIWTL2CZJ';
    const apiUrl = '';


}

module.exports = app;
