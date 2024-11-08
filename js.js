function pulls() {
    const primos = Number(prompt("Hvor mange primogems har du?"));
    const intertwinedFate = Number(prompt("Hvor mange Intertwined Fates har du?"));
    const starglitter = Number(prompt("Hvor mye starglitter har du?"));


    // Beregn antall pulls
    const totalPulls = Math.floor(primos / 160) + (intertwinedFate) + Math.floor(starglitter/5);

        document.getElementById("resultat").innerHTML = `Du kan gjøre totalt ${totalPulls} pulls.`;
}