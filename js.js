 // Spør bruker om data
 let userInput = prompt("Skriv inn tall og tekst, adskilt med mellomrom:");

 // Vis inputen i konsollen
 console.log("Inndata fra bruker:", userInput);

 // Splitter inputen i en liste for å analysere hver del
 let inputArray = userInput.split(" ");

 // Filtrer ut bare tallene fra inputen
 let numbers = inputArray.filter(value => !isNaN(value) && value !== "").map(Number);

 // Beregn summen av tallene
 let sum = numbers.reduce((acc, curr) => acc + curr, 0);

 // Vis inputen og summen på nettsiden
 document.getElementById("inputData").innerText = "Inndata: " + userInput;
 document.getElementById("sumResult").innerText = "Sum av tall: " + sum;

 // Vis inputen og summen i konsollen
 console.log("Inndata: " + userInput);
 console.log("Sum av tall: " + sum);