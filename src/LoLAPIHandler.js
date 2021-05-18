//Contains all functions for interacting with the LoL API

//Send messages
function LoLApi (messageName, payloadObj) {
    let msg={
        "message": messageName,
        "payload": JSON.stringify(payloadObj)
    };

    parent.postMessage(msg,'*');
}

//Called when the game starts, tells LoL API game is ready
function gameStart()
{
    LoLApi("gameIsReady", 
    { 
        aspectRatio: "16:9",
        resolution: "1024x660",
    });

	console.log("gameIsReady sent"); 
}

//Listen for messages
window.addEventListener("message", function (msg) {
    //console.log('[PARENT => UNITY]', msg);
    const {messageName, payload} = msg.data; 
    var prevState;

    switch (messageName) 
    {
        case 'pause':
            gameIsPaused = true;
            break;
        case 'resume':
            gameIsPaused = false;
            break;
        case 'start':
            prevState = JSON.parse(payload);
            if (prevState.currentProgress > 0)
                currProgress = prevState.currentProgress;
            console.log("game start progress: "+currProgress);
            break;
        case 'loadState':
            prevState = JSON.parse(payload);
            if (prevState.currentProgress > 0)
                currProgress = prevState.currentProgress;
            console.log("loadState progress: "+currProgress);
            loadLevel(currProgress-1);
            break;
    }
});

var gameIsPaused = false;
var sentComplete = false;

//Progress Handling
  var currProgress = 0;
  var maxProgress = 11;

  //Add tutorial progress
  function reachedSaveSpot(index)
  {
    if (index + 1 > currProgress) //first time level is being completed
    {
      currProgress = Math.min(maxProgress, index + 1);
      sendProgress();
      //checkGameEnd();
    }
  }

  //Send new progress to LoL API
  function sendProgress()
  {
    LoLApi('progress', {score: 0, currentProgress: currProgress, maximumProgress: maxProgress});
    LoLApi('saveState', {currentProgress: currProgress, maximumProgress: maxProgress});

    console.log("progress: " + currProgress + "/"+maxProgress);
  }

//Determine if progress points are maxed. If so, end the game
function checkGameEnd()
{
  if (currProgress >= maxProgress)
  {
    endGame();
  }
}

//Tell LoL API to end the game
function endGame()
{
  if (!sentComplete)
  {
    sentComplete = true;
    LoLApi('complete', {});
    console.log("Complete");
  }
}
