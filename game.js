let buttonColours = ["red", "blue","green" ,"yellow"];
let randomChosenColour;
let gamePattern = [];
let userClickedPattern = [];
let isGameStarted = false;
let level;
let currentIndex = 0;




function nextSequence(){
  let randomNumber = Math.floor(Math.random()*4);
  randomChosenColour  = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  flashButton(randomChosenColour);
}

$(".btn").click(function(){
  let userChosenColour = $(this).attr("id");//this = event.target
  animatePress(userChosenColour);
  playSound(userChosenColour);

  if (isGameStarted){
      userClickedPattern.push(userChosenColour);
      checkAnswer();
  }
});

$(document).keydown(function(event){
  console.log(event.key);
  if (event.key =='a' && !isGameStarted) {
      startGame(event.key);
  }});

function startGame(key){
    isGameStarted = true;
    level = 0;
    currentIndex = 0;
    $("#level-title").text("Level "+level);
    nextSequence();

}

function checkAnswer(){
      if (gamePattern[currentIndex] == userClickedPattern[currentIndex]) {
        currentIndex++;
        if (currentIndex == gamePattern.length) {
          setTimeout(function(){
            levelUp();
            nextSequence();
          },1000);
        }
      }else{
        gameOver();
      }
}

function levelUp(){
  currentIndex = 0;
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level "+level);

}

function gameOver(){

  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
    playSound("wrong");
  },200);

  $("#level-title").text("Game Over, Press A to Restart");
  resetGame();
}

function resetGame(){
  currentIndex = 0;
  level = 0;
  isGameStarted = false;
  userClickedPattern = [];
  gamePattern = [];
}



function animatePress(currentColour){
  $("."+currentColour).addClass("pressed");
  setTimeout(function(){
    $("."+currentColour).removeClass("pressed");
  }, 100);


}

function flashButton(randomChosenColour){
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

function playSound(name){
  switch (name) {
    case "green":
      let green = new Audio("sounds/green.mp3");
      green.play();
      break;
    case "red":
      let red = new Audio("sounds/red.mp3");
      red.play();
      break;
    case "yellow":
      let yellow = new Audio("sounds/yellow.mp3");
      yellow.play();
      break;
    case "blue":
      let blue = new Audio("sounds/blue.mp3");
      blue.play();
      break;
    case "wrong":
      let wrong = new Audio("sounds/wrong.mp3")
      wrong.play()
      break;
    default:
      console.log(name);
  }
}
