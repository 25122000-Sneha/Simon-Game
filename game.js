let userClickedPattern = [];
let gamePattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];

var started = false;

var level = 0;

$(document).keypress(function(){
    if (started==false)
    {
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
})




    
$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");    
    userClickedPattern.push(userChosenColor);
    
    console.log(userClickedPattern);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    
    checkAnswer(userClickedPattern.length - 1);
});



function checkAnswer(currentLevel){

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");
        
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else
    {
        console.log("wrong");
        playSound("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }

}


function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}


function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);

    var randomNumber = Math.random();
    randomNumber = randomNumber*4;
    randomNumber = Math.floor(randomNumber);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeTo(100, 0.3, function() { $(this).fadeTo(500, 1.0); });

    playSound(randomChosenColor);

    
    
}

function playSound(name){
    var audio = new Audio("Sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("."+currentColor).addClass("pressed");

    setTimeout(function() {
        $("."+currentColor).removeClass("pressed");
    }, 100);
}