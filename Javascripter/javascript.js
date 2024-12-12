
// Set default values if no saved data exists in localStorage
let score = localStorage.getItem("score") ? parseInt(localStorage.getItem("score")) : 0;
let upgrademus_pris = localStorage.getItem("upgrademus_pris") ? parseInt(localStorage.getItem("upgrademus_pris")) : 40;
let en_pris = localStorage.getItem("1_pris") ? parseInt(localStorage.getItem("1_pris")) : 15;
let autocookies = localStorage.getItem("autocookies") ? parseInt(localStorage.getItem("autocookies")) : 0;
let cookiePerClick = localStorage.getItem("cookiePerClick") ? parseInt(localStorage.getItem("cookiePerClick")) : 1;
let isFrenzyActive = localStorage.getItem("isFrenzyActive") ? JSON.parse(localStorage.getItem("isFrenzyActive")) : false;

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
const gambling = document.getElementById("gambling");

// Update the UI when the page loads
document.addEventListener("DOMContentLoaded", () => {
    updateScore(); // Update score display
    updateMusPris(); // Update mouse upgrade price
    update1Pris();
    updatecps();
    if (isFrenzyActive === true){
        isFrenzyActive=false;
        localStorage.setItem("isFrenzyActive", JSON.stringify(isFrenzyActive));
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
        if(isFrenzyActive === true){
            cookiePerClick += 7;
        }
        else{
            cookiePerClick += 1;
        }
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
        }, 20000);
    }
    const reel1 = document.getElementById("reel1");
    const reel2 = document.getElementById("reel2");
    const reel3 = document.getElementById("reel3");
    const result = document.getElementById("result");
    const spinButton = document.getElementById("spinButton");
    
    const symbols = ["🍒", "🍋", "🍉", "⭐", "🍇"];
    
    const spinReel = (reel, stopAfter, interval) => {
        const intervalId = setInterval(() => {
            reel.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        }, interval);
    
        setTimeout(() => {
            clearInterval(intervalId); // Stopper oppdateringene etter `stopAfter` millisekunder
        }, stopAfter);
    };
    
    const spinReels = () => {
        const totalSpinTime = 2000; // Maks tid i millisekunder
        const interval = 100; // Oppdateringstid mellom symbolendringer
    
        spinReel(reel1, totalSpinTime, interval);        // Reel 1 stopper etter 3 sekunder
        spinReel(reel2, totalSpinTime + 1000, interval); // Reel 2 stopper etter 3.5 sekunder
        spinReel(reel3, totalSpinTime + 3000, interval); // Reel 3 stopper etter 4 sekunder
    
        // Viser resultat etter siste hjul stopper
        setTimeout(() => {
            const reel1Symbol = reel1.textContent;
            const reel2Symbol = reel2.textContent;
            const reel3Symbol = reel3.textContent;
    
            if (reel1Symbol === reel2Symbol && reel2Symbol === reel3Symbol) {
                result.textContent = "🎉 Jackpot! You win! 🎉";
            } else {
                result.textContent = "Try again!";
            }
        }, totalSpinTime + 1000); // Vent til siste hjul har stoppet
    };
    
    spinButton.addEventListener("click", spinReels);
    
});
