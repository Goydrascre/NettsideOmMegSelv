let humanScore = 0;
let computerScore = 0;

function playGame() {
    const choices = ["stein", "papir", "saks"];
    const choiceElement = document.getElementById("choice");
    const playerChoice = choiceElement.value;
    const robotChoice = choices[Math.floor(Math.random() * 3)];

    // Determine the result
    let resultMessage = "";
    if (playerChoice === robotChoice) {
        resultMessage = "It's a tie!";
    } 
    else if (
        (playerChoice === "stein" & robotChoice === "saks") ||
        (playerChoice === "papir" & robotChoice === "stein") ||
        (playerChoice === "saks" & robotChoice === "papir")
    ) {
        resultMessage = "Player won!";
        humanScore++;
    } else {
        resultMessage = "Robot won!";
        computerScore++;
    }

    // Update the UI
    document.getElementById("result").textContent = `Result: ${resultMessage} (Player chose ${playerChoice}, Robot chose ${robotChoice})`;
    document.getElementById("score").textContent = `Score: Player ${humanScore} - Robot ${computerScore}`;
}

// Wait for the DOM to be fully loaded
window.addEventListener("DOMContentLoaded", () => {
    const playButton = document.getElementById("play");
    playButton.addEventListener("click", playGame);
});