

// Function to fetch the header.html file
function fetchHeader() {
    return fetch('header.html')
        .then(response => response.text());
}

// Function to fetch the footer.html file
function fetchFooter() {
    return fetch('footer.html')
        .then(response => response.text());
}

// Load the header.html file
fetchHeader()
    .then(header => {
        const tempElement = document.createElement('div');
        tempElement.innerHTML = header.trim();

        // Inject the header HTML into the header container
        document.getElementById('header').appendChild(tempElement.firstChild);
    });

// Load the footer.html file
fetchFooter()
    .then(footer => {
        const tempElement = document.createElement('div');
        tempElement.innerHTML = footer.trim();

        // Inject the footer HTML into the footer container
        document.getElementById('footer').appendChild(tempElement.firstChild);
    });
