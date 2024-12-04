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
let upgrademus_pris = localStorage.getItem("upgrademus_pris") ? parseInt(localStorage.getItem("upgrademus_pris")) : 40;
let en_pris = localStorage.getItem("1_pris") ? parseInt(localStorage.getItem("1_pris")) : 15;
let autocookies = localStorage.getItem("autocookies") ? parseInt(localStorage.getItem("autocookies")) : 0;
let cookiePerClick = localStorage.getItem("cookiePerClick") ? parseInt(localStorage.getItem("cookiePerClick")) : 1;
let isFrenzyActive = localStorage.getItem("isFrenzyActive") ? JSON.parse(localStorage.getItem("isFrenzyActive")) : false;

const gameArea = document.getElementById("game-area"); // Endre dette til container-elementet ditt
const goldenCookie = document.getElementById("golden-cookie");
const scoreDisplay = document.getElementById("score");
const autocookiesDisplay = document.getElementById("autocookies")
const upgrademusDisplay = document.getElementById("upgrademusDisplay");
const upgrade1Display = document.getElementById("upgrade1Display");
const cookie = document.getElementById("cookie");
const upgrademus = document.getElementById("upgrade1");
const kjøp1 = document.getElementById("kjøp1");

// Update the UI when the page loads
document.addEventListener("DOMContentLoaded", () => {
    updateScore(); // Update score display
    updateMusPris(); // Update mouse upgrade price
    update1Pris();
    updatecps();
    if (isFrenzyActive === true){
        alert("nwdnk")
        isFrenzyActive=false;
        autocookies /= 7;
        updatecps();
    }
});

// Function to update the score display
function updateScore() {
    scoreDisplay.textContent = `${score}kr`;
    localStorage.setItem("score", score); // Save score to localStorage
}
function updatecps() {
    autocookiesDisplay.textContent = `per sekund ${autocookies}`;
    localStorage.setItem("autocookies", autocookies);
}

// Function to update the price of the mouse upgrade
function updateMusPris() {
    upgrademusDisplay.textContent = `kjøp bedre mus for: ${upgrademus_pris}kr`;
    localStorage.setItem("upgrademus_pris", upgrademus_pris); // Save mouse price to localStorage
}
function update1Pris() {
    upgrade1Display.textContent = `kjøp bedre autoclicker for: ${en_pris}kr`;
    localStorage.setItem("1_pris", en_pris); // Save mouse price to localStorage
}

// Event listener for clicking on the cookie (increases score)
cookie.addEventListener("click", (event) => {
    score += cookiePerClick;
    updateScore();
    createNewElement(event); // Create the floating number animation
    cookie.classList.add('groot-swag-click');

    // Fjerner klassen etter 1 sekund
    setTimeout(() => {
        cookie.classList.remove('groot-swag-click');
    }, 490);
});

// Event listener for upgrading the mouse
upgrademus.addEventListener("click", () => {
    if (score >= upgrademus_pris) {
        score -= upgrademus_pris;
        cookiePerClick += 1;
        upgrademus_pris = upgrademus_pris * 2;
        updateScore();
        localStorage.setItem("cookiePerClick", cookiePerClick);
        updateMusPris(); // Update the mouse price as well
    }
});

// Event listener for upgrading HTML
kjøp1.addEventListener("click", () => {
    if (score >= en_pris) {
        score -= en_pris;
        en_pris = en_pris * 2;
        autocookies = autocookies +1;
        localStorage.setItem("1_pris", en_pris);
        updatecps();
        update1Pris();
    }
});
setInterval(() => {
    score = score+autocookies;
    updateScore();
}, 1000); 

// Function to create a new floating element
function createNewElement(event) {
    var newElement = document.createElement("div");
    newElement.textContent = `+${cookiePerClick}`;
    newElement.classList.add("cpc");

    var container = document.getElementById("container");
    var rect = container.getBoundingClientRect();
    var mouseX = event.clientX - rect.left;
    var mouseY = event.clientY - rect.top;

    var randomOffset = Math.floor(Math.random() * 51) - 25;
    var randomX = mouseX + randomOffset;

    newElement.style.left = randomX + "px";
    newElement.style.top = mouseY + "px";

    container.appendChild(newElement);

    setTimeout(() => {
        newElement.remove();
    }, 1950);
}
// Funksjon som lager et nytt element
function goldencookie() {
    // Opprett et nytt div-element
    const goldenCookie = document.createElement('div');
    // Legg til noe innhold i elementet

    // legger til css stilen//
    goldenCookie.classList.add('golden-cookie');

    goldenCookie.style.top = Math.random() * 100 + '%';
    goldenCookie.style.left = Math.random() * 100 + '%';
    // Legg til elementet i body

    document.body.appendChild(goldenCookie);

    setTimeout(() => {
        goldenCookie.remove();
    }, 2950);
}

setInterval(goldencookie, 5000);

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("golden-cookie")&& isFrenzyActive === false) {
        autocookies *= 7;
        isFrenzyActive=true
        localStorage.setItem("isFrenzyActive", JSON.stringify(isFrenzyActive));
        updatecps();
        event.target.remove();
        setTimeout(() => {
            isFrenzyActive=false;
            localStorage.setItem("isFrenzyActive", JSON.stringify(isFrenzyActive));
            autocookies /= 7;
            updatecps();
        }, 10000);
    }
});