const quizData = [
  {
    question: "Hva er formålet med et forbrenningsanlegg?",
    options: ["Å produsere plastmaterialer", "Å håndtere avfall og produsere energi", "Å lage biobrensel", "Å deponere farlig avfall"],
    correct: 1,
  },
  {
    question: "Hvilket av følgende er et biprodukt fra forbrenning av avfall?",
    options: ["Aske", "Rent vann", "Biogass", "Plastgranulat"],
    correct: 0,
  },
  {
    question: "Hva er en utfordring ved bruk av forbrenningsanlegg?",
    options: ["De kan bare håndtere metallavfall", "Utslipp av CO₂ og andre klimagasser", "De krever kun fornybart avfall", "De erstatter all behov for resirkulering"],
    correct: 1,
  },
]
  
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

  let avfall = 200000;
  let C02 = avfall * 0.5; // 0.5 tonn CO2 per tonn avfall
  let energi = avfall * 0.6; // 600 kWh per tonn avfall
  
  // Opprett en global variabel for diagrammet
  let myChart;
  
  function oppdaterStatistikk() {
      // Hvis diagrammet allerede finnes, oppdater dataene
      if (myChart) {
          myChart.data.datasets[0].data = [avfall, C02, energi]; // Nå med energi
          myChart.update(); // Oppdater diagrammet
      } else {
          // Opprett diagrammet første gang
          const ctx = document.getElementById('myChart').getContext('2d');
          myChart = new Chart(ctx, {
              type: 'bar',
              data: {
                  labels: ['Avfall brent (tonn)', 'CO2 utslipp (tonn)', 'Energi (MWh)'], // Vis energi i MWh
                  datasets: [{
                      label: '# Statistikk (2023)',
                      backgroundColor: ['blue', 'red', 'green'], // Fyllfarge
                      data: [avfall, C02, energi], // Vis energi i MWh (deler på 1000)
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
      }
  }
  
  // Oppdater diagrammet første gang
  oppdaterStatistikk();