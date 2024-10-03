# Tour Guide App

## Overview

The Tour Guide App is a web application designed to help users explore and discover landmarks, towns, cities, and countries. It provides a user-friendly interface to search for places, view details, and pin favorite locations.

## Features

- **Search**: Search for landmarks, towns, cities, and countries.
- **Pin Favorites**: Pin favorite places to a sidebar for quick access.
- **Toggle Pins**: Toggle pins on and off for each location.

## Server Logic

The server logic is implemented in `app.js`. The server uses Express.js to handle HTTP requests and responses. It interacts with the Wikivoyage API to fetch data about places. The server handles:

- **Home Route**: Renders the main page with a search form.
- **Search Route**: Handles POST requests from the search form, fetches search results from the Wikivoyage API, and renders the main page with the search results.
- **Wiki Route**: Fetches detailed content for a specific page title from the Wikivoyage API and renders the main page with the detailed content.

The server also uses Cheerio to parse HTML content fetched from the Wikivoyage API and extract relevant information such as images, paragraphs, landmarks, embassies, and airlines.

## Tech Stack

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web application framework for Node.js.
- **Cheerio**: Fast, flexible, and lean implementation of core jQuery designed specifically for the server.
- **Pug**: Template engine for rendering HTML.
- **CSS**: Styling the web pages.
- **JavaScript**: Client-side scripting for interactivity.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/tour-guide-app.git
   ```

2. Install dependencies:
   ```bash
   npm install
   cd server
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

## Usage

1. Open your browser and navigate to `http://localhost:5500`.
2. Use the search bar to find places.
3. Pin your favorite places by clicking the pin icon next to each location.

## Contributing

Contributions are welcome! Please read the [contributing guidelines](CONTRIBUTING.md) before getting started.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
