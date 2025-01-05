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
    if (isFrenzyActive) {
        isFrenzyActive = false;
        localStorage.setItem("isFrenzyActive", JSON.stringify(isFrenzyActive));
        autoScore /= 7; // Reduser autoScore etter Frenzy
        ScorePerClick /= 7; // Reduser ScorePerClick etter Frenzy
        updatecps();
    }
});

// Funksjon for å oppdatere poengvisningen
function updateScore() {
    score = Math.floor(score); // Runder av poengsummen nedover
    scoreDisplay.textContent = `${score} kr`; // Viser poeng i HTML
    localStorage.setItem("score", score); // Lagre poengsummen i localStorage
}

// Funksjon for å oppdatere autoScore per sekund
function updatecps() {
    autoScore = Math.floor(autoScore);
    autoScoreDisplay.textContent = `per sekund: ${autoScore}`; // Oppdater HTML-visning
    localStorage.setItem("autoScore", autoScore); // Lagre autoScore
}

// Funksjon for å oppdatere prisen på musoppgradering
function updateMusPris() {
    upgrademus_pris = Math.floor(upgrademus_pris);
    upgrademusDisplay.textContent = `Kjøp bedre mus for: ${upgrademus_pris} kr`; // Oppdater HTML-visning
    localStorage.setItem("upgrademus_pris", upgrademus_pris); // Lagre pris i localStorage
}

// Funksjon for å oppdatere prisen på autoScore-oppgradering
function update1Pris() {
    en_pris = Math.floor(en_pris);
    upgrade1Display.textContent = `Kjøp bedre autoScore for: ${en_pris} kr`; // Oppdater HTML-visning
    localStorage.setItem("1_pris", en_pris); // Lagre pris i localStorage
}

// Funksjon for å oppdatere prisen på snurr-knappen
function updateSpinPris() {
    spinButtonPris = Math.floor(spinButtonPris);
    spinprisDisplay.textContent = `Snurr for: ${spinButtonPris} kr`; // Oppdater HTML-visning
    localStorage.setItem("spin_Button", spinButtonPris); // Lagre pris i localStorage
}

// Trykking på bildet for å få poeng
bilde.addEventListener("click", (event) => {
    score += ScorePerClick; // Legg til poeng per klikk
    updateScore(); // Oppdater poengvisning
    createNewElement(event); // Lag animasjon for flytende tall
    bilde.classList.add('bilde_hopp'); // Legg til animasjonsklasse

    // Fjern animasjonsklassen etter 0,5 sekunder
    setTimeout(() => {
        bilde.classList.remove('bilde_hopp');
    }, 500);
});

// Automatisk poeng per sekund og reduksjon i snurr-knappens pris
setInterval(() => {
    score += autoScore; // Legg til poeng basert på autoScore
    updateScore(); // Oppdater poengvisning
    if (spinButtonPris > 50) {
        spinButtonPris *= 0.995; // Reduser prisen gradvis
        updateSpinPris();
    }
}, 1000);

// Klikk på gylden mynt aktiverer Frenzy-modus
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("gylden-mynt") && !isFrenzyActive) {
        autoScore *= 7; // Øk autoScore midlertidig
        ScorePerClick *= 7; // Øk ScorePerClick midlertidig
        isFrenzyActive = true; // Sett Frenzy aktiv
        localStorage.setItem("isFrenzyActive", JSON.stringify(isFrenzyActive));
        updatecps();
        event.target.remove(); // Fjern mynten etter aktivering
        timer.classList.add('timer-bar'); // Vis Frenzy-timer
        setTimeout(() => {
            isFrenzyActive = false; // Deaktiver Frenzy
            autoScore /= 7; // Tilbakestill autoScore
            ScorePerClick /= 7; // Tilbakestill ScorePerClick
            updatecps();
            timer.classList.remove('timer-bar'); // Fjern timer-baren
        }, 10000); // Frenzy varer i 10 sekunder
    }
});

// Opprett en gylden mynt hvert minutt
setInterval(lagMynt, 60000);

// slot maskin //
    const reel1 = document.getElementById("reel-1");
    const reel2 = document.getElementById("reel-2");
    const reel3 = document.getElementById("reel-3");
    const result = document.getElementById("result");
    const spinButton = document.getElementById("spin_Button");
    const symbols = ["🍒", "🍋", "🍊","🍎","🍐"];
    
    function getRandomSymbol() {
      return symbols[Math.floor(Math.random() * symbols.length)];
    }
    spinButton.addEventListener("click", () => {
        if (score>=spinButtonPris) {   
            
      // Snurr hjulene
      reel1.innerHTML = `${getRandomSymbol()}`;
      reel2.innerHTML = `${getRandomSymbol()}`;
      reel3.innerHTML = `${getRandomSymbol()}`;
    
      // Sjekk resultat
      if (reel1.textContent === reel2.textContent && reel2.textContent === reel3.textContent) {
        result.textContent = "Du vant!";
        result.style.color = "green";
        score += spinButtonPris*50
        spinButtonPris=spinButtonPris+(autoScore*60)+(ScorePerClick*60)+(score/60)
        updateScore();
        updateSpinPris();
      } else {
        result.textContent = "Prøv igjen!";
        result.style.color = "red";
        score -= spinButtonPris
        if (spinButtonPris>50) {
        spinButtonPris=spinButtonPris*0.99
        }
        updateScore();
        updateSpinPris();
      }
    }
    });
// start spillet på nytt //
    const restart = document.getElementById("restart");
    restart.addEventListener("click", ()=>{
        score=0
        upgrademus_pris=40
        en_pris=15
        autoScore=0
        spinButtonPris=100
        ScorePerClick=1
        localStorage.setItem("ScorePerClick", ScorePerClick);
        updateScore();
        updateMusPris();
        update1Pris();
        updatecps();
        updateSpinPris();
    })