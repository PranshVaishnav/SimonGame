var gamePattern=[];
var userClickedPattern=[];
var buttonColors=["red","blue","green","yellow"];
var started=false;
var level=0;

$(document).keypress(function(event){
  if(!started){
    $("#level-title").text("Level "+level);
    newSequence();
    started=true;
  }
  });


function newSequence()
{
  level++;
  $("#level-title").text("Level "+level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour=buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColor)
{
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

$(".btn").click(function (){
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  for(let i=0;i<userClickedPattern.length;i++)
  {

    if(userClickedPattern[i]==gamePattern[i])
    {
      if(i==gamePattern.length-1){
        userClickedPattern=[];
        setTimeout(function(){
        newSequence();  }, 1000);
          }

      else{
             continue;
          }
    }

    else{
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
       }, 1000);
      $("#level-title").text("Game Over. Press any key to restart");
      level=0;
      userClickedPattern=[];
      gamePattern=[];
      $(document).keypress(function(event)
    {newSequence();  });
    }
  }

});
