'use strict';

document.getElementById('inputForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Collecting form data 
    const formData = new FormData(event.target);

    // Sending form data
    fetch('/', {
        method: 'POST', // Sending method type
        body: formData, // Including form data in the request body
    }).then(response => response.json()).then(data => {
        console.log(`Server's response ${data}`);
    }).catch(error => {
        console.log(`Error: ${error}`);
    })
})