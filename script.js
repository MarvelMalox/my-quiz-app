// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    Question: "What is the Capital of Nigeria?",
    Answers: [
      { text: "England", correct: false },
      { text: "Amsterdam", correct: false },
      { text: "Lagos", correct: false },
      { text: "Abuja", correct: true },
    ],
  },
  {
    Question: "What is the Color of the Nigerian Flag?",
    Answers: [
      { text: "Green-White-Green", correct: true },
      { text: "Yellow-White-Blue", correct: false },
      { text: "Red-White-Yellow", correct: false },
      { text: "Green-Yellow-Green", correct: false },
    ],
  },
  {
    Question: "What is the Full Meaning of WWW?",
    Answers: [
      { text: "Wide Word Web", correct: false },
      { text: "Web Wide World", correct: false },
      { text: "Wide Word Web", correct: false },
      { text: "World Wide Web", correct: true },
    ],
  },
  {
    Question: "What is the Most Commonly Used Programming Language?",
    Answers: [
      { text: "Python", correct: false },
      { text: "C++", correct: false },
      { text: "JAVA", correct: false },
      { text: "JavaScript", correct: true },
    ],
  },
  {
    Question: "Who Founded WWW?",
    Answers: [
      { text: "Tim Berners-Lee", correct: true },
      { text: "Charles Babbage", correct: false },
      { text: "Blaise Pascal", correct: false },
      { text: "John Abacus", correct: false },
    ],
  },
  {
    Question: "What is the Full Meaning of AI?",
    Answers: [
      { text: "Automation Integration", correct: false },
      { text: "Artificial Internet", correct: false },
      { text: "Aeronautic Innovation ", correct: false },
      { text: "Artificial Intelligence", correct: true },
    ],
  },
  {
    Question: "Who Founded the Company, Amazon?",
    Answers: [
      { text: "Bill Gates", correct: false },
      { text: "Jeff Bezos", correct: true },
      { text: "Mark Zuckerberg", correct: false },
      { text: "Elon Musk", correct: false },
    ],
  },
  {
    Question: "What is the Full Meaning of HTML?",
    Answers: [
      { text: "HyperTime Movement Language", correct: false },
      { text: "HyperTise Machine Language", correct: false },
      { text: "HybridTool Masking Language", correct: false },
      { text: "HyperText Markup Language", correct: true },
    ],
  },
  {
    Question: "What is the Full Meaning of ICT?",
    Answers: [
      { text: "Information, Communication and Technology", correct: false },
      { text: "Information Connection to Technology", correct: false },
      { text: "Information and Communication Technology", correct: true },
      { text: "Integration of Computational Technology", correct: false },
    ],
  },
  {
    Question: "Who Founded Living Faith Church Worldwide (Winners' Chapel)?",
    Answers: [
      { text: "Bishop David Oyedepo", correct: true },
      { text: "Pastor E.A. Adeboye", correct: false },
      { text: "Pastor Paul Eneche", correct: false },
      { text: "Pastor Lawrence Oyor", correct: false },
    ],
  },
];

let timeLeft = 45;
let timerInterval;

function startTimer() {
  const timerElement = document.getElementById("timer");
  timerElement.textContent = timeLeft;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft + "s";

    if(timeLeft <= 0) {
      clearInterval(timerInterval);
      showResults();
    }
  }, 1500);
}

function stopTimer() {
  clearInterval(timerInterval);
}
// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  // reset vars
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  backgroundMusic.play();

  timeLeft = 45;
  startTimer();

  showQuestion();
}

function showQuestion() {
  // reset state
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.Question;

  answersContainer.innerHTML = "";

  currentQuestion.Answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    // what is dataset? It’s a property of the button element that allows you to store custom data
    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  // optimization check
  if (answersDisabled) return;

  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  // Here Array.from() is used to convert the NodeList returned by answersContainer.children into an array, this is because the NodeList is not an array and we need to use the forEach method
  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    // check if there are more questions or if the quiz is over
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Almost There! Keep it Up!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good Effort! Keep Learning!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!";
  } else {
    resultMessage.textContent = "Keep Studying! You'll get better!";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");

  backgroundMusic.play();

  startQuiz();
}

//To define the audio so that it can be used everywhere
const backgroundMusic = new Audio('Elektronomia - Sky High [NCS Release].mp3')
backgroundMusic.loop = true;
backgroundMusic.loop = true;
backgroundMusic.volume = 0.5;

function goToWelcomeScreen() {
  // Go back to nickname or welcome screen
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0; // reset to anything
}
