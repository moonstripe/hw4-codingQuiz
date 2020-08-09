const $startTimerBtn = $("#startbtn");
const $cQC = $('.coding-quiz-container');
const $init = $('.init')
const $quizBox = $(".quiz-box");
const $answersbuttons = $("#answers").children();
const $answersbuttonsID = $("#answers");
const $optionA = $("#option-A");
const $optionB = $("#option-B");
const $optionC = $("#option-C");
const $optionD = $("#option-D");
const $quizTimer = $('#quiz-timer');
const $resultText = $('#result-text');
const $nameUploader = $('.name-upload');
const $nameSubmit = $('#name-submit');
const $nameInput = $('#name-input');
const $highScores = $('#hs-table');
const $retake = $('.retry');
const $retakeBtn = $('#retake');

class Player {
    constructor(name, score) {
        this.name = name;
        this.score = score;
    }

}



let choice = 0;
let qIndex = 0;
let right = 0;
let wrong = 0;

let playerList = [];

if (localStorage.getItem('playerList')) {
    playerList = JSON.parse(localStorage.getItem('playerList'));
}


let finScore = 0;
let quizEnd = false;


$quizTimer.css("display", "none");
$highScores.css("display", "none");
$retake.css("display", "none");

$nameUploader.css("display", "none");

var question1 = {
    q: "What symbols surround a string?",
    a: ["Apostrophes", "Parentheses", "Curly Braces", "Dollar signs"],
    i: 1,
};

var question2 = {
    q: "What is a boolean?",
    a: ["A value that is mathematical", "A true or false value", "What spooky rappers drink", "a set of data ordered in a list"],
    i: 2,
};

var question3 = {
    q: "What of the following languages are typically considered part of 'Front-End' Development?",
    a: ["Express.js", "Node.js", "HTML/CSS", "Java"],
    i: 3,
};

var question4 = {
    q: "Why would you declare a variable with const instead of let?",
    a: ["If you didn't want the value to change", "Because const initializes functions", "If you wanted to initialize a number", "Because const is es6 and let isn't"],
    i: 1,
};

var question5 = {
    q: "Who is the driver to the navigator?",
    a: ["The driver compiles the code written by the navigator", "The driver writes code while the navigator helps check for errors and brainstorm solutions", "The driver writes code for the navigator to debug later", "Mortal enemies."],
    i: 2,
};

var question6 = {
    q: "What does 'index' in the following line of code mean? \n for (let index = 0; index < array.length; index++)",
    a: ["An integer that increases in value every time the subsequent code is run", "The location of local data", "The numerical position of an item in 'array'", "First and Third are true."],
    i: 4,
};

var question7 = {
    q: "How do you initialize a variable that won't change throughout your Javascript code.",
    a: ["var vName = ___;", "let vName = ___;", "set vName = ___;", "const vName = ___;"],
    i: 4,
};

var question8 = {
    q: "What will the console read once the following code runs? var math = 7 + '2'; console.log(math)",
    a: ["Uncaught Type Error: math is not a number", "72", "9", "Uncaught Type Error: math is 72"],
    i: 2,
};

var question9 = {
    q: "Which gets hoisted first?",
    a: ["Variable definitions", "Function definitions", "Variable declarations", "Function declarations"],
    i: 1,
};

var question10 = {
    q: "What can a for loop do that a foreach map cannot?",
    a: ["Occupy more lines of code", "Loop through an array and change the elements directly.", "Cycle through another array as the index increases.", "They are functionally the same."],
    i: 3,
};

var questionsarr = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10];

var secondsLeft = 5;
var secondsLeftQuiz = 30;



$startTimerBtn.on("click", setTime);

// click button (event delegation)
$answersbuttonsID.on("click", function (event) {
    if (event.target.matches("button")) {
        choice = parseInt(event.target.parentElement.id);

        if (qIndex === questionsarr.length - 1) {

            if (choice === questionsarr[qIndex].i) {
                qIndex++;
                right++;
                quizEnd = true;
                endQuiz();

            } else {
                wrong++;
                $resultText.text('Try Again');
                secondsLeftQuiz = secondsLeftQuiz - 10;
            }
            // other questions
        } else {

            if (choice === questionsarr[qIndex].i) {
                qIndex++;
                right++;
                secondsLeftQuiz = secondsLeftQuiz + 10;
                showQuestion(questionsarr[qIndex]);
                $resultText.text('Correct');

            } else {
                wrong++;
                $resultText.text('Try Again');
                secondsLeftQuiz = secondsLeftQuiz - 10;
            }

        }
    }



})


$nameSubmit.on("click", function () {
    if ($nameInput.val()) {
        let logInstance = new Player($nameInput.val(), finScore);
        
        playerList.push(logInstance);
        

        localStorage.setItem('playerList', JSON.stringify(playerList));

        popHighScores();
        $retakeBtn.text("Retake the Quiz");
        $retake.css("display", "inline");
    }

});


// restart quiz
$retake.on("click", startQuiz);



function setTime() {

    var timerInterval = setInterval(function () {
        secondsLeft--;
        $startTimerBtn.text(`Quiz starts in ${secondsLeft}`);

        if (secondsLeft === 0) {
            clearInterval(timerInterval);

            $init.css('display', 'none');

            startQuiz(questionsarr);
        }

    }, 1000);
}

// Turns on the timer, unhides the quizbox

function startQuiz() {
    $resultText.empty();
    choice = 0;
    qIndex = 0;
    right = 0;
    wrong = 0;
    finScore = 0;
    quizEnd = false;
    $highScores.css("display", "none");
    $retake.css("display", "none");

    $nameUploader.css("display", "none");
    secondsLeftQuiz = 30;
    $quizTimer.text(`Time left: ${secondsLeftQuiz}`);
    $quizTimer.css("display", "inline");
    showQuestion(questionsarr[0]);

    var timerInterval = setInterval(function () {
        if (quizEnd === true) {
            clearInterval(timerInterval);
            endQuiz();
        }

        secondsLeftQuiz--;
        $quizTimer.text(`Time left: ${secondsLeftQuiz}`);


        if (secondsLeftQuiz < 0 || secondsLeftQuiz === 0) {
            clearInterval(timerInterval);

            $quizTimer.css("display", "none");
            $quizBox.css('display', 'none');
            $highScores.css("display", "none");
            $retake.css("display", "none");
            $resultText.empty();
            endQuiz();
        }
    }, 1000);
}


// Endquiz
function endQuiz() {
    quizEnd === true;

    if (secondsLeftQuiz < 0) {
        finScore = 0;
    } else {
        finScore = secondsLeftQuiz;
    }
    $quizTimer.css('display', 'none');
    $resultText.text(`You scored a ${finScore}.`);
    $quizBox.css('display', 'none');
    $nameUploader.css('display', 'inline');
}

//Pull from question object
function showQuestion(question) {



    $quizBox[0].textContent = question.q;

    $answersbuttons.children().each(function (index) {

        $answersbuttons.children()[index].textContent = question.a[index];

    });


    $quizBox.css('display', 'inline');


}

function popHighScores() {
    $highScores.empty();
    playerList = JSON.parse(localStorage.getItem('playerList'));
    $nameSubmit.css('display', 'none');
    $nameInput.css('display', 'none');
    console.log(playerList);


    for (let index = 0; index < playerList.length; index++) {
        
        let newRow = $("<tr>");
        let newName = $("<td>");
        let newScore = $("<td>");

        newName.text(playerList[index].name);
        newScore.text(playerList[index].score);

        newRow.append(newName);
        newRow.append(newScore);



    $highScores.append(newRow);

    }

    $highScores.css('display', 'inline');
}
