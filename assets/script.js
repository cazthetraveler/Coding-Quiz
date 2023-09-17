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
        //display a message indicating that it's correct
        
    } else {
        timeLeft -= 5;
        answerPrompt.setAttribute("style", "color: red;");
        answerPrompt.textContent = "Wrong...";
        answerTime = 3;
        promptTime();
        //display a message that you are wrONNNNG hahaha
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
        q: "Which animal is the cutest ever?",
        choices: ["a. Doggos", "b. Mouses", "c. Rectangle", "d. Lizzrd"],
        correct: "b. Mouses"
    },

    {
        q: "What would you do if when you okay so he said yes would go?",
        choices: ["a. What...", "b. I daun't knaur...", "c. I would say god bless him and to continue on vocabulary", "d. end livestream"],
        correct: "c. I would say god bless him and to continue on vocabulary"
    },

    {
        q: "What is my favorite water type starter?",
        choices: ["a. Totodile", "b. Piplup", "c. Mudkip", "d. All of the above"],
        correct: "d. All of the above"
    },

    {
        q: "Who the frick is smart?",
        choices: ["a. me :)", "b. stopppp", "c. ur mom", "d. idek"],
        correct: "a. me :)"
    }
];