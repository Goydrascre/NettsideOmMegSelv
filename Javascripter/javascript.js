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

const scoreDisplay=document.getElementById("score");
const upgrademusDisplay=document.getElementById("upgrademusDisplay");
const cookie = document.getElementById("cookie")
const upgrademus = document.getElementById("upgrade1");
const byggning1 = document.getElementById("byggning1");
const byggning2 = document.getElementById("byggning2");
const byggning3 = document.getElementById("byggning3");

function updateScore() {
    scoreDisplay.textContent = `${score}kr`;
}
function updateMusPris() {
    upgrademusDisplay.textContent = `kjøp bedre mus for: ${upgrademus_pris}kr`;
}
cookie.addEventListener("click", () => {
    score += cookiePerClick;
    updateScore();
    createNewElement();

});

upgrademus.addEventListener("click", () => {
    if (score >= upgrademus_pris){
        score-=upgrademus_pris
        cookiePerClick+= 1;
        upgrademus_pris=upgrademus_pris*2
        updateScore();
        updateMusPris();
    }
    });
kjøpHTML.addEventListener("click", () => {
    if (score >= HTML_pris){
        score-=HTML_pris
        ;
        upgrademus_pris=upgrademus_pris*2
        updateScore();
        updateMusPris();
    }
    });
    function loadGame() {
        const savedScore = localStorage.getItem('score');
        if (savedScore) score = parseInt(savedScore, 10);
        updateScore();
    }
    
    function saveGame() {
        localStorage.setItem('score', score);
    }


function createNewElement() {
  // Opprett et nytt element
  var newElement = document.createElement('div');
  newElement.textContent = `${cookiePerClick}`;
  
  // Legg til en klasse for styling
  newElement.classList.add('new-item');
  
  // Finn containeren hvor det nye elementet skal legges til
  var container = document.getElementById('container');
  
  // Beregn musekoordinatene relative til containeren
  var rect = container.getBoundingClientRect();  // Finn posisjonen til containeren
  var mouseX = event.clientX - rect.left;  // Juster X-koordinaten
  var mouseY = event.clientY - rect.top;   // Juster Y-koordinaten
  
  // Posisjoner elementet på musepekeren
  newElement.style.left = mouseX + 'px';
  newElement.style.top = mouseY + 'px';
  
  // Legg til det nye elementet i containeren
  container.appendChild(newElement);
}

loadGame();