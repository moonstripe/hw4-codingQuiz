const $startTimerBtn = document.querySelector("#startbtn");
const $cQC = document.querySelector('.coding-quiz-container');
const $init = document.querySelectorAll('.init')
const $quizBox = document.querySelectorAll(".quiz-box");
const $answersbuttons = document.querySelector("#answers").children;
const $optionA = document.querySelector("#option-A");
const $optionB = document.querySelector("#option-B");
const $optionC = document.querySelector("#option-C");
const $optionD = document.querySelector("#option-D");
const $quizTimer = document.querySelector('#quiz-timer');
const $resultText = document.querySelector('#result-text');
const $nameUploader = document.querySelectorAll('.name-upload');
const $nameSubmit = document.querySelector('#name-submit');
const $nameInput = document.querySelector('#name-input');
const $highScores = document.querySelector('#hs-table');

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

$highScores.style.display = "none";

$nameUploader.forEach(element => {
    element.style.display = "none";

});

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
var secondsLeftQuiz = 60;



$startTimerBtn.addEventListener("click", setTime);

$optionA.addEventListener("click", function () {
    choice = 1;

    if (qIndex === questionsarr.length - 1) {

        if (choice === questionsarr[qIndex].i) {
            qIndex++;
            right++;
            endQuiz();

        } else {
            wrong++;
            secondsLeftQuiz = secondsLeftQuiz = 10;
            endQuiz();
        }

    } else {

        if (choice === questionsarr[qIndex].i) {
            qIndex++;
            right++;
            secondsLeftQuiz = secondsLeftQuiz + 10;
            showQuestion(questionsarr[qIndex]);
            $resultText.textContent = 'Correct';

        } else {
            wrong++;
            $resultText.textContent = 'Incorrect';
            secondsLeftQuiz = secondsLeftQuiz - 10;
        }

    }

});
$optionB.addEventListener("click", function () {
    choice = 2;
    if (qIndex === questionsarr.length - 1) {

        if (choice === questionsarr[qIndex].i) {
            qIndex++;
            right++;
            endQuiz();

        } else {
            wrong++;
            secondsLeftQuiz = secondsLeftQuiz = 10;
            endQuiz();
        }

    } else {

        if (choice === questionsarr[qIndex].i) {
            qIndex++;
            right++;
            secondsLeftQuiz = secondsLeftQuiz + 10;
            showQuestion(questionsarr[qIndex]);
            $resultText.textContent = 'Correct';

        } else {
            wrong++;
            $resultText.textContent = 'Incorrect';
            secondsLeftQuiz = secondsLeftQuiz - 10;
        }

    }

});
$optionC.addEventListener("click", function () {
    choice = 3;
    if (qIndex === questionsarr.length - 1) {

        if (choice === questionsarr[qIndex].i) {
            qIndex++;
            right++;
            endQuiz();

        } else {
            wrong++;
            secondsLeftQuiz = secondsLeftQuiz = 10;
            endQuiz();
        }

    } else {

        if (choice === questionsarr[qIndex].i) {
            qIndex++;
            right++;
            secondsLeftQuiz = secondsLeftQuiz + 10;
            showQuestion(questionsarr[qIndex]);
            $resultText.textContent = 'Correct';

        } else {
            wrong++;
            $resultText.textContent = 'Incorrect';
            secondsLeftQuiz = secondsLeftQuiz - 10;
        }

    }

});
$optionD.addEventListener("click", function () {
    choice = 4;
    if (qIndex === questionsarr.length - 1) {

        if (choice === questionsarr[qIndex].i) {
            qIndex++;
            right++;
            endQuiz();

        } else {
            wrong++;
            secondsLeftQuiz = secondsLeftQuiz = 10;
            endQuiz();
        }

    } else {

        if (choice === questionsarr[qIndex].i) {
            qIndex++;
            right++;
            secondsLeftQuiz = secondsLeftQuiz + 10;
            showQuestion(questionsarr[qIndex]);
            $resultText.textContent = 'Correct';

        } else {
            wrong++;
            $resultText.textContent = 'Incorrect';
            secondsLeftQuiz = secondsLeftQuiz - 10;
        }

    }

});

$nameSubmit.addEventListener("click", function () {

    let logInstance = new Player($nameInput.value, finScore);
    playerList.push(logInstance);
    popHighScores();
});



function setTime() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        $startTimerBtn.textContent = `Quiz starts in ${secondsLeft}`;

        if (secondsLeft === 0) {
            clearInterval(timerInterval);

            $init.forEach(node => {
                $cQC.removeChild(node);
            });

            startQuiz(questionsarr);
        }

    }, 1000);
}

// Turns on the timer, unhides the quizbox

function startQuiz(questionsarr) {
    showQuestion(questionsarr[0]);
    var timerInterval = setInterval(function () {
        secondsLeftQuiz--;
        $quizTimer.textContent = `Time left: ${secondsLeftQuiz}`;

        if (secondsLeftQuiz === 0) {
            finScore = 0;
            clearInterval(timerInterval);
            $quizTimer.style.display = "none";
            $resultText.textContent = `Too bad.`;
            $quizBox.forEach(element => {
                element.style.display = "none";
            });
        }
    }, 1000);
}


    // Endquiz
    function endQuiz() {

        finScore = secondsLeftQuiz;
        $quizTimer.style.display = "none";
        $resultText.textContent = `You had ${finScore} seconds left.`;
        $quizBox.forEach(element => {
            element.style.display = "none";

        });
        $nameUploader.forEach(element => {
            element.style.display = "inline";
        });
    }

    //Pull from question object
    function showQuestion(question) {



        $quizBox[0].textContent = question.q;

        for (let i = 0; i < $answersbuttons.length; i++) {
            $answersbuttons[i].children[0].innerHTML = question.a[i];
        }

        $quizBox.forEach(element => {
            element.style.display = "inline";
        });

    }

    function popHighScores() {
        $nameSubmit.style.display = "none";
        $nameInput.style.display = "none";
        console.log(playerList);

        for (let index = 0; index < playerList.length; index++) {

            let newRow = document.createElement("TR");
            let newName = document.createElement("TD");
            let newScore = document.createElement("TD");

            let textName = document.createTextNode(playerList[index].name);
            let textScore = document.createTextNode(playerList[index].score);

            newName.appendChild(textName);
            newScore.appendChild(textScore);

            newRow.appendChild(newName);
            newRow.appendChild(newScore);



            $highScores.appendChild(newRow);
            console.log(newRow);

        }
        console.log($highScores.style.display)
        $highScores.style.display = "block";
    }
