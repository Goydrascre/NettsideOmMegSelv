
// Set default values if no saved data exists in localStorage
let score = localStorage.getItem("score") ? parseInt(localStorage.getItem("score")) : 0;
let upgrademus_pris = localStorage.getItem("upgrademus_pris") ? parseInt(localStorage.getItem("upgrademus_pris")) : 40;
let en_pris = localStorage.getItem("1_pris") ? parseInt(localStorage.getItem("1_pris")) : 15;
let autocookies = localStorage.getItem("autocookies") ? parseInt(localStorage.getItem("autocookies")) : 0;
let cookiePerClick = localStorage.getItem("cookiePerClick") ? parseInt(localStorage.getItem("cookiePerClick")) : 1;
let isFrenzyActive = localStorage.getItem("isFrenzyActive") ? JSON.parse(localStorage.getItem("isFrenzyActive")) : false;
let spinButtonPris = localStorage.getItem("spin_Button") ? parseInt(localStorage.getItem("spin_Button")) : 100;

const gameArea = document.getElementById("game-area"); // Endre dette til container-elementet ditt
const goldenCookie = document.getElementById("golden-cookie");
const timer = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");
const autocookiesDisplay = document.getElementById("autocookies")
const upgrademusDisplay = document.getElementById("upgrademusDisplay");
const upgrade1Display = document.getElementById("upgrade1Display");
const cookie = document.getElementById("cookie");
const upgrademus = document.getElementById("upgrade1");
const kjøp1 = document.getElementById("kjøp1");
const spinprisDisplay = document.getElementById("spin_Button")

// Update the UI when the page loads
document.addEventListener("DOMContentLoaded", () => {
    updateScore(); // Update score display
    updateMusPris(); // Update mouse upgrade price
    update1Pris();
    updatecps();
    updateSpinPris();
    if (isFrenzyActive === true){
        isFrenzyActive=false;
        localStorage.setItem("isFrenzyActive", JSON.stringify(isFrenzyActive));
        autocookies /= 7;
        cookiePerClick /= 7;
        updatecps();
    }
});

// Function to update the score display
function updateScore() {
    score = Math.floor(score); // Rund av poengsummen nedover
    scoreDisplay.textContent = `${score}kr`;
    localStorage.setItem("score", score); // Lagre poengsummen i localStorage
}
function updatecps() {
    autocookies = Math.floor(autocookies)
    autocookiesDisplay.textContent = `per sekund ${autocookies}`;
    localStorage.setItem("autocookies", autocookies);
}
function updateMusPris() {
    upgrademus_pris = Math.floor(upgrademus_pris)
    upgrademusDisplay.textContent = `kjøp bedre mus for: ${upgrademus_pris}kr`;
    localStorage.setItem("upgrademus_pris", upgrademus_pris); // Save mouse price to localStorage
}
function update1Pris() {
    en_pris= Math.floor(en_pris)
    upgrade1Display.textContent = `kjøp bedre autoclicker for: ${en_pris}kr`;
    localStorage.setItem("1_pris", en_pris); // Save mouse price to localStorage
}
function updateSpinPris() {
    spinButtonPris = Math.floor(spinButtonPris);
    spinprisDisplay.textContent = `Snurr for: ${spinButtonPris} kr`;
    localStorage.setItem("spin_Button", spinButtonPris); 
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
        if(isFrenzyActive === true){
            cookiePerClick += 7;
        }
        else{
            cookiePerClick += 1;
        }
        upgrademus_pris = upgrademus_pris * 1.5;
        updateScore();
        localStorage.setItem("cookiePerClick", cookiePerClick);
        updateMusPris(); // Update the mouse price as well
    }
});

// Event listener for upgrading HTML
kjøp1.addEventListener("click", () => {
    if (score >= en_pris) {
        score -= en_pris;
        en_pris = en_pris * 1.5;
        if(isFrenzyActive === true){
            autocookies += 7;
        }
        else{
            autocookies += 1;
        }
        localStorage.setItem("1_pris", en_pris);
        updatecps();
        update1Pris();
        updateScore();
        
    }
});
setInterval(() => {
    score = score+autocookies;
    updateScore();
    if (spinButtonPris>50) {
        spinButtonPris=spinButtonPris*0.995
        updateSpinPris();
        }
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
    }, 9950);
}

setInterval(goldencookie, 60000);

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("golden-cookie")&& isFrenzyActive === false) {
        autocookies *= 7;
        cookiePerClick *=7;
        isFrenzyActive=true
        localStorage.setItem("isFrenzyActive", JSON.stringify(isFrenzyActive));
        updatecps();
        event.target.remove();
        timer.classList.add('timer-bar');
        setTimeout(() => {
            isFrenzyActive=false;
            localStorage.setItem("isFrenzyActive", JSON.stringify(isFrenzyActive));
            autocookies /= 7;
            cookiePerClick /= 7;
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
    const symbols = ["🍒", "🍋", "🍊"];
    
    function getRandomSymbol() {

      return symbols[Math.floor(Math.random() * symbols.length)];
    }
    spinButton.addEventListener("click", () => {
        if (score>spinButtonPris) {   
            
      // Snurr hjulene
      reel1.textContent = getRandomSymbol();
      reel2.textContent = getRandomSymbol();
      reel3.textContent = getRandomSymbol();
    
      // Sjekk resultat
      if (reel1.textContent === reel2.textContent && reel2.textContent === reel3.textContent) {
        result.textContent = "Gratulerer! Du vant!";
        result.style.color = "green";
        score += spinButtonPris*50
        spinButtonPris=spinButtonPris+(autocookies*60)+(cookiePerClick*60)+(score/60)
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
    const restart = document.getElementById("restart");
    restart.addEventListener("click", ()=>{
        score=0
        upgrademus_pris=40
        en_pris=15
        autocookies=0
        spinButtonPris=100
        cookiePerClick=1
        localStorage.setItem("cookiePerClick", cookiePerClick);
        updateScore();
        updateMusPris();
        update1Pris();
        updatecps();
        updateSpinPris();
    })