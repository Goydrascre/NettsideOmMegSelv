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
  
  let forbrenningsanlegg = 1;
  
  // Oppdater verdiene ved klikk
  const Pbutton = document.getElementById('+1');
  Pbutton.addEventListener('click', () => {
      forbrenningsanlegg += 1; // Øk verdien
      avfall += 200000;
      C02 += 100000;
      energi += 120000; // Øk energi med 120000 kWh (600 kWh per tonn avfall)
      oppdaterStatistikk(); // Oppdater diagrammet med nye verdier
  });
  
  const Mbutton = document.getElementById('-1');
  Mbutton.addEventListener('click', () => {
      forbrenningsanlegg -= 1; // Reduser verdien
      avfall -= 200000;
      C02 -= 100000;
      energi -= 120000; // Reduser energi med 120000 kWh
      oppdaterStatistikk(); // Oppdater diagrammet med nye verdier
  });
  