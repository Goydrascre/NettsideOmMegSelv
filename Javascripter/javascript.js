function pulls() {
    let kan_få_karakter = true;
    const primos = Number(prompt("Hvor mange primogems har du?"));
    const intertwinedFate = Number(prompt("Hvor mange Intertwined Fates har du?"));
    const starglitter = Number(prompt("Hvor mye starglitter har du?"));
    const cons = Number(prompt("Hvor mange constellations har du? (skriv -1 hvis du ikke har karakteren)"));

    // Beregn antall pulls
    const totalPulls = Math.floor(primos / 160) + intertwinedFate + Math.floor(starglitter / 5);
    let garantertCons = Math.floor(totalPulls / 180) + cons;

    // Begrens antall cons til maks 6
    if (garantertCons > 6) {
        garantertCons = 6;
    }

    // Sjekk om man kan få minst én constellation
    if (garantertCons <= cons) {
        kan_få_karakter = false;
    }

    // Oppdater HTML-elementer
    document.getElementById("antallpulls").innerHTML = "Du kan gjøre totalt " + totalPulls + " pulls";

    if (kan_få_karakter) {
        document.getElementById("resultat").innerHTML = "Du kan garantert få constellation " + garantertCons;
    } else {
        document.getElementById("resultat").innerHTML = "Du har ikke nok pulls til å få en karakter garantert";
    }
}

// Set default values if no saved data exists in localStorage
let score = localStorage.getItem("score") ? parseInt(localStorage.getItem("score")) : 0;
let cookiePerClick = localStorage.getItem("cookiePerClick") ? parseInt(localStorage.getItem("cookiePerClick")) : 1;
let upgrademus_pris = localStorage.getItem("upgrademus_pris") ? parseInt(localStorage.getItem("upgrademus_pris")) : 40;
let HTML_pris = localStorage.getItem("HTML_pris") ? parseInt(localStorage.getItem("HTML_pris")) : 15;

const scoreDisplay = document.getElementById("score");
const upgrademusDisplay = document.getElementById("upgrademusDisplay");
const cookie = document.getElementById("cookie");
const upgrademus = document.getElementById("upgrade1");
const kjøpHTML = document.getElementById("kjøpHTML");

// Function to update the score display
function updateScore() {
    scoreDisplay.textContent = `${score}kr`;
    localStorage.setItem("score", score); // Save score to localStorage
}

// Function to update the price of the mouse upgrade
function updateMusPris() {
    upgrademusDisplay.textContent = `kjøp bedre mus for: ${upgrademus_pris}kr`;
    localStorage.setItem("upgrademus_pris", upgrademus_pris); // Save mouse price to localStorage
}

// Update the HTML price
function updateHTMLPris() {
    localStorage.setItem("HTML_pris", HTML_pris); // Save HTML price to localStorage
}

// Event listener for clicking on the cookie (increases score)
cookie.addEventListener("click", (event) => {
    score += cookiePerClick;
    updateScore();
    createNewElement(event);
});

// Event listener for upgrading the mouse
upgrademus.addEventListener("click", () => {
    if (score >= upgrademus_pris) {
        score -= upgrademus_pris;
        cookiePerClick += 1;
        upgrademus_pris = upgrademus_pris * 2;
        updateScore();
        localStorage.setItem("cookiePerClick", cookiePerClick);
        updateMusPris(); // Make sure to update the mouse price as well
    }
});

// Event listener for upgrading HTML
kjøpHTML.addEventListener("click", () => {
    if (score >= HTML_pris) {
        score -= HTML_pris;
        upgrademus_pris = upgrademus_pris * 2;
        updateScore();
        updateMusPris();
    }
});

// Function to create a new element at the mouse position
function createNewElement(event) {
    var newElement = document.createElement('div');
    newElement.textContent = `${cookiePerClick}`;
    newElement.classList.add('new-item');

    var container = document.getElementById('container');
    var rect = container.getBoundingClientRect();  // Find position of container
    var mouseX = event.clientX - rect.left;  // Adjust X-coordinate
    var mouseY = event.clientY - rect.top;   // Adjust Y-coordinate

    // Add a random offset to the X-position (e.g., between -50 and 50 pixels)
    var randomOffset = Math.floor(Math.random() * 51) - 25;
    var randomX = mouseX + randomOffset;

    // Position the new element near the mouse pointer
    newElement.style.left = randomX + 'px';
    newElement.style.top = mouseY + 'px';

    // Append the new element to the container
    container.appendChild(newElement);

    // Remove the element after 2 seconds
    setTimeout(() => {
        newElement.remove();
    }, 2000);
}

// Reset button listener
const resetButton = document.getElementById("resetButton");

resetButton.addEventListener("click", () => {
    localStorage.clear();
    alert("Knappen virker!");
    // Tilbakestill spillvariabler
    score = 0;
    cookiePerClick = 1;
    upgrademus_pris = 40;
    HTML_pris = 15;

    // Tøm localStorage
    localStorage.clear();

    // Oppdater UI for å reflektere tilbakestillingen
    updateScore();
    updateMusPris();
    updateHTMLPris();

    // Oppdater localStorage med de nye verdiene
    localStorage.setItem("score", score);
    localStorage.setItem("cookiePerClick", cookiePerClick);
    localStorage.setItem("upgrademus_pris", upgrademus_pris);
    localStorage.setItem("HTML_pris", HTML_pris);
});

// Initialiser visningen med lagrede verdier eller standardverdier
updateScore();
updateMusPris();
updateHTMLPris();
