const hiScoreBtn = $("#hiscore-button");
const goBackBtn = $("#goback-button");
const startBtn = $("#start-button");

const mainMenu = $("#main-menu");
const scoreMenu = $("#score-menu");
const quizMenu = $("#quiz-menu");
const endMenu = $("#end-menu");
const timer = $("#timer");

hiScoreBtn.on("click", function() {
    // hide all menus and hiscore button
    mainMenu.css("display", "none");
    quizMenu.css("display", "none");
    endMenu.css("display", "none");
    hiScoreBtn.css("display", "none");
    // show score menu and go back button
    scoreMenu.css("display", "flex");
    goBackBtn.css("display", "block");

    if(hiScores.length === 0) {
        $(".list").append("<p style='text-align:center;font-size:2rem;'>There are no high scores yet!!</p>");
    };
});

goBackBtn.on("click", function() {
    // hide all menus and go back button
    scoreMenu.css("display", "none");
    quizMenu.css("display", "none");
    endMenu.css("display", "none");
    goBackBtn.css("display", "none");
    // show main menu and hiscore button
    mainMenu.css("display", "flex");
    hiScoreBtn.css("display", "block");
});

// Timer stuff

let timeLeft;
let timeInterval;

function startTimer() {
    timeLeft = 100;
    timerInterval = setInterval(function() {
        timeLeft--;
        timer.text("Timer: " + timeLeft);
        if (timeLeft <= 0) {
            endScreen();
            clearInterval(timerInterval);
        };
    }, 1000);
};

// Answer prompt timer
function promptTime() {
    let answerTime = 3;
    promptInterval = setInterval(function() {
        answerTime--;
        if (answerTime == 0) {
            answerPrompt.text("");
            clearInterval(promptInterval);
        };
    }, 500);
};

// Actual quiz stuff

startBtn.on("click", function() {
    //hide all menus
    mainMenu.css("display", "none");
    scoreMenu.css("display", "none");
    endMenu.css("display", "none");
    // show quiz menu
    quizMenu.css("display", "block");
    // start timer function
    startTimer();
    startQuiz();
    // disable hiscore button
    hiScoreBtn.attr("disabled", "disabled");
});

let scoreDisplay = $("#score-display");

function endScreen() {
    console.log("times up!!");
    // hiScoreBtn.removeAttr("disabled");
    quizMenu.css("display", "none");
    endMenu.css("display", "block");
    // display score
    let finalScore = (correctAnswers * timeLeft);
    scoreDisplay.text("Score: " + finalScore);
};

let question = $("#question");
let choiceA = $("#a");
let choiceB = $("#b");
let choiceC = $("#c");
let choiceD = $("#d");
let answerPrompt = $("#answer-prompt");

let questionIndex;
let correctAnswers = 0; //keep track of correct answers

function startQuiz() {
    questionIndex = 0;
    correctAnswers = 0; //reset when you start a quiz again
    showQuestion();
};

function showQuestion() {
    console.log(correctAnswers);
    if (questionIndex < questions.length) {
        let currentQuestion = questions[questionIndex];

        question.text(currentQuestion.q);
        choiceA.text(currentQuestion.choices[0]);
        choiceB.text(currentQuestion.choices[1]);
        choiceC.text(currentQuestion.choices[2]);
        choiceD.text(currentQuestion.choices[3]);
    } else {
        endScreen();
        clearInterval(timerInterval);
    };
};

function choiceClick(choiceIndex) {
    let currentQuestion = questions[questionIndex];
    if (currentQuestion.choices[choiceIndex] === currentQuestion.correct) {
        timeLeft += 10;
        promptTime();
        answerPrompt.text("Correct!!");
        correctAnswers += 1;
    } else {
        timeLeft -= 5;
        promptTime();
        answerPrompt.text("Incorrect...");
    };
    questionIndex++;
    showQuestion();
};

choiceA.on("click", function() {
    choiceClick(0);
});

choiceB.on("click", function() {
    choiceClick(1);
});

choiceC.on("click", function() {
    choiceClick(2);
});

choiceD.on("click", function() {
    choiceClick(3);
});

const questions = [
    {
        q: "1. Inside which HTML element do we put the Javascript?",
        choices: ["a. <javascript>", "b. <js>", "c. <script>", "d. <src>"],
        correct: "c. <script>"
    },

    {
        q: "2. How do you add a comment inside a Javascript?",
        choices: ["a. #Comment", "b. //Comment", "c. <!--Comment-->", "d. **Comment"],
        correct: "b. //Comment"
    },

    {
        q: "3. What is the purpose of Javascript?",
        choices: ["a. Defines the structure of the content", "b. Styles the content", "c. Adds interactivity to the content", "d. Nothing"],
        correct: "c. Adds interactivity to the content"
    },

    {
        q: "4. Which is the correct way to declare a variable?",
        choices: ["a. variable = nameEl;", "b. var nameEl == value;", "c. var = nameEl;", "d. var nameEl = value;"],
        correct: "d. var nameEl = value;"
    },

    {
        q: "5. What does the stopPropagation() method do?",
        choices: ["a. Prevents event bubbling", "b. Prevents the page from refreshing", "c. Remembers preferences when the user closes the window", "d. Turns an object into a string"],
        correct: "a. Prevents event bubbling"
    },

    {
        q: "6. What number do Array indexes start with?",
        choices: ["a. 0", "b. 1", "c. x", "d. i"],
        correct: "a. 0"
    },

    {
        q: "7. Which of the following is NOT an assignment operator?",
        choices: ["a. +", "b. -", "c. &", "d. *"],
        correct: "c. &"
    },

    {
        q: "8. What does DOM stand for?",
        choices: ["a. Declarative Object Method", "b. Definitive Operation Method", "c. Donut Octopus Mango", "d. Document Object Model"],
        correct: "d. Document Object Model"
    },

    {
        q: "9. Which of the following is getting a handle on an HTML element with the class 'root'?",
        choices: ["a. var rootEl = document.GetElementById('root')", "b. var rootEl = document.querySelector('.root')", "c. var rootEl = .root", "d. var rootEl = getElementByClass('root')"],
        correct: "b. var rootEl = document.querySelector('.root')"
    },

    {
        q: "10. Which of these is NOT a valid event listener value?",
        choices: ["a. click", "b. keydown", "c. enter", "d. mouseover"],
        correct: "c. enter"
    },
];

// submitting scores
let submitScore = $("#submit-score");
let hiScoreList = $("#hiscore-list");

const hiScores = JSON.parse(localStorage.getItem("hiScores")) || [];

submitScore.on("click", function(event) {
    event.preventDefault();
    let nameInput = $("#name-input").val();
    let score = $("#score-display").text().replace("Score: ", "");
    let finalSubmission = {name: nameInput.toUpperCase(), score: score};

    if (!nameInput) {
        alert("Enter initals dingbat.");
        return;
    };

    hiScores.push(finalSubmission);
    localStorage.setItem("hiScores", JSON.stringify(hiScores));

    endMenu.css("display", "none");
    scoreMenu.css("display", "flex");

    hiScoreBtn.removeAttr("disabled");
    hiScoreBtn.css("display", "none");
    goBackBtn.css("display", "block");

    updateStorage();
});

// clear local storage

let clearScores = $("#clear-button");

clearScores.on("click", function() {
    localStorage.clear();
    location.reload();
});

// use local storage to display scores :))

function updateStorage() {
    hiScores.sort((a, b) => b.score - a.score);
    hiScores.splice(10);
    hiScoreList.empty();

    for (let i = 0; i < hiScores.length; i++) {
        let listItem = $("<li>");
        listItem.text(hiScores[i].name + " - " + hiScores[i].score);
        hiScoreList.append(listItem);
    };
};

updateStorage();