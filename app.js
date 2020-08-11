// Gets all the punch buttons from DOM
let userButtonArray = document.querySelectorAll(".user_punch");

// All of the possible moves in game
let possibleMoves = ["jab", "cross", "lHook", "rHook", "uppercut"];

// Looping through button DOM elements and running activateButtons function on them 
for (let i = 0; i < userButtonArray.length; i++) {
    const element = userButtonArray[i];
    const playersMove = possibleMoves[i]
    activateButtons(element,playersMove);
}

// Adding a click event to button elements
function activateButtons(element,playersMove) {
    element.addEventListener("click", () => runRound(playersMove));
}

// Runs round and compares computers move to players 
function runRound(playersMove) {
    const randomNum = (Math.floor((Math.random()*5)));
    const computersMove = possibleMoves[randomNum];
    console.log(computersMove, playersMove);
}

// Displays result of game