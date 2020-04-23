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
        question: "What data type is used in this code block?      isTouching = true;",
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
    time = 10;
    score = 0;
    qIndex = 0;
    $("#score").text("Score: " + score);
    $("#start").removeClass("show");
    $("#allChoices").addClass("show");

    showQuestion(); 

    return;

};

function showQuestion() {

    $(".choices").text("");
    $("#result").text("");
    $(".choices").prop("disabled",false);

    intervalId = setInterval(updateTime
    ,1000);

    $("#question").text(questions[qIndex].question);

    var choices = questions[qIndex].choices;

    for (var i = 0; i < choices.length; i++) {
        var cIndex = $(".choices").get([i]);
        cIndex.prepend(choices[i]);
    }

}

function updateTime() {
    time--;
    $("#timer").text("Time: "+ time + " seconds left");
    if (time <= 0) {
        end();
    }
    return;
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
    $(".choices").prop("disabled",true);
   
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
    $(".timer").text("Game over, You scored " + score + "");
    setTimeout(showHighScore,2000);
    $("#question").text("");
    $("#start").addClass("show");
    $("#allChoices").removeClass("show");
    return;
}

function showHighScore() {
    var name = prompt("Please enter your name");
    var high_scores = localStorage.getItem("scores");

  if (!high_scores) {
    high_scores = [];
  } else {
    high_scores = JSON.parse(high_scores);
  }

  high_scores.push({ name: name, count: score });

  localStorage.setItem("scores", JSON.stringify(high_scores));

  high_scores.sort(function (a, b) {
    return b.count - a.count;
  });

  var contentUL = $("<ul>");
  for (var i = 0; i < high_scores.length; i++) {
      var contentLI = $("<li>").text("Name: " + high_scores[i].name + " Scores: " + high_scores[i].count);
      contentUL.append(contentLI);
  }
  $("#scores").append(contentUL);

  return;
}

 $("#start").on("click",start);
 $(".choices").on("click",checkAnswer);
