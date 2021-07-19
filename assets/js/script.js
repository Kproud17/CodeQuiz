
var background = document.querySelector("body");
var startBtn = document.querySelector("#start-btn");
var quizEl = document.querySelector(".quiz-container");
var endEl = document.querySelector(".end");
var scoreEl = document.querySelector(".score");
var questionCounter = 0;
var currentScore = 75;
var highScores = [];

var codeQuiz = [
    {
        question: "Who invented JavaScript?", 
        a: "Douglas Crockford",
        b: "Sheryl Sandberg",
        c: "Brendan Eich",
        d: "I don't know",
        answer: "c"
    }, 
    {
        question: "Which one of these is a JavaScript package manager?",
        a: "node.js",
        b: "TypeScript",
        c: "npm",
        d: "I don't know",
        answer: "c"
    },
    {
        question: "Which tool can you use to ensure code quality",
        a: "Angular",
        b: "jQuery",
        c: "RequireJS",
        d: "ESLint",
        answer: "d"
    },
    {
        question: "Which of the following function of Number object returns the number's value",
        a: "toString()",
        b: "valueOf()",
        c: "toLocaleString()",
        d: "toPrecision()",
        answer: "b"
    },
    {
        question: "Which of the following function of String object extracts a section of a string and returns a new string",
        a: "slice()",
        b: "split()",
        c: "replace()",
        d: "search()",
        answer: "a"

    },
    {
        question: "Which of the following function of String object creates an HTML hypertext link that requests another URL",
        a: "link()",
        b: "sub()",
        c: "sup()",
        d: "small()",
        answer: "a"
    }

]







var tracker = function() {
    scoreEl.textContent = "Time Remaining: 75"

    var scoreTracker = setInterval(function() {
        if (currentScore > 0 && questionCounter < codeQuiz.length) {
            scoreEl.textContent = "Time Remaining: " + currentScore;
            currentScore--
        }
        else {
            clearInterval(scoreTracker);
            endQuiz();
        }
    }, 1000);
}

var executeQuiz = function() {
    document.querySelector("#instructions").remove();
    quizEl.classList.remove("hide")

    nextQuestion(questionCounter);
    tracker();
}

// iterates through questions and answers
var nextQuestion = function(index) {
    var questionHeader = document.querySelector(".question-header");
    var questionEl = document.querySelector(".question");
    var btnA = document.getElementById("btn-a");
    var btnB = document.getElementById("btn-b");
    var btnC = document.getElementById("btn-c");
    var btnD = document.getElementById("btn-d");

    questionHeader.textContent = "Question #" + parseInt(index + 1)
    questionEl.textContent = codeQuiz[index].question;
    btnA.textContent = codeQuiz[index].a;
    btnB.textContent = codeQuiz[index].b;
    btnC.textContent = codeQuiz[index].c;
    btnD.textContent = codeQuiz[index].d;

    btnA.addEventListener("click", checkAnswer);
    btnB.addEventListener("click", checkAnswer);
    btnC.addEventListener("click", checkAnswer);
    btnD.addEventListener("click", checkAnswer);
}

var checkAnswer = function(event) {
    var clickedBtn = event.target.getAttribute("value");
    var feedbackEl = document.querySelector(".feedback");
    feedbackEl.classList.remove("hide");
    
 
    if (clickedBtn === codeQuiz[questionCounter].answer) {
        background.className = "correct";
        feedbackEl.textContent = console.log("Correct Answer");
    }
    else {
        if (currentScore >= 5) {
            currentScore -= 5;
            scoreEl.textContent = "Time Remaining: " + currentScore;
            }
        background.className = "incorrect";
        feedbackEl.classList.remove("hide");
        feedbackEl.textContent = console.log("Choice " + clickedBtn + " was Incorrect!");
    }

    questionCounter++

    if (questionCounter < codeQuiz.length) {        
        nextQuestion(questionCounter);
    }
    else {
        endQuiz();
    }
}

var endQuiz = function() {
    quizEl.remove();
    scoreEl.remove();
 
    endEl.innerHTML = "<h2>Quiz Completed!</h2><p>Your final score is " + currentScore + ". Type your name in the box below to record your score!</p>";

    var scoreForm = document.createElement("form");
    scoreForm.id = "score-form";
    endEl.appendChild(scoreForm);

    var nameInput = document.createElement("input");
    nameInput.className = "name-input";
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("name", "player-name");
    nameInput.setAttribute("placeholder", "ENTER YOUR NAME");
    scoreForm.appendChild(nameInput);

    var nameBtn = document.createElement("button");
    nameBtn.className = "btn";
    nameBtn.id = "name-btn"
    nameBtn.textContent = "SUBMIT";
    scoreForm.appendChild(nameBtn);

    nameBtn.addEventListener("click", saveScore);
}

var saveScore = function() {
    event.preventDefault()

    var playerName = document.querySelector("input[name='player-name']").value;

    if (!playerName) {
        alert("Please enter your name!")
    }
    else {
        var scoreObj = {
            name: playerName,
            score: currentScore
        }
    
        highScores.push(scoreObj);
        document.querySelector("#score-form").reset();
        localStorage.setItem("scores", JSON.stringify(highScores));
        document.location.href = "highscore.html";
    }
}

var loadScores = function() { 
    highScores = localStorage.getItem("scores");

    if (!highScores) {
        highScores = [];
        return false;
    }

    highScores = JSON.parse(highScores);
}



loadScores();

startBtn.addEventListener("click", executeQuiz)