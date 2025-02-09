const apiUrl = "https://meowfacts.herokuapp.com/";

function fetchCatFact() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const catFact = data.data;
            document.getElementById("catFact").textContent = catFact;
        });
}