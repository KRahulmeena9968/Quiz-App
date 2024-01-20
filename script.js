const Questions = [
  {
    question: "Name the Governal General who abolished sati in 1829 ?",
    answer: [
      { text: "Lord Clive", correct: false },
      { text: "Lord Curzon", correct: false },
      { text: "Lord William Bentinck", correct: true },
      { text: "Lord Dalhousie", correct: false },
    ],
  },
  {
    question: " All India Harijan Sangha established in? ",
    answer: [
      {
        text: "1930",
        correct: false,
      },
      { text: "1931", correct: false },
      { text: "1932", correct: true },
      { text: "1933", correct: false },
    ],
  },
  {
    question: "Mangal Pandey was a sepoy at?",
    answer: [
      {
        text: "Royal Gorkha Rifle",
        correct: false,
      },
      { text: "34th Bengal Native Infantary", correct: true },
      { text: "Sikh Regiment", correct: false },
      { text: "None of above", correct: false },
    ],
  },
  {
    question: "First battle of Panipat was fought between?",
    answer: [
      {
        text: "Babur and Lodi",
        correct: true,
      },
      { text: "Akbar and Hemu", correct: false },
      { text: "Mughal and British", correct: false },
      { text: "Akbar and Lodi", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answers-btn");
const nextButton = document.getElementById("next-btn");

let currQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currQuestion = Questions[currQuestionIndex];
  let questionNo = currQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currQuestion.question;

  currQuestion.answer.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);

    if(answer.correct) {
        button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
    // nextButton.style.display = "none";
    while(answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectbtn = e.target;
    const isCorrect = selectbtn.dataset.correct === "true";
    if(isCorrect) {
        selectbtn.classList.add("Correct");
        score++;
    } else {
        selectbtn.classList.add("Incorrect");
    }

    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("Correct");
        }
        button.disabled = "true";
    })
    // nextButton.style.display = "block"
}

function showScore() {
    resetState(); 
    questionElement.innerHTML = `You scored ${score} out of ${Questions.length}!`;
    nextButton.innerHTML = "Play Again";
    questionElement.style.textAlign = "center";
}
function handleNextBtn() {
    currQuestionIndex++;
    if(currQuestionIndex < Questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}
nextButton.addEventListener("click", ()=> {
    if(currQuestionIndex < Questions.length) {
        handleNextBtn();
    } else {
        startQuiz();
    }
})

startQuiz();
