let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

function playSound(name){
    let beat = new Audio('sounds/' + name + '.mp3');
    beat.play();
}


function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $(".btn").removeClass('pressed');
    }, 100);
}


$(".btn").click(function(){
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});


function nextSequence(){
    userClickedPattern = [];
    level = level + 1;
    $("#level-title").text("Level ".concat(level));
    let randomNumber = Math.floor((Math.random() * 4));
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    animatePress(randomChosenColour);
    playSound(randomChosenColour);
    $('#' + currentColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}


$(document).keypress(function(){
    if(!started){
    $("#level-title").text("Level 0");
    nextSequence();
    started = true;
    }
});


function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.concatlength){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over, Press any key to Restart");
        startOver();
    }
}

function startOver(){
    level = 0 ;
    gamePattern = [];
    started = false;
}