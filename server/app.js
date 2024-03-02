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

app.get('/', (req, res) => {
    res.render('index', { title: 'Express' });
});

app.post('/', (req, res) => {
    console.log(req.body);
    const inputData = req.body.input;
    console.log(`successfully retrieved user input ${inputData}`)
    res.json({success: true, message: "Successful"})
})

module.exports = app;
