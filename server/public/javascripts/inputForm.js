'use strict';

document.getElementById('inputForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Collecting form data 
    const formData = new URLSearchParams(new FormData(event.target));
    let responseClone;
    fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,

    }).then(response => {
        responseClone = response.clone();
        return response.json()
    }).then(data => {
        console.log(`Server's response ${JSON.stringify(data)}`);
    }, function (rejectionReason) {
        console.log('Error parsing JSON from response:', rejectionReason, responseClone); // 4
        responseClone.text()
            .then(function (bodyText) {
                console.log('Received the following instead of valid JSON:', bodyText); // 6
            })
    }).catch(error => {
        console.log(`Error: ${error}`);
    })
})