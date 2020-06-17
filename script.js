// template by webdevtrick (https://webdevtrick.com)
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
    }
 
    this.questionIndex++;
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
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
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