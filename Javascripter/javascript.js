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
let score = 0;
let cookiePerClick = 1;
let upgrademus_pris = 40;
let HTML_pris = 15;

const scoreDisplay = document.getElementById("score");
const upgrademusDisplay = document.getElementById("upgrademusDisplay");
const cookie = document.getElementById("cookie");
const upgrademus = document.getElementById("upgrade1");
const kjøpHTML = document.getElementById("kjøpHTML");

function updateScore() {
    scoreDisplay.textContent = `${score}kr`;
}

function updateMusPris() {
    upgrademusDisplay.textContent = `kjøp bedre mus for: ${upgrademus_pris}kr`;
}

cookie.addEventListener("click", (event) => {
    score += cookiePerClick;
    updateScore();
    createNewElement(event);
});

upgrademus.addEventListener("click", () => {
    if (score >= upgrademus_pris) {
        score -= upgrademus_pris;
        cookiePerClick += 1;
        upgrademus_pris = upgrademus_pris * 2;
        updateScore();
        updateMusPris();
    }
});

kjøpHTML.addEventListener("click", () => {
    if (score >= HTML_pris) {
        score -= HTML_pris;
        upgrademus_pris = upgrademus_pris * 2;
        updateScore();
        updateMusPris();
    }
});

function createNewElement(event) {
    var newElement = document.createElement('div');
    newElement.textContent = `${cookiePerClick}`;
    newElement.classList.add('new-item');
    
    var container = document.getElementById('container');
    var rect = container.getBoundingClientRect();  // Finn posisjonen til containeren
    var mouseX = event.clientX - rect.left;  // Juster X-koordinaten
    var mouseY = event.clientY - rect.top;   // Juster Y-koordinaten

    // Legg til et tilfeldig avvik i X-posisjonen (f.eks. mellom -50 og 50 piksler)
    var randomOffset = Math.floor(Math.random() * 51) - 25;
    var randomX = mouseX + randomOffset;

    // Posisjoner elementet på musepekeren
    newElement.style.left = randomX + 'px';
    newElement.style.top = mouseY + 'px';

    // Legg til det nye elementet i containeren
    container.appendChild(newElement);

    setTimeout(() => {
        newElement.remove();
        saveProgress();  // Oppdater lagret fremdrift etter at elementet er fjernet
    }, 2000);
}

// Lagre fremdriften i localStorage
function saveProgress() {
    localStorage.setItem('score', score);
    localStorage.setItem('cookiePerClick', cookiePerClick);
    localStorage.setItem('upgrademus_pris', upgrademus_pris);
    localStorage.setItem('HTML_pris', HTML_pris);
}
function loadProgress() {
    const savedScore = localStorage.getItem('score');
    const savedCookiePerClick = localStorage.getItem('cookiePerClick');
    const savedUpgradeMusPris = localStorage.getItem('upgrademus_pris');
    const savedHTMLPris = localStorage.getItem('HTML_pris');
}

// Hent og gjenopprett fremdriften fra localStorage når siden lastes
function loadProgress() {
    var elements = JSON.parse(localStorage.getItem('elements'));

    if (elements) {
        var container = document.getElementById('container');

        // Legg til elementene tilbake på riktig posisjon
        elements.forEach(function (elementData) {
            var newElement = document.createElement('div');
            newElement.textContent = elementData.content;
            newElement.classList.add('new-item');
            newElement.style.position = 'absolute';
            newElement.style.left = elementData.x + 'px';
            newElement.style.top = elementData.y + 'px';

            container.appendChild(newElement);
        });
    }
}

// Kall på loadProgress når siden lastes
window.onload = loadProgress;
