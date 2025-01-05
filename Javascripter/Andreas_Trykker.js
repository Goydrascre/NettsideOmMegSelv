// Sett standardverdier hvis det ikke finnes lagrede data i localStorage
let score = localStorage.getItem("score") ? parseInt(localStorage.getItem("score")) : 0;
let upgrademus_pris = localStorage.getItem("upgrademus_pris") ? parseInt(localStorage.getItem("upgrademus_pris")) : 40;
let en_pris = localStorage.getItem("1_pris") ? parseInt(localStorage.getItem("1_pris")) : 15;
let autoScore = localStorage.getItem("autoScore") ? parseInt(localStorage.getItem("autoScore")) : 0;
let ScorePerClick = localStorage.getItem("ScorePerClick") ? parseInt(localStorage.getItem("ScorePerClick")) : 1;
let isFrenzyActive = localStorage.getItem("isFrenzyActive") ? JSON.parse(localStorage.getItem("isFrenzyActive")) : false;
let spinButtonPris = localStorage.getItem("spin_Button") ? parseInt(localStorage.getItem("spin_Button")) : 100;

// Referanser til HTML-elementer
const gyldenMynt = document.getElementById("gylden-mynt");
const timer = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");
const autoScoreDisplay = document.getElementById("autoScore");
const upgrademusDisplay = document.getElementById("upgrademusDisplay");
const upgrade1Display = document.getElementById("upgrade1Display");
const bilde = document.getElementById("bilde");
const upgrademus = document.getElementById("upgrade1");
const kjøp1 = document.getElementById("kjøp1");
const spinprisDisplay = document.getElementById("spin_Button");

// Oppdater grensesnittet når siden lastes
document.addEventListener("DOMContentLoaded", () => {
    updateScore(); // Oppdater poengvisningen
    updateMusPris(); // Oppdater pris for musoppgradering
    update1Pris(); // Oppdater pris for autoScore-oppgradering
    updatecps(); // Oppdater autoScore per sekund
    updateSpinPris(); // Oppdater pris for snurr-knappen

    // Tilbakestill Frenzy hvis aktivert ved forrige lasting
    if (isFrenzyActive === true) {
        isFrenzyActive = false;
        localStorage.setItem("isFrenzyActive", JSON.stringify(isFrenzyActive));
        autoScore /= 7;
        ScorePerClick /= 7;
        updatecps();
    }
});

// Funksjon for å oppdatere poengvisningen
function updateScore() {
    score = Math.floor(score); // Runder av poengsummen nedover
    scoreDisplay.textContent = `${score} kr`;
    localStorage.setItem("score", score); // Lagre poengsummen i localStorage
}

// Funksjon for å oppdatere autoScore per sekund
function updatecps() {
    autoScore = Math.floor(autoScore);
    autoScoreDisplay.textContent = `per sekund: ${autoScore}`;
    localStorage.setItem("autoScore", autoScore);
}

// Funksjon for å oppdatere prisen på musoppgradering
function updateMusPris() {
    upgrademus_pris = Math.floor(upgrademus_pris);
    upgrademusDisplay.textContent = `Kjøp bedre mus for: ${upgrademus_pris} kr`;
    localStorage.setItem("upgrademus_pris", upgrademus_pris);
}

// Funksjon for å oppdatere prisen på autoScore-oppgradering
function update1Pris() {
    en_pris = Math.floor(en_pris);
    upgrade1Display.textContent = `Kjøp bedre autoScore for: ${en_pris} kr`;
    localStorage.setItem("1_pris", en_pris);
}

// Funksjon for å oppdatere prisen på snurr-knappen
function updateSpinPris() {
    spinButtonPris = Math.floor(spinButtonPris);
    spinprisDisplay.textContent = `Snurr for: ${spinButtonPris} kr`;
    localStorage.setItem("spin_Button", spinButtonPris);
}

// Trykking på bildet for å få poeng
bilde.addEventListener("click", (event) => {
    score += ScorePerClick;
    updateScore();
    createNewElement(event); // Lag animerte flytende tall
    bilde.classList.add('bilde_hopp');

    // Fjern animasjonsklassen etter 0,5 sekunder
    setTimeout(() => {
        bilde.classList.remove('bilde_hopp');
    }, 500);
});

// Event listener for oppgradering av mus
upgrademus.addEventListener("click", () => {
    if (score >= upgrademus_pris) {
        score -= upgrademus_pris;
        ScorePerClick += isFrenzyActive ? 7 : 1;
        upgrademus_pris *= 1.5;
        updateScore();
        localStorage.setItem("ScorePerClick", ScorePerClick);
        updateMusPris();
    }
});

// Event listener for oppgradering av autoScore
kjøp1.addEventListener("click", () => {
    if (score >= en_pris) {
        score -= en_pris;
        en_pris *= 1.5;
        autoScore += isFrenzyActive ? 7 : 1;
        localStorage.setItem("1_pris", en_pris);
        updatecps();
        update1Pris();
        updateScore();
    }
});

// Automatisk poeng per sekund og reduksjon i snurr-knappens pris
setInterval(() => {
    score += autoScore;
    updateScore();
    if (spinButtonPris > 50) {
        spinButtonPris *= 0.995;
        updateSpinPris();
    }
}, 1000);

// Funksjon for å lage flytende tallanimasjon
function createNewElement(event) {
    const newElement = document.createElement("div");
    newElement.textContent = `+${ScorePerClick}`;
    newElement.classList.add("cpc");

    const container = document.getElementById("container");
    const rect = container.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const randomOffset = Math.floor(Math.random() * 51) - 25;
    const randomX = mouseX + randomOffset;

    newElement.style.left = randomX + "px";
    newElement.style.top = mouseY + "px";

    container.appendChild(newElement);

    setTimeout(() => {
        newElement.remove();
    }, 1950);
}

// Funksjon som lager en gylden mynt
function lagMynt() {
    const gyldenMynt = document.createElement('div');
    gyldenMynt.classList.add('gylden-mynt');
    gyldenMynt.style.top = Math.random() * 100 + '%';
    gyldenMynt.style.left = Math.random() * 100 + '%';
    document.body.appendChild(gyldenMynt);

    setTimeout(() => {
        gyldenMynt.remove();
    }, 9950);
}

// Opprett en gylden mynt hvert minutt
setInterval(lagMynt, 60000);

// Klikk på gylden mynt aktiverer Frenzy-modus
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("gylden-mynt") && !isFrenzyActive) {
        autoScore *= 7;
        ScorePerClick *= 7;
        isFrenzyActive = true;
        localStorage.setItem("isFrenzyActive", JSON.stringify(isFrenzyActive));
        updatecps();
        event.target.remove();
        timer.classList.add('timer-bar');
        setTimeout(() => {
            isFrenzyActive = false;
            autoScore /= 7;
            ScorePerClick /= 7;
            updatecps();
            timer.classList.remove('timer-bar');
        }, 10000);
    }
});

const reel1 = document.getElementById("reel-1");
const reel2 = document.getElementById("reel-2");
const reel3 = document.getElementById("reel-3");
const result = document.getElementById("result");
const spinButton = document.getElementById("spin_Button");
const symbols = ["🍒", "🍋", "🍊", "🍎", "🍐"];

function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

spinButton.addEventListener("click", () => {
    if (score >= spinButtonPris) {   
        // Snurr hjulene
        reel1.innerHTML = `${getRandomSymbol()}`;
        reel2.innerHTML = `${getRandomSymbol()}`;
        reel3.innerHTML = `${getRandomSymbol()}`;

        // Sjekk resultat
        if (reel1.textContent === reel2.textContent && reel2.textContent === reel3.textContent) {
            result.textContent = "Du vant!";
            result.style.color = "green";
            score += spinButtonPris * 50;
            spinButtonPris = spinButtonPris + (autoScore * 60) + (ScorePerClick * 60) + (score / 60);
            updateScore();
            updateSpinPris();
        } else {
            result.textContent = "Prøv igjen!";
            result.style.color = "red";
            score -= spinButtonPris;
            if (spinButtonPris > 50) {
                spinButtonPris = spinButtonPris * 0.99;
            }
            updateScore();
            updateSpinPris();
        }
    }
});

const restart = document.getElementById("restart");
restart.addEventListener("click", () => {
    score = 0;
    upgrademus_pris = 40;
    en_pris = 15;
    autoScore = 0;
    spinButtonPris = 100;
    ScorePerClick = 1;
    localStorage.setItem("ScorePerClick", ScorePerClick);
    updateScore();
    updateMusPris();
    update1Pris();
    updatecps();
    updateSpinPris();
});
