const table = document.getElementById("resultTable");

function addToTable() {
    // Hent inputverdi og konverter til tall
    let inputP = parseFloat(document.getElementById("inputPrimos").value) || 0;
    let inputS = parseFloat(document.getElementById("inputStarglitter").value) || 0;
    let inputF = parseFloat(document.getElementById("inputFates").value) || 0;

    // Beregn resultatet
    const result = inputF + (inputP / 160) + (inputS / 5);

    // Opprett ny rad i tabellen
    const row = table.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);

    // Fyll inn verdier uten desimaler
    cell1.textContent = Math.floor(result); // Opprinnelig tall
    cell2.textContent = Math.floor(result / 90); // Rundet ned resultat

    // Logg resultatet
    console.log("Resultat:", result);
}

function clearTable() {
    while (table.rows.length > 0) {
      table.deleteRow(0);
    }
}
