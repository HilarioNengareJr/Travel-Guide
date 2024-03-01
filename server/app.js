const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// parsing incoming requests with json payloads
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));

app.post('/', function (req, res) {
    const inputData = req.body.input;

    console.log(`Received form data ${inputData}`)
    res.json({ message: 'Form data received successfully' });
    res.render('index', { title: 'Express' });
});

module.exports = app;
