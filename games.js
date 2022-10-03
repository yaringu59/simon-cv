
var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern =[];

var level = 0;

function nextSequence(){
  var randomNumber = Math.floor(Math.random() * (3 + 1));
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("#level-title").text("Level " + level);
}

function animatePress(currentColour){

    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");}, 100);
  }

  function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

  var started = false;

  $(document).keypress(function() {
    if (!started) {

      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

function checkAnswer(currentLevel){

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success!");
  }
  else{
    gamePattern = [];
    startOver();
    $("#level-title").text("Game Over, Press Any Key to Restart");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
  }
  if (userClickedPattern.length === gamePattern.length && userClickedPattern.length != 0){
      setTimeout(function(){
        nextSequence();
      }, 1000);
      userClickedPattern = [];
  }
}


$(".btn").click(function(event) {
var userChosenColour = (event.target.id);
userClickedPattern.push(userChosenColour);
playSound(userChosenColour);
animatePress(userChosenColour);
checkAnswer(userClickedPattern.length-1);
});

function startOver(){
  level = 0;
  gamePattern = [];
  userClickedPattern =[];
  started = false;
}
