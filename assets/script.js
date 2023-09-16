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

//TIMER
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