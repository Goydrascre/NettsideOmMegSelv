function pulls() {
    const primos = Number(prompt("Hvor mange primogems har du?"));
    const intertwinedFate = Number(prompt("Hvor mange Intertwined Fates har du?"));

    // Beregn antall pulls
    const totalPulls = Math.floor(primos / 160) + intertwinedFate;

        // Log resultatet i konsollen
        document.getElementById("resultat").innerHTML = `Du kan gjøre totalt ${totalPulls} pulls.`;
}