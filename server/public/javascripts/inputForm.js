'use strict';

document.getElementById('inputForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Collecting form data 
    const formData = new URLSearchParams(new FormData(event.target));

    fetch('/', {
        method: 'POST', 
        body: formData,
    }).then(response => response.json()).then(data => {
        console.log(`Server's response ${JSON.stringify(data)}`);
    }).catch(error => {
        console.log(`Error: ${error}`);
    })
})