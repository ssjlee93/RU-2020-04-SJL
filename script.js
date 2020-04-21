var questions = [
    {
        question: "The purpose of a variable is to: ",
        choices: ["Display a web page", "Store a value", "Determine if a value is a number or a piece of text", "Keep your data private"],
        answer: "Store a value"
    },
    {
        question: "When we use a value without assigning it to a variable, that’s known as: ",
        choices: ["Storing", "Digitation", "Hardcoding", "Phishing"],
        answer: "Hardcoding"
    },
    {
        question: "Data types are important because: ",
        choices: ["They are a recent development in programming", "They identify different information used in programs", "They increase the number of lines in a program", "None of the above"],
        answer: "They identify different information used in programs"
    },
    {
        question: "What What data type is used in this code block?      isTouching = true;",
        choices: ["number", "boolean", "string", "alphabet"],
        answer: "boolean"
    },
    {
        question: "Strings are called strings because: ",
        choices: ["Strings represent different musical intervals, like the strings on a violin", "Strings form the parameters of our program, like string wrapped around a package", "Strings connect two pieces of code, like sheets of cloth sewn together with string", "Strings are a sequence of symbols, so we can think of each character being strung together, like beads in a necklace"],
        answer: "Strings are a sequence of symbols, so we can think of each character being strung together, like beads in a necklace"
    },
    {
        question: "Primitive data types include: ",
        choices: ["variables, arrays, lists","strings, numbers, booleans","numbers, booleans, variables","strings, dictionaries, integers"],
        answer: "strings, numbers, booleans"
    }
];

var qIndex = 0;
var score = 0;
var time = 0;
var intervalId; 
var choicesBtn;


function start() {
    time = 120;
    score = 0;
    $("#score").text("Score: " + score);
    $("#start").removeClass("show");
    $("#allChoices").addClass("show");

    showQuestion(); 

    return;

};

function showQuestion() {
    $(".choices").text("");
    $("#result").text("");

    intervalId = setInterval(function() {
        time--;
        $("#timer").text("Time: "+ time + " seconds left");
        if (time <= 0) {
            end();
        }
        return;
    },1000);

    $("#question").text(questions[qIndex].question);

    var choices = questions[qIndex].choices;

    for (var i = 0; i < choices.length; i++) {
        var cIndex = $(".choices").get([i]);
        cIndex.prepend(choices[i]);
    }

}

function nextQuestion() {
    qIndex++; 
    if (qIndex === questions.length) {
        end();
    }
    showQuestion();
}

function checkAnswer(event) {
    clearInterval(intervalId); 
   
    // if ($(this).className === ".choices") {
    //     var myAnswer = $(this).text();
    // }
    
    if (event.target.matches("button")) {
        var myAnswer = event.target.textContent.toString();
        if (myAnswer === questions[qIndex].answer) {
            $("#result").text("Correct");
            score++;
            $("#score").text("Score: " + score);
        } else {
            $("#result").text("Incorrect");
            score--; 
            $("#score").text("Score: " + score);
        }
    }
    setTimeout(nextQuestion,2000);

}

function end() {
    clearInterval(intervalId);
    $("body").innerHTML("Game over, You scored " + score);
    setTimeout(showHighScore,2);
}

function showHighScore() {
    var name = prompt("Please enter your name");
    var highScore = localStorage.getItem("score")
}
 $("#start").on("click",start);
 $(".choices").on("click",checkAnswer);
