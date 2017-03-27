//Creates the initial array of questions and answers

var questionArray = [{
        question: "What was Disney's first full length animated film?",
        answers: [{movie: "Steamboat Willie", correct: false},
            {movie: "Cinderella", correct: false},
            {movie: "Snow White and the Seven Dwarfs", correct: true},
            {movie: "Fantasia", correct: false}
        ],
        explanation:"Before Snow White and the Seven Dwarfs, the Disney studio had been primarily involved in the production of animated short subjects in the Mickey Mouse and Silly Symphonies series.",
        rightGif: "assets/images/snow-white.gif"
    }, {
        question: "What year did Disneyland open?",
        answers: [{movie: "1971", correct: false},
            {movie: "1938", correct: false},
            {movie: "1945", correct: false},
            {movie: "1955", correct: true}
        ],
        explanation:"\"To all who come to this happy place: Welcome. Disneyland is your land. Here age relives fond memories of the past, and here youth may savor the challenge and promise of the future.\" - Walter E. Disney, July 17, 1955",
        rightGif: "assets/images/disneyland.gif"
    }, {
        question: "Which is not owned by Disney?",
        answers: [{movie: "Star Wars", correct: false},
            {movie: "Studio Ghibli", correct: true},
            {movie: "The Muppets", correct: false},
            {movie: "ESPN", correct: false}
        ],
        explanation:"Disney has been a distributor for Studio Ghibli since the 1980s, but they do not own them.",
        rightGif: "assets/images/studio-ghibli.gif"
    }, {
        question: "Which animated film first used the xerography technique to keep production cost down?",
        answers: [
            {movie: "101 Dalmatians", correct: true},
            {movie: "Sleeping Beauty", correct: false},
            {movie: "Robin Hood", correct: false},
            {movie: "The Sword and the Stone", correct: false}
        ],
        explanation:"Walt Disney considered shutting down the animation division before testing out the new way to photocopy cells on 101 Dalmatians.",
        rightGif: "assets/images/101-dalmatians.gif"
    }, {
        question: "Which movie did not win the Oscar for Best Animated Feature?",
        answers: [{movie: "Big Hero 6", correct: false},
            {movie: "Finding Nemo", correct: false},
            {movie: "Toy Story 3", correct: false},
            {movie: "Monsters, Inc.", correct: true}
        ],
        explanation:"Monsters, Inc. won the Academy Award for Original Song, but Shrek won for Animated Feature.",
        rightGif: "assets/images/monsters-inc.gif"
    }, {
        question: "Which movie did not receive the Academy Award nomination for Best Picture",
        answers: [{movie: "Toy Story 3", correct: false},
            {movie: "Beauty and the Beast", correct: false},
            {movie: "The Lion King", correct: true},
            {movie: "Up",  correct: false}
        ],
        explanation:"The Lion King was nominated four times and won two Oscars, but it was for Original Song and Original Score.",
        rightGif: "assets/images/the-lion-king.gif"
    }, {
        question: "Who helped write the music for Tarzan (1999)?",
        answers: [{movie: "Elton John", correct: false},
            {movie: "Phil Collins", correct: true},
            {movie: "Randy Newman", correct: false},
            {movie: "Tim Rice", correct: false}
        ],
        explanation:"All four have helped write music for Disney animated films, but Phil Collins wrote songs for Tarzan.",
        rightGif: "assets/images/tarzan.gif"
    }, {
        question: "What was Disney's first full live action feature?",
        answers: [{movie: "Treasure Island", correct: true},
            {movie: "Old Yeller", correct: false},
            {movie: "20,000 Leagues Under the Sea", correct: false},
            {movie: "Marry Poppins", correct: false}
        ],
        explanation:"Treasure Island was the first full live action feature film",
        rightGif: "assets/images/treasure-island.gif"
    }, {
        question: "What year did Walt Disney World open?",
        answers: [{movie: "1969", correct: false},

            {movie: "1971", correct: true},
            {movie: "1973", correct: false},
            {movie: "1955", correct: false}
        ],
        explanation:"Disney World opened up in 1971 in Orlando, Florida.",
        rightGif: "assets/images/disney-world.gif"
    }, {
        question: "Which actor was Aladdin's face modeled after?",
        answers: [
            {movie: "Matthew Broderick", correct: false},
            {movie: "Kurt Russell", correct: false},
            {movie: "Tom Cruise", correct: true},
            {movie: "Scott Weigner", correct: false}
        ],
        explanation:"Although Scott Weigner is the voice for Aladdin, his face was actually modeled after Tom Cruise.",
        rightGif: "assets/images/aladdin.gif"
    },

];


//The array that each question will be pushed into after it is selected
var trashArray = [];

//Sets up the initial global variables
var timer = 30;
var questionIndex = 0;
var numberCorrect = 0;
var numberWrong = 0;
var rightChoice = false;
var timerSet = false;

//Function that starts the timer to count down and also displays the timer up to
function setTimer() {
    $("#timer").html("<h2>Seconds Remaining: </h2>");

    $("#secondsRemaining").html("<h2>" + timer + " </h2>");

    //If the timer hasn't already started moving, then this starts it. This stops it from adding on multiples of counting down.
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


//Function to guess whether or not the pick was right or not by cross-referencing the value in what was selected with the number
//in the correct index

function guessCheck(guess) {
    timer = "";
    if (questionArray[questionIndex].answers[guess].correct) {
        rightChoice = true;
        endGame();
    } else {
        rightChoice = false;
        endGame();
    }
}


//This function chooses the questions at random
function pickQuestion() {

    questionIndex = Math.floor(Math.random() * questionArray.length);

    $("#questionDisplay").html("<h2>" + questionArray[questionIndex].question + "</h2>");

    //Loops the answers into the html, giving it a value of that loop to check for the guess check 
    for (var i = 0; i < questionArray[questionIndex].answers.length; i++) {
        var answerDisplay = $("<div>");
        answerDisplay.addClass("answer");
        answerDisplay.addClass("col-12 col-md-6")
        answerDisplay.attr("data-id", i);
        answerDisplay.html("<h2>" + questionArray[questionIndex].answers[i].movie + "</h2>")
        $("#answers").append(answerDisplay);
    }


    //On click for the answer class
    $(".answer").click(function(event) {
        //when something with an answer class is clicked it puts its value into the guessCheck function
        guessCheck($(this).attr("data-id"));

    });
}


//This is the game function that checks to see if the game is over, and if it isn't it runs the timer function and question function
function newGame() {
    if (questionArray.length === 0) {

        //If the game is over then you get this game over screen which shows how many you got right and wrong and restarts everything after 10 seconds by pushing the trash array back into the question array 
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


    } else {
        timer = 30;
        setTimer();
        pickQuestion();

    }


}


//This runs after a choice is made, and depending on the whether it's right or wrong you will be told if you got it right, the explanation for the correct answer, and a gif. The number of correct or wrong also gets added up by. This screen will last for 7.5 seconds before starting the new game function again.

function endGame() {

    if (rightChoice) {
        numberCorrect++;

        $("#timer").html("");
        $("#secondsRemaining").html("");
        $("#questionDisplay").html("<h2>Correct!</h2>");
        $("#answers").html("");

        //This sets up the explanation div to append to the question display.
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
        
        //This sets up the explanation div to append to the question display.

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
