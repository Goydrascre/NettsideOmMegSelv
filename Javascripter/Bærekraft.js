const quizData = [
    {
      question: "Hva er hovedstaden i Norge?",
      options: ["Oslo", "Bergen", "Trondheim", "Stavanger"],
      correct: 0,
    },
    {
      question: "hva er ?",
      options: ["1933435", "1wd939", "194dw5", "8019"],
      correct: 1,
    },
    {
      question: "er plast",
      options: ["jepp", "nei", "jepp", "tja"],
      correct: 2,
    },
  ];
  
  const quizContainer = document.getElementById("quiz-container");
  const nextBtn = document.getElementById("next-btn");
  const restartBtn = document.getElementById("restart-btn");
  const result = document.getElementById("result");
  
  let currentQuestionIndex = 0;
  let score = 0;
  let incorrectQuestions = [];
  
  // Funksjon for å vise et spørsmål
  function showQuestion(index) {
    quizContainer.innerHTML = ""; // Tøm containeren
    const data = quizData[index];
  
    const questionTitle = document.createElement("h2");
    questionTitle.textContent = `${index + 1}. ${data.question}`;
    quizContainer.appendChild(questionTitle);
  
    data.options.forEach((option, i) => {
      const optionLabel = document.createElement("label");
      const optionInput = document.createElement("input");
      optionInput.type = "radio";
      optionInput.name = `question-${index}`;
      optionInput.value = i;
  
      optionLabel.appendChild(optionInput);
      optionLabel.append(option);
      quizContainer.appendChild(optionLabel);
      quizContainer.appendChild(document.createElement("br"));
    });
  
    nextBtn.style.display = "block"; // Vis "Neste"-knappen
    restartBtn.style.display = "none"; // Skjul "Start på nytt"-knappen
  }
  
  // Håndter neste spørsmål
  nextBtn.addEventListener("click", () => {
    const selectedOption = document.querySelector(
      `input[name="question-${currentQuestionIndex}"]:checked`
    );
  
    if (!selectedOption) {
      alert("Vennligst velg et alternativ før du går videre!");
      return;
    }
  
    // Sjekk om svaret er korrekt
    const selectedValue = parseInt(selectedOption.value);
    if (selectedValue === quizData[currentQuestionIndex].correct) {
      score++;
    } else {
      incorrectQuestions.push(currentQuestionIndex + 1);
    }
  
    currentQuestionIndex++;
  
    // Vis neste spørsmål eller resultat
    if (currentQuestionIndex < quizData.length) {
      showQuestion(currentQuestionIndex);
    } else {
      showResult();
    }
  });
  
  // Vis resultat
  function showResult() {
    quizContainer.innerHTML = "";
    nextBtn.style.display = "none";
    restartBtn.style.display = "block"; // Vis "Start på nytt"-knappen
  
    result.textContent = `Du fikk ${score} av ${quizData.length} riktige!`;
  
    if (incorrectQuestions.length > 0) {
      const incorrectList = document.createElement("p");
      incorrectList.textContent = `Du svarte feil på følgende spørsmål: ${incorrectQuestions.join(
        ", "
      )}.`;
      quizContainer.appendChild(incorrectList);
    } else {
      quizContainer.innerHTML = "<p>Gratulerer! Du svarte riktig på alle spørsmålene!</p>";
    }
  }
  
  // Håndter restart
  restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    incorrectQuestions = [];
    result.textContent = "";
    showQuestion(currentQuestionIndex);
  });
  
  // Start quiz
  showQuestion(currentQuestionIndex);
  function oppdaterStatistikk() {
    // Genererer tilfeldige tall for hver statistikk

    // Oppdaterer HTML-elementene med de nye verdiene
    document.getElementById('brukere').textContent = brukere;
    document.getElementById('besok').textContent = besok;
    document.getElementById('omsetning').textContent = omsetning;
  }
  let søppel = 0
  let besok = 0
  let omsetning = 0

  window.onload = function () {
    console.log("Start");
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Trump', 'Green', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [brukere, besok, omsetning],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
};
