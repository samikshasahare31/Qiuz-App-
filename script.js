const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');
const timerContainer = document.querySelector('.timer-container');
const optionList = document.querySelector('.option-list');
const openPdfBtn = document.querySelector('.open-pdf-btn');
const closePdfBtn = document.querySelector('.close-pdf-btn');
const pdfPopup = document.querySelector('.pdf-popup');

let timer;
let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

const submitBtn = document.querySelector('.submit-btn');
const questionTimerDuration = 60;

function stopTimer() {
   clearInterval(timer);
}

function startTimer(durationInSeconds) {
   let timeRemaining = durationInSeconds;
   updateTimerDisplay(timeRemaining);

   timer = setInterval(() => {
      if (timeRemaining > 0) {
         timeRemaining--;
         updateTimerDisplay(timeRemaining);
      } else {
         stopTimer();
         submitQuestion();
      }
   }, 1000);
}

function updateTimerDisplay(timeRemaining) {
   const minutes = Math.floor(timeRemaining / 60);
   const seconds = timeRemaining % 60;
   const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
   timerContainer.innerHTML = `Time Left: <span class="timer-display">${formattedTime}</span>`;
}

function submitQuestion() {
   if (questionCount < questions.length - 1) {
      questionCount++;
      showQuestions(questionCount);

      questionNumb++;
      questionCounter(questionNumb);

      submitBtn.classList.remove('active');

      startTimer(questionTimerDuration);
   } else {
      showResultBox();
   }
}

startBtn.onclick = () => {
   popupInfo.classList.add('active');
   main.classList.add('active');
};

exitBtn.onclick = () => {
   popupInfo.classList.remove('active');
   main.classList.remove('active');
};

continueBtn.onclick = () => {
   quizSection.classList.add('active');
   popupInfo.classList.remove('active');
   main.classList.remove('active');
   quizBox.classList.add('active');

   showQuestions(0);
   questionCounter(1);
   headerScore();
   startTimer(questionTimerDuration);
};
openPdfBtn.addEventListener('click', () => {
   pdfPopup.style.display = 'flex'; 
});

closePdfBtn.addEventListener('click', () => {
   pdfPopup.style.display = 'none'; 
});

tryAgainBtn.onclick = () => {
   quizBox.classList.add('active');
   resultBox.classList.remove('active');

   questionCount = 0;
   questionNumb = 1;
   userScore = 0;
   showQuestions(questionCount);
   questionCounter(questionNumb);

   headerScore();
   startTimer(questionTimerDuration);
};

goHomeBtn.onclick = () => {
   quizSection.classList.remove('active');
   resultBox.classList.remove('active');

   questionCount = 0;
   questionNumb = 1;
   userScore = 0;
   showQuestions(questionCount);
   questionCounter(questionNumb);
   stopTimer();
};

submitBtn.onclick = () => {
   stopTimer();
   submitQuestion();
};
function showQuestions(index) {
   const questionText = document.querySelector('.question-text');
   questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

   let optionTag = `<div class="option"><input type="radio" id="optionA" name="answer" value=${questions[index].options[0]}><span>${questions[index].options[0]}</span></div>
   <div class="option"><input type="radio" id="optionA" name="answer" value=${questions[index].options[1]}><span>${questions[index].options[1]}</span></div>
   <div class="option"><input type="radio" id="optionA" name="answer" value=${questions[index].options[2]}><span>${questions[index].options[2]}</span></div>
   <div class="option"><input type="radio" id="optionA" name="answer" value=${questions[index].options[3]}><span>${questions[index].options[3]}</span></div>`;


   optionList.innerHTML = optionTag;
   
   const option = document.querySelectorAll(".option");
   for (let i = 0; i < option.length; i++) {
      option[i].setAttribute('onclick', 'optionSelected(this)');
   }
}

function optionSelected(answer) {
   let userAnswer = answer.textContent;
   let correctAnswer = questions[questionCount].answer;
   let allOptions = optionList.children.length;

   if (userAnswer == correctAnswer) {
      answer.classList.add('correct');
      userScore += 1;
      headerScore();
   }
   else {
      answer.classList.add('incorrect');

      for (let i = 0; i < allOptions; i++) {
         if (optionList.children[i].textContent == correctAnswer) {
            optionList.children[i].setAttribute('class', 'option correct');
         }
      }
   }
   for (let i = 0; i < allOptions; i++) {
      optionList.children[i].classList.add('disabled');
   }

   submitBtn.classList.add('active');
}

function questionCounter(index) {
   const questionTotal = document.querySelector('.question-total');
   questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

function headerScore() {
   const headerScoreText = document.querySelector('.header-score');
   headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}

function showResultBox() {
   quizBox.classList.remove('active');
   resultBox.classList.add('active');

   const scoreText = document.querySelector('.score-text');
   scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;

   const circularPogress = document.querySelector('.circular-progress');
   const progressValue = document.querySelector('.progress-value');
   let progressStartValue = -1;
   let progressEndValue = (userScore / questions.length) * 100;
   let speed = 20;

   let progress = setInterval(() => {
      progressStartValue++;

      progressValue.textContent = `${progressStartValue}%`;
      circularPogress.style.background = `conic-gradient(#00b6c4 ${progressStartValue * 3.6}deg, rgba(255, 255, 255, .1) 0deg)`;

      if (progressStartValue == progressEndValue) {
         clearInterval(progress);
      }
   }, speed);
};

