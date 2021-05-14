let gamePattern = [];
let userClickedPattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];
let gameStarted = false;
let level = 0;

function playSound(button){
    let audio = new Audio("sounds/" + button + ".mp3");
    audio.play();
}

function nextSequence(){
    // generate random number to decide randomChosenColor
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    // updates h1
    $("h1").text("Level " + level);
    // updates gamePattern array
    gamePattern.push(randomChosenColor);
    console.log(gamePattern);
    // flashes the randomChosenColor button
    $("#" + randomChosenColor).fadeToggle();
    setTimeout(function (){$("#" + randomChosenColor).fadeToggle();}, 100);
    // plays the sound for the button
    playSound(randomChosenColor);
    // updates level
    level++;
}

// eventListener for animation and sound
$(".btn").on("click", function (){
    let buttonID = $(this).attr("id");
    playSound(buttonID);
    animatePress(buttonID);
});

// eventListener to update userClickedPattern and check answer
$(".btn").on("click", function (){
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    checkAnswer(level);
})

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function (){$("#" + currentColor).removeClass("pressed");}, 100);
}

// detects keydown to start game
$(document).on("keydown", function (){
    if(!gameStarted){
        gameStarted = true;
        nextSequence();
    }
});

function checkAnswer(currentLevel){
    let rightAnswer = true;
    for(let i = 0; i < userClickedPattern.length; i++){
        if(userClickedPattern[i] === gamePattern[i]){
            // do nothing because everything is correct so far
        }
        else{
            rightAnswer = false;
            break;
        }
    }
    if(rightAnswer){
        console.log("success");
        // when player has entered enough button presses for the sequence
        if(userClickedPattern.length === currentLevel){
            setTimeout(nextSequence, 1000);
            userClickedPattern = [];
        }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function (){$("body").removeClass("game-over");}, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    gameStarted = false;
    gamePattern = [];
    userClickedPattern = [];
}