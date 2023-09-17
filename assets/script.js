//HANDLE ON MENUS
var mainMenu = document.querySelector("#menu");
var scoreMenu = document.querySelector("#scoreboard");
var quizMenu = document.querySelector("#quiz");
var endMenu = document.querySelector("#end");

//HANDLE ON BUTTONS
var viewScoreButton = document.querySelector("#highscore");
var backButton = document.querySelector("#go-back");
var clearButton = document.querySelector("#clear-score");
var startButton = document.querySelector("#start");
var submitButton = document.querySelector("#submit-score");

//QUIZ TIMER
var timer = document.querySelector("#timer");
var timeLeft = 60;
var timeInterval;

var setTime = function() {
    timeInterval = setInterval(function() {
        timeLeft--;
        timer.textContent = "Timer: " + timeLeft;
        if (timeLeft <= 0) {
            endScreen();
            clearInterval(timeInterval);
         };
    }, 1000);
};


//ANSWER PROMPT TIMER
var answerTime = 3;
var promptTime;

var promptTime = function() {
    promptInterval = setInterval(function() {
        answerTime--;
        if (answerTime == 0) {
            answerPrompt.textContent = "";
            clearInterval(promptInterval);
         };
    }, 500);
};

//LOCAL STORAGE
var nameInput = document.querySelector("#name");
var scoreList = document.querySelector("#hi-score-list");
var finalScore = document.querySelector("#score-display");

var storeRecord = JSON.parse(localStorage.getItem("nameRecord"));

var nameList = [];


//QUIZ HANDLES
var question = document.querySelector("#question");
var choiceA = document.querySelector("#a");
var choiceB = document.querySelector("#b");
var choiceC = document.querySelector("#c");
var choiceD = document.querySelector("#d");

var questionIndex = 0;

var answerPrompt = document.querySelector("#answer-prompt");

//BUTTON FUNCTIONS

// show scoreboard menu
viewScoreButton.addEventListener("click", function() {
    mainMenu.setAttribute("style", "display: none;");
    quizMenu.setAttribute("style", "display: none;");
    endMenu.setAttribute("style", "display: none;");
    scoreMenu.setAttribute("style", "display: block;");
    clearInterval(timeInterval);
});

//go back to main menu from the score menu
backButton.addEventListener("click", function() {
    scoreMenu.setAttribute("style", "display: none;");
    mainMenu.setAttribute("style", "display: block;");
});

//clear scores from the score menu
clearButton.addEventListener("click", function(event) {
    event.preventDefault();
    localStorage.clear();
    nameList = [];
    scoreList.innerHTML = ""; //clears list
});

//starts the quiz
startButton.addEventListener("click", function() {
    mainMenu.setAttribute("style", "display: none;");
    quizMenu.setAttribute("style", "display: block;");
    quizStart();
});

//submits user input and adds onto the local storage?? jump from end to score menu
submitButton.addEventListener("click", function(event) {
    event.preventDefault();

    endMenu.setAttribute("style", "display: none;");
    scoreMenu.setAttribute("style", "display: block;");

    nameList.push(nameInput.value.trim() + " - " + timeLeft);

    localStorage.setItem("nameRecord", JSON.stringify(nameList));


    nameInput.value = ""; //clears the textbox for the name input

    scoreList.innerHTML = ""; //okayy this clears the list and pretty much updates adding the namelist to the score list

    // still not keeping the list when i refresh >:((
    // yeah idk why it's not keeping the score list when I go back onto the page
        
    for (var i = 0; i < nameList.length; i++) {
        var listItem = document.createElement("li");
        listItem.textContent = nameList[i];
        scoreList.appendChild(listItem);
    };

});

function endScreen() {
    quizMenu.setAttribute("style", "display: none;");
    endMenu.setAttribute("style", "display: block;");

    finalScore.textContent = "Your final score is: " + timeLeft;
};

function quizStart() {
    timeLeft = 60;
    questionIndex = 0;
    showQuestion();
    setTime();
};

function showQuestion() {

    if (questionIndex < questionList.length) {
        var currentQuestion = questionList[questionIndex];

        question.textContent = currentQuestion.q;
        choiceA.textContent = currentQuestion.choices[0];
        choiceB.textContent = currentQuestion.choices[1];
        choiceC.textContent = currentQuestion.choices[2];
        choiceD.textContent = currentQuestion.choices[3];
    } else {
        endScreen();
        clearInterval(timeInterval);
    }
};

function choiceClick(choiceIndex) {
    var currentQuestion = questionList[questionIndex];

    if (currentQuestion.choices[choiceIndex] === currentQuestion.correct) {
        timeLeft += 10;
        answerPrompt.setAttribute("style", "color: green;");
        answerPrompt.textContent = "Correct!";
        answerTime = 3;
        promptTime();
        
    } else {
        timeLeft -= 5;
        answerPrompt.setAttribute("style", "color: red;");
        answerPrompt.textContent = "Wrong...";
        answerTime = 3;
        promptTime();
    };
    questionIndex++;
    showQuestion();
};



choiceA.addEventListener("click", function() {
    choiceClick(0);
});

choiceB.addEventListener("click", function() {
    choiceClick(1);
});

choiceC.addEventListener("click", function() {
    choiceClick(2);
});

choiceD.addEventListener("click", function() {
    choiceClick(3);
});


// QUESTIONS

//change questions to actual javascript related stuff, this is just placeholder

var questionList = [
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
        correct: "b. document.querySelector('.root')"
    },

    {
        q: "10. Which of these is NOT a valid event listener value?",
        choices: ["a. click", "b. keydown", "c. enter", "d. mouseover"],
        correct: "c. enter"
    },
];