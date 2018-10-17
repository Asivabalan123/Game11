//variables
//stores users sequence of clicks
playerClicks = [];
//stores computer sequence of colors
computerClicks = [];
const levels = 6;
var id, color, level = 0;
var restart = false;
var error = false;

// start color sequence
$(document).ready(function() {
  $(".levelBoard").text("");
  $(".start").click(function() {
    restart = false;
    error = false;
    level = 0;
    level++;
    computerClicks = []
    playerClicks = [];
    computerClicksequence();
  })

// player clicks colorArea listener
  $(".colorArea").click(function() {
    id = $(this).attr("id");
    color = $(this).attr("class").split(" ")[1];
    playerClicksequence();
  });

  //restart mode listener
  $(".restart").click(function() {
    level = 0;
    level++;
    computerClicks = []
    playerClicks = [];
    restart = true;
    computerClicksequence();
  })


//user sequence
function playerClicksequence() {
  playerClicks.push(id);
    console.log(id+" "+color);
    addtempFlashClass(id, color);
    //check user sequence
    if(!checkplayerClicks()) {
      //if playing restart mode reset everything
      if(restart) {
        console.log("restart");
        computerClicks = [];
        level = 1;
      }
      error = true;
      levelBoardError();
      playerClicks = [];
      computerClicksequence();
    }
    //checking end of sequence
    else if(playerClicks.length == computerClicks.length && playerClicks.length < levels) {
      level++;
      playerClicks = [];
      error = false;
      console.log("start computer sequence")
      computerClicksequence();
    }
    //checking for winners
    if(playerClicks.length == levels) {
      levelBoardWinner();
      resetGame();
    }

}

/* computer click sequence */
function computerClicksequence() {
  console.log("level "+level);
  $(".levelBoard").text(level);
  if(!error) {
    getRandomNum();
  }
  if(error && restart) {
    getRandomNum();
  }
  var i = 0;
  var myInterval = setInterval(function() {
// adding the flash color change by using the Id for the specific color area.

// first  random color area in the sequence
    id = computerClicks[i];
    // use Id selector in order to get class and so it doesnt return an array split.
    color = $("#"+id).attr("class");
    //as I have two classes, in order for the right one to be selected split the array by space and get the 2nd one.
    color = color.split(" ")[1];
    console.log(id+" "+color);
    addtempFlashClass(id, color);
    i++;
    //if statement to clear the set interval statement
    if(i == computerClicks.length) {
      clearInterval(myInterval);
    }
  }, 2000);
}

//generate random number

function getRandomNum() {
  var random = Math.floor(Math.random() *8);
  //push random number into computer clicks array
  computerClicks.push(random);
}

/* add temporary class */
function addtempFlashClass(id, color) {
  $("#"+id).addClass(color+"-flash");
  setTimeout(function(){
    $("#"+id).removeClass(color+"-flash");
  }, 500);
}

/* checking player seq against computers */
function checkplayerClicks() {
  for(var i = 0; i < playerClicks.length; i++) {
    if(playerClicks[i] != computerClicks[i]) {
      return false;
    }
  }
  return true;
}

/* levelBoard error  */
function levelBoardError() {
  console.log("error");
  var counter = 0;
  var myError = setInterval(function() {
    $(".levelBoard").text("Err");
    counter++;
    if(counter == 4) {
      $(".levelBoard").text(level);
      clearInterval(myError);
      playerClicks = [];
      counter = 0;
    }
  }, 2000);
}

//levelBoard winner
function levelBoardWinner() {
  var count = 0;
  var winInterval = setInterval(function() {
    count++;
    $(".levelBoard").text("Win");
    if(count == 6) {
      clearInterval(winInterval);
      $(".levelBoard").text("0");
      count = 0;
    }
  }, 3000);
}

/* reset game */
function resetGame() {
  playerClicks = [];
  computerClicks = [];
  level = 0;
  $(".levelBoard").text("0");

}
});
