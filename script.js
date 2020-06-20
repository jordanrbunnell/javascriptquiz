// template by webdevtrick (https://webdevtrick.com)
var dataStored = JSON.parse(localStorage.getItem("score"));
var timerInterval;
var timerDisplay = document.getElementById("timer");
var quizRunTime = 30;
var r;
quizTimer(quizRunTime);

function quizTimer(r) {
  
     timerInterval = setInterval(function() {
      r--;
      timerDisplay.textContent = r;
     
      if (r === 0) {
        showScores();
      };
    }, 1000);
  };
  
function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}
 
Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}
 
Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
        this.questionIndex++;
    }
    else {
        (r -= 20);
        this.questionIndex++;
    }
 
    
}
 
Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}
 
 // Utilized the shuffle function from the underscore.js library to shuffle the choices array
function Question(text, choices, answer) {
    this.text = text;
    this.choices = _.shuffle(choices);
    this.answer = answer;
}
 
Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}
 
 
function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;
 
        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
 
        showProgress();
    }
};
 
function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};
 
 
function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};
 
function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    gameOverHTML += "<h4>To add you score to the leaderboard, please enter your initials:</h4>" + "<div class='form-inline'>";
    gameOverHTML +=  " <label for='playerInitials' class='ml-2'>Initials: </label>";
    gameOverHTML +=  " <input type='text' class='form-control ml-2' id='playerInitials' placeholder='ABC' maxlength='3'>";
    gameOverHTML += " <button type='button' class='btn btn-outline-primary ml-2' id='submitInitials'>Submit</button> <span id='saved' class='ml-2 text-success d-none'>Score added!</span></div>";
    gameOverHTML += "<table class='table table-striped mt-4'><thead><tr><th scope='col'>INITIALS</th><th scope='col'>SCORE</th></tr></thead><tbody><tr><td id='storedInitials'>" + dataStored[0].playerInitials + "</td><td id='storedScore'>" + dataStored[0].finalScore + "</td></tr></tbody>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
    leaderBoard();
   

};
 
// create questions here
// questions sourced from https://quizlet.com/314467748/w3schools-javascript-quiz-flash-cards/
// JavaScript Object Constructors

var questions = [
    new Question("Inside which HTML element do we put the JavaScript?", ["&ltSCRIPT&gt", "&ltHEAD&gt","&ltDIV&gt", "&ltFOOTER&gt"], "&ltSCRIPT&gt"),
    new Question("What is the correct syntax for referring to an external script called 'xxx.js'?", ["&ltscript name='xxx.js'&gt", "&ltscript src='xxx.js'&gt", "&lta href ='xxx.js'&gt", "&ltscript href='xxx.js'&gt"], "&ltscript src='xxx.js'&gt"),
    new Question("The external JavaScript file must contain the &ltscript&gt tag", ["True", "False","",""], "False"),
    new Question("How do you write 'Hello World' in an alert box?", ["prompt('Hello World');", "display('Hello World');", "alert('Hello World');", "print('Hello World');"], "alert('Hello World');"),
    new Question("How do you create a function in JavaScript?", ["function = myfunction()", "function myFunction()", "var = myfunction", "if myfunction()"], "function myFunction()"),
    new Question("How to write an IF statement in JavaScript?", ["if x then y", "if 'x' then 'y'","if (x === y)", "if x === y then"], "if (x === y)"),
    // new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery","Django", "NodeJS"], "Django"),
    // new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery","Django", "NodeJS"], "Django"),
    // new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery","Django", "NodeJS"], "Django"),
    // new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery","Django", "NodeJS"], "Django"),
    // new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery","Django", "NodeJS"], "Django"),
    // new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery","Django", "NodeJS"], "Django"),
    // new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery","Django", "NodeJS"], "Django"),
    // new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery","Django", "NodeJS"], "Django"),
    // new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery","Django", "NodeJS"], "Django"),
    // new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery","Django", "NodeJS"], "Django"),
    // new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery","Django", "NodeJS"], "Django"),
    // new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery","Django", "NodeJS"], "Django"),
    // new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery","Django", "NodeJS"], "Django")

];

//Random Question Generator, can't have the same order all the time! Credit to the Underscore.js
var ranQuestion = _.shuffle(questions)[0];
console.log(ranQuestion)
// console.log(quiz.getQuestionIndex().choices)
// console.log(answer)
 
// create quiz
var quiz = new Quiz(questions);
 
// display quiz
populate();

//Leaderboard will show previous score. 
function leaderBoard() {
    
    var storeBtn = document.getElementById("submitInitials");

    storeBtn.addEventListener("click", function() {

        var saved = document.getElementById("saved");
        var playerInitials = document.getElementById("playerInitials").value.toUpperCase();
        var totalPoints = quiz.score;
        var storedInitials = document.getElementById("storedInitials");
        var storedScore = document.getElementById("storedScore");

        var highScores = [
            {
              playerInitials: playerInitials,
              finalScore: totalPoints
            }
        ];

        storedInitials.innerText = highScores[0].playerInitials;
        storedScore.innerText = highScores[0].finalScore;

        localStorage.setItem("score", JSON.stringify(highScores));

    });

    
    console.log(dataStored[0].playerInitials);
    console.log(dataStored[0].finalScore);
};
