//game options - things set only once
let Options = {
    possibleMoves: [
        {
            buttonLabel: "Jab", 
            code: "jab",
            winsAgainst: ["cross", "uppercut"]
        }, 
        {
            buttonLabel: "Cross",
            code: "cross",
            winsAgainst: ["rHook", "uppercut"]
        }, 
        {
            buttonLabel: "Left Hook",
            code: "lHook",
            winsAgainst: ["cross", "jab"]
         },
         {
             buttonLabel: "Right Hook",
             code: "rHook",
             winsAgainst: ["jab", "lHook"] 
         },
         {
             buttonLabel: "Uppercut",
             code: "uppercut",
             winsAgainst: ["rHook", "lHook"]
         }],
}

//game board - visual ux
let Board = {
    createButtons () {
        let moves = Options.possibleMoves;

        for (let i = 0; i < moves.length; i++) {
            let newButton = document.createElement("button");
            let playersMove = moves[i];
            newButton.addEventListener("click", () => {
                Player.move = playersMove;
                Engine.runRound();
            });
            newButton.innerText = moves[i]["buttonLabel"];

            let buttonContainer = document.getElementById("buttonContainer");
            buttonContainer.appendChild(newButton);
        };
    }
}

//player
let Player = {
    move : {},
    score: 0
}

//opponent
function Opponent(){
    this.move = {};
    this.score = 0;
}

//game engine
let Engine = {
    currentOpponent: new Opponent(),
    round: 0,
    roundResult: "",
    //REFRACTOR///
    //Try and get runRound to work with any RPS varient
    //use Options.possibleMoves[i]["winsAgainst"]
    runRound() {
        let playerMove = Player.move;
        let opponentMove = this.currentOpponent.move;
        const randomNum = (Math.floor((Math.random()*5)));
        opponentMove = Options.possibleMoves[randomNum];
        console.log(playerMove.buttonLabel + " " + opponentMove.buttonLabel);
        this.round++;
        if (playerMove.code === opponentMove.code) {
            this.roundResult = "tie";
        } else if (playerMove.winsAgainst.includes(opponentMove.code)) {
            this.roundResult = "win";
            Player.score++;
        } else {
            this.roundResult = "lose";
            this.currentOpponent.score++;
        }
        console.log(`Round: ${this.round}. Player chose ${playerMove.buttonLabel}, Opponent chose ${opponentMove.buttonLabel}, You ${this.roundResult}. SCORE: YOU: ${Player.score} / OPPONENT: ${this.currentOpponent.score}`);

        if (Player.score === 3 || this.currentOpponent.score === 3) {
            console.log("GAME OVER.");
            if (Player.score > this.currentOpponent.score) {
                console.log("YOU WIN.");
            } else {
                console.log("YOU LOSE.");
            }
            //function to reset round and scores
            this.resetGame();
        }
        


        },
    resetGame() {
        this.round = 0;
        Player.score = 0;
        this.currentOpponent.score = 0;

    }
}

//initiate
Board.createButtons();