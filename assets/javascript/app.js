var questionArray = [{
        question: "What was Disney's first full length animated film?",
        answers: ["Steamboat Willie",
            "Cinderella",
            "Snow White and the Seven Dwarfs",
            "Fantasia"
        ],
        correctIndex: 2,
        explanation:"Before Snow White and the Seven Dwarfs, the Disney studio had been primarily involved in the production of animated short subjects in the Mickey Mouse and Silly Symphonies series.",
        rightGif: "assets/images/snow-white.gif"
    }, {
        question: "What year did Disneyland open?",
        answers: ["1972",
            "1938",
            "1945",
            "1955"
        ],
        correctIndex: 3,
        explanation:"\"To all who come to this happy place: Welcome. Disneyland is your land. Here age relives fond memories of the past, and here youth may savor the challenge and promise of the future.\" - Walter E. Disney, July 17, 1955",
        rightGif: "assets/images/disneyland.gif"
    }, {
        question: "Which is not owned by Disney?",
        answers: ["Star Wars",
            "Studio Ghibli",
            "The Muppets",
            "ESPN"
        ],
        correctIndex: 1,
        explanation:"Disney has been a distributor for Studio Ghibli since the 1980s, but they do not own them.",
        rightGif: "assets/images/studio-ghibli.gif"
    }, {
        question: "Which animated film first used the xerography technique to keep production cost down?",
        answers: [
            "101 Dalmatians",
            "Sleeping Beauty",
            "Robin Hood",
            "The Sword and the Stone"
        ],
        correctIndex: 0,
        explanation:"Walt Disney considered shutting down the animation division before testing out the new way to photocopy cells on 101 Dalmatians.",
        rightGif: "assets/images/101-dalmatians.gif"
    }, {
        question: "Which movie did not win the Oscar for Best Animated Feature?",
        answers: ["Big Hero 6",
            "Finding Nemo",
            "Toy Story 3",
            "Monsters, Inc."
        ],
        correctIndex: 3,
        explanation:"Monsters, Inc. won the Academy Award for Original Song, but Shrek won for Animated Feature.",
        rightGif: "assets/images/monsters-inc.gif"
    }, {
        question: "Which movie did not receive the Academy Award nomination for Best Picture",
        answers: ["Toy Story 3",
            "Beauty and the Beast",
            "The Lion King",
            "Up"
        ],
        correctIndex: 2,
        explanation:"The Lion King was nominated four times and won two Oscars, but it was for Original Song and Original Score.",
        rightGif: "assets/images/the-lion-king.gif"
    }, {
        question: "Who helped write the music for Tarzan (1999)?",
        answers: ["Elton John",
            "Phil Collins",
            "Randy Newman",
            "Tim Rice"
        ],
        correctIndex: 1,
        explanation:"All four have helped write music for Disney animated films, but Phil Collins wrote songs for Tarzan.",
        rightGif: "assets/images/tarzan.gif"
    }, {
        question: "What was Disney's first full live action feature?",
        answers: ["Treasure Island",
            "Old Yeller",
            "20,000 Leagues Under the Sea",
            "Marry Poppins"
        ],
        correctIndex: 0,
        explanation:"Treasure Island was the first full live action feature film",
        rightGif: "assets/images/treasure-island.gif"
    }, {
        question: "What year did Walt Disney World open?",
        answers: ["1969",

            "1971",
            "1973",
            "1954",
        ],
        correctIndex: 1,
        explanation:"Disney World opened up in 1971 in Orlando, Florida.",
        rightGif: "assets/images/disney-world.gif"
    }, {
        question: "Which actor was Aladdin's face modeled after?",
        answers: [
            "Matthew Broderick",
            "Kurt Russell",
            "Tom Cruise",
            "Scott Weigner"
        ],
        correctIndex: 2,
        explanation:"Although Scott Weigner is the voice for Aladdin, his face was actually modeled after Tom Cruise.",
        rightGif: "assets/images/aladdin.gif"
    },

];

var trashArray = [];


var timer = 30;
var questionIndex = 0;
var numberCorrect = 0;
var numberWrong = 0;
var rightChoice = false;
var timerSet = false;


function setTimer() {
    $("#timer").html("<h2>Seconds Remaining: </h2>");

    $("#secondsRemaining").html("<h2>" + timer + " </h2>");

    if (!timerSet) {
        setInterval(function() {


            timer--;


            if (timer > 0) {

                $("#secondsRemaining").html("<h2>" + timer + "</h2>");
            } else if (timer === 0) {
                endGame();
            }


        }, 1000);

        timerSet = true;
    }
}

function guessCheck(guess) {

    timer = "";
    console.log(questionArray[questionIndex].correctIndex);
    // console.log($(this).attr("value"));
    console.log(guess);
    if (parseInt(guess) === questionArray[questionIndex].correctIndex) {
        console.log("correct");
        rightChoice = true;
        endGame();
    } else {
        rightChoice = false;
        console.log("wrong");
        endGame();
    }
}

function pickQuestion() {

    questionIndex = Math.floor(Math.random() * questionArray.length);

    $("#questionDisplay").html("<h2>" + questionArray[questionIndex].question + "</h2>");

    //Loops the answers into the html, giving it a value of that loop to check against the correctIndex
    for (var i = 0; i < questionArray[questionIndex].answers.length; i++) {
        var answerDisplay = $("<div>");
        answerDisplay.addClass("answer");
        answerDisplay.addClass("col-12 col-md-6")
        answerDisplay.attr("value", i);
        answerDisplay.html("<h2>" + questionArray[questionIndex].answers[i] + "</h2>")
        $("#answers").append(answerDisplay);
    }


    //On click for the answer class
    $(".answer").click(function(event) {
        //when something with an answer class is clicked it puts its value into the guessCheck function
        guessCheck($(this).attr("value"));

    });
}

function newGame() {
    if (questionArray.length === 0) {

        $("#timer").html("");
        $("#secondsRemaining").html("");
        $("#questionDisplay").html("<h2>Game Over</h2>");
        var correctDisplay = $("<div>");
        correctDisplay.attr("class", "col-12 text-center");
        correctDisplay.html("<h2>Correct: " + numberCorrect + "</h2>");
        var wrongDisplay = $("<div>");
        wrongDisplay.attr("class", "col-12 text-center");
        wrongDisplay.html("<h2>Wrong: " + numberWrong + "</h2>");


        $("#answers").append(correctDisplay);
        $("#answers").append(wrongDisplay);

        for (var i = 0; i < 10; i++) {
            questionArray.push(trashArray[0]);
            trashArray.splice(0, 1);
        }

        numberCorrect = 0;
        numberWrong = 0;

        setTimeout(function() {
                $("#answers").html("");
                newGame();
            },

            10000);

        console.log(trashArray);

    } else {
        timer = 30;
        setTimer();
        pickQuestion();

    }


}

function endGame() {

    if (rightChoice) {
        numberCorrect++;

        $("#timer").html("");
        $("#secondsRemaining").html("");
        $("#questionDisplay").html("<h2>Correct!</h2>");
        $("#answers").html("");
        var explanationCol = $("<div>");
        explanationCol.attr("class", "col-12");
        explanationCol.attr("id", "explanation");
        explanationCol.html("<h2>" + questionArray[questionIndex].explanation + "</h2>");

        var gifCol = $("<div>");
        gifCol.attr("class", "col-12 col-md-6 offset-md-3");
        var gif = $("<img>");
        gif.attr("src", questionArray[questionIndex].rightGif);
        gifCol.append(gif);
        $("#questionDisplay").append(explanationCol);
        $("#questionDisplay").append(gifCol);
        rightChoice = false;
        trashArray.push(questionArray[questionIndex]);
        questionArray.splice(questionIndex, 1);
        setTimeout(function() {
            $("#answers").html("");
            newGame();
        }, 7500);
    } else {

        numberWrong++;
        $("#timer").html("");
        $("#secondsRemaining").html("");
        $("#answers").html("");
        $("#questionDisplay").html("<h2>Wrong!</h2>");

        var explanationCol = $("<div>");
        explanationCol.attr("class", "col-12");
        explanationCol.attr("id", "explanation");

        explanationCol.html("<h2>" + questionArray[questionIndex].explanation + "</h2>");


        var gifCol = $("<div>");
        gifCol.attr("class", "col-12 col-md-6 offset-md-3");
        var gif = $("<img>");
        gif.attr("src", questionArray[questionIndex].rightGif);
        gifCol.append(gif);

        $("#questionDisplay").append(explanationCol);

        $("#questionDisplay").append(gifCol);
        trashArray.push(questionArray[questionIndex]);

        questionArray.splice(questionIndex, 1);

        setTimeout(function() {
            $("#answers").html("");
            newGame();
        }, 7500);

    }

}

$("#startButton").click(function() {
    $("#startButton").html("");
    newGame();

});
