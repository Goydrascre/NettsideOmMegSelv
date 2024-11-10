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
