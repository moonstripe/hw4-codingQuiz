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
let finScore = 0;
let quizEnd = false;


$quizTimer.css("display", "none");
$highScores.css("display", "none");
$retake.css("display", "none");

$nameUploader.css("display", "none");


var question1 = {
    q: "How do you initialize a variable that won't change throughout your Javascript code.",
    a: ["var vName = ___;", "let vName = ___;", "set vName = ___;", "const vName = ___;"],
    i: 4,
};

var question2 = {
    q: "What will the console read once the following code runs? var math = 7 + '2'; console.log(math)",
    a: ["Uncaught Type Error: math is not a number", "72", "9", "Uncaught Type Error: math is 72"],
    i: 2,
};

var question3 = {
    q: "Which gets hoisted first?",
    a: ["Variable definitions", "Function definitions", "Variable declarations", "Function declarations"],
    i: 1,
};

var question4 = {
    q: "What can a for loop do that a foreach map cannot?",
    a: ["Occupy more lines of code", "Loop through an array and change the elements directly.", "Cycle through another array as the index increases.", "They are functionally the same."],
    i: 3,
};

var questionsarr = [question1, question2, question3, question4];

var secondsLeft = 5;
var secondsLeftQuiz = 15;



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
    secondsLeftQuiz = 15;
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
    $nameSubmit.css('display', 'none');
    $nameInput.css('display', 'none');
    console.log(playerList);


    let newRow = $("<tr>");
    let newName = $("<td>");
    let newScore = $("<td>");

    newName.text(playerList[playerList.length - 1].name);
    newScore.text(playerList[playerList.length - 1].score);

    newRow.append(newName);
    newRow.append(newScore);



    $highScores.append(newRow);

    $highScores.css('display', 'inline');
}
