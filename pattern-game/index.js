var colors = ["green", "red", "yellow", "blue"]; //buttonColors
var userArray = []; //userClickedPattern
var gameArray = []; //gamePattern
var level = 0;
var start = false; //started
$(document).keydown(function() {
  $(".rabbit").show();
  if (!start) {
    $("#level-title").text("Level- " + level);
    pattern(); //nextSequence
    start = true;
  }
});

function pattern() {
  userArray = [];
  level++;

  $("#level-title").text("Level- " + level);
  randomNumber = Math.floor(Math.random() * 4);
  var randomColor = colors[randomNumber];
  gameArray.push(randomColor);
  $("." + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomColor);
  //animation
  //sound
}
$(".btn").click(function() {
  var colorId = $(this).attr("id");
  userArray.push(colorId);
  matchColor(userArray.length - 1);
  animateBtn(colorId);
  playSound(colorId);
  //animation
  //sound
});

function matchColor(position) {
  if (userArray[position] === gameArray[position]) {
    if (userArray.length === gameArray.length) {
      setTimeout(function() {
        pattern();
      }, 1000);

    }
  } else {
    playSound("wrong");
    $(".rabbit").hide();
    // $("body").classList.add("game-over"); ------IF we would have used Vanilla JAVASCRIPT
    $("body").addClass("game-over"); // Used J-Query
    $("#level-title").text("GAME OVER! Press Any Key to Restart");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 300);

    //sound

    startAgain();
  }
}

function startAgain() {

  level = 0;
  userArray = [];
  start = false;
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animateBtn(chosenColor) {
  $("." + chosenColor).addClass("pressed");
  setTimeout(function() {
    $("." + chosenColor).removeClass("pressed");
  }, 100);
}
