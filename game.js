var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var randomChosenColour;
var userChosenColour;
var userClickedPattern = [];
var gameStarted = false;
var level = 0;
var isActive = true;

$(document).keypress(function() {
    if (gameStarted === false) {
        setTimeout(function() {
            $("#level-title").text("Level " + level);
            nextSequence();
            gameStarted = true;
        }, 500);
    }
});

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = (Math.floor(Math.random() * 4));
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function animatePress(currentColour) {
    var currentButton = $("#" + currentColour);
    currentButton.addClass("pressed");
    setTimeout(function() {
        currentButton.removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function() {
            $("body").removeClass("game-over");
            startOver();
        }, 200);
    }
}

$(".btn").click(function() {
    userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
}
