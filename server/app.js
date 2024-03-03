const express = require('express');
const bodyParser = require('body-parser');
const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs');

const app = express();

// base url for wiki voyage
const baseUrl = 'https://en.wikivoyage.org/w/api.php';

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
        const searchResults = await searchPlace(inputData);

        if (searchResults.length > 0) {
            const firstResult = searchResults[0];
            const pageTitle = firstResult.title;

            const pageContent = await fetchPageContent(pageTitle);
            const jsonString = JSON.stringify(pageContent);

            fs.writeFile('data.json', jsonString, 'utf-8', (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ success: false, error: 'Error writing to file.' });
                }
                console.log('File has been written.');
                res.status(200).json({ success: true, message: 'Successful' });
            });

        } else {
            console.log(`No search results for user input ${inputData}`);
            res.status(404).json({ success: false, error: 'No search results found.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message || 'Internal server error.' });
    }
});


// Step 1: Searching for articles related to the location
async function searchPlace(inputData) {
    try {
        const response = await fetch(`${baseUrl}?action=query&format=json&list=search&srsearch=${inputData}`);
        const data = await response.json();
        const searchResults = data.query.search;

        return searchResults;
    } catch (error) {
        console.error(`Error occurred: ${error}`);
        throw error;
    }
}

// Step 2: Grabbing the page content related to the page title
const fetchPageContent = async (pageTitle) => {
    try {
        const response = await fetch(`${baseUrl}?origin=*&action=parse&page=${pageTitle}&format=json`);
        const data = await response.json();
        const htmlContent = data.parse.text['*'];
        const $ = cheerio.load(htmlContent);

        // Grabbing all image sources and captions within figure elements
        const figures = $('figure');
        const banners = figures.map((index, figureElement) => {
            const imgSrc = $(figureElement).find('img').attr('src');
            const caption = $(figureElement).find('figcaption').text();
            return { imgSrc, caption };
        }).get();
        const allBanners = banners.length > 0 ? { banners } : {};

        // Grabbing paragraphs
        const paragraphs = $('p').map((index, element) => $(element).text()).get();

        // Grabbing landmarks
        const landmarksList = $('ul li');
        const landmarks = landmarksList.map((index, listItem) => {
            const nameElement = $(listItem).find('.listing-name a');
            const name = nameElement.text();
            const nameHref = nameElement.attr('href');

            const noteElement = $(listItem).find('.note.listing-content');
            const noteContent = noteElement.text().trim();

            return { name, nameHref, noteContent };
        }).get();

        // Grabbing embassies section
        const embassySection = $('span.mw-headline:contains("Embassies")').closest('ul');
        const embassies = embassySection.length > 0 ? embassySection.find('li').map(async (index, element) => {
            return await extractEmbassyInfo($(element));
        }).get() : [];

        // Grabbing transport details section
        const airlinesList = $('h3:contains("Airlines")').next('ul').find('li');
        const airlines = airlinesList.length > 0 ? airlinesList.map((index, airlineElement) => {
            const vcardElement = $(airlineElement).find('.vcard');

            const nameElement = vcardElement.find('.listing-name');
            const name = nameElement.text();

            const linkElement = nameElement.find('a.external');
            const link = linkElement.attr('href');

            const addressElement = vcardElement.find('.listing-address');
            const address = addressElement.text();

            const phoneElement = vcardElement.find('.listing-phone a');
            const phone = phoneElement.text();

            return { name, link, address, phone };
        }).get() : [];

        return { allBanners, paragraphs, landmarks, embassies, airlines };
    } catch (error) {
        console.error('Error fetching page content:', error.message);
        throw error;
    }
};



module.exports = app;
