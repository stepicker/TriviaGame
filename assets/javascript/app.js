$(document).ready(function() {

// VARIABLES
// ==================================================

// Setting up the complete array of questions
var allQuestions = [
    {
        question: "Who is the first character to travel in time?",
        answers: ["Marty", "Einstein", "Doc", "Seamus"],
        correctAnswer: "Einstein"
    },
    {
        question: "In what year does the first movie start?",
        answers: ["1955", "1990", "1985", "1975"],
        correctAnswer: "1985"
    },
    {
        question: "Who gets infatuated with Marty in 1955?",
        answers: ["Maggie", "Jennifer", "Clara", "Lorraine"],
        correctAnswer: "Lorraine"
    },
    {
        question: "What's the name of Marty's daughter in 2015?",
        answers: ["Marlene", "Maggie", "Clara", "Lorraine"],
        correctAnswer: "Marlene"
    },
    {
        question: "What's the first name of Mr Tannen in the Old West?",
        answers: ["Griff", "Biff", "Buford", "George"],
        correctAnswer: "Buford"
    },
    {
        question: "To which year does the old Biff travel with the Sports Almanac?",
        answers: ["1945", "2015", "1985", "1955"],
        correctAnswer: "1955"
    },
    {
        question: "What name does Doc pick for one of his sons?",
        answers: ["Marty", "George", "Jules", "Biff"],
        correctAnswer: "Jules"
    }
];

// Create key variables for the game

var gameQuestions = [];

var pickedQuestion = [];

var timeLeft = 30;

var wins = 0;

var losses = 0;

var timedOut = 0;

// Create variables for sounds
var winningSound = new Audio("./assets/sounds/ta-da.mp3");
var losingSound = new Audio("./assets/sounds/sad-trombone.mp3");


// FUNCTIONS
// ==================================================

// Load all questions to start a new game
var loadQuestions = function() {
    gameQuestions = allQuestions.slice();
}

// Pick a random question
var pickQuestion = function() {
    var randomNumber = Math.floor(Math.random() * gameQuestions.length);
    pickedQuestion = gameQuestions.splice(randomNumber, 1);
}

// Show the question and answers in the web page
var populatePage = function() {
    $("#question").text(pickedQuestion[0].question);
    $("#answer1").text(pickedQuestion[0].answers[0]);
    $("#answer2").text(pickedQuestion[0].answers[1]);
    $("#answer3").text(pickedQuestion[0].answers[2]);
    $("#answer4").text(pickedQuestion[0].answers[3]);
    $("#result").text("");
}

// Load the next question if available, otherwise end the game
var nextQuestion = function() {
    if (gameQuestions.length > 0) {
        pickQuestion();
        timeLeft = 30;
        $("#countdown").text("Time Left: " + timeLeft);
        countDown = setInterval(function() { everySecond(); }, 1000);
        populatePage();
    }
    else {
        endGame();
    }
}

// Countdown function
var everySecond = function() {
    timeLeft--;
    $("#countdown").text("Time Left: " + timeLeft);
    if (timeLeft === 0) {
        timedOut++;
        clearInterval(countDown);
        $("#result").text("Time Out! The correct answer was: " + pickedQuestion[0].correctAnswer);
        setTimeout(function() {
            nextQuestion();
        }, 4000);
    }
}

// Show button to start the game
var preStart = function() {
    $("button").text("Click Here to Start!");
    $("ul").hide();
    $("#question").hide();
    $(".answers").hide();
    $("#countdown").hide();
}

// Start a new game
var startGame = function() {
    wins = 0;
    losses = 0;
    timedOut = 0;
    timeLeft = 30;
    loadQuestions();
    pickQuestion();
    $("ul").hide();
    $("button").hide();
    $("#question").show();
    $(".answers").show();
    $("#countdown").show();
    countDown = setInterval(function() { everySecond(); }, 1000);
    $("#countdown").text("Time Left: " + timeLeft);
    populatePage();
}

// End the game
var endGame = function() {
    $("#question").hide();
    $(".answers").hide();
    $("#countdown").hide();
    $("#result").text("");
    $("ul").show();
    $("#wins").text("Correct Answers: " + wins);
    $("#losses").text("Wrong Answers: " + losses);
    $("#timeout").text("Unanswered Questions: " + timedOut);
    $("button").show();
    $("button").text("Click Here to Play Again!");
}

// MAIN PROCESS
// ==================================================

// Start a new game whenever the button is clicked
$("button").on("click", function() {
    startGame();
});

// Define behavior when the possible answers are clicked
$(".answers").on("click", function() {
    if ($(this).text() === pickedQuestion[0].correctAnswer) {
        winningSound.play();
        wins++;
        clearInterval(countDown);
        $("#result").text("That's right!! The correct answer is: " + pickedQuestion[0].correctAnswer);
        setTimeout(function() {
            nextQuestion();
        }, 4000);
    }
    else {
        losingSound.play();
        losses++;
        clearInterval(countDown);
        $("#result").text("Wrong! The correct answer was: " + pickedQuestion[0].correctAnswer);
        setTimeout(function() {
            nextQuestion();
        }, 4000);
    }
});

// Show button to start the game
preStart();

});