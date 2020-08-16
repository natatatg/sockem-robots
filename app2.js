//game options - things set only once
let Options = {
    numberOfMoves : 4,
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
        let buttonContainer = document.getElementById("buttonContainer");


        for (let i = 0; i < moves.length; i++) {
            let playersMove = moves[i];
            let newButton = document.createElement("button");

            newButton.addEventListener("click", () => {
                Player.moves.push(playersMove);
                console.log(Player.moves);
            });
            newButton.innerText = moves[i]["buttonLabel"];

            buttonContainer.appendChild(newButton);
        };
        
        let playButton = document.createElement("button");
        playButton.innerText = "play";
        playButton.addEventListener("click", () => Engine.runRound());
        buttonContainer.appendChild(playButton); 

    }
}

//player
let Player = {
    moves : [],
    score: 0
}

//opponent
function Opponent(){
    this.moves = [];
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
    setupGame(){
        let opponentMoves = this.currentOpponent.moves;
        opponentMoves = [];
        for (let i = 0; i < Options.numberOfMoves; i++) {
            let opponentMoves = this.currentOpponent.moves;
            opponentMoves.push(this.randomComputerMove())
        };
        console.log(this.currentOpponent);
    },
    randomComputerMove(){
        const randomNum = (Math.floor((Math.random()*5)));
        let randomMove = Options.possibleMoves[randomNum];
        return randomMove;
    },
    runRound() {
        
        let playerMoves = Player.moves;  
        let opponentMoves = this.currentOpponent.moves;
        for (let i  = 0; i < playerMoves.length; i++) {
            const playerMove = playerMoves[i];
            const playerCode = playerMove.code;
            const opponentMove = opponentMoves[i];
            const opponentCode = opponentMove.code;
            
            if (playerCode === opponentCode) {
                    this.roundResult = "tie";
            } else if (playerMove.winsAgainst.includes(opponentMove.code)) {
                this.roundResult = "win";
                Player.score++;
            } else {
                this.roundResult = "lose";
                this.currentOpponent.score++;
            }
            this.round++;
            console.log(`Punch: ${this.round}. Player chose ${playerMove.buttonLabel}, Opponent chose ${opponentMove.buttonLabel}, You ${this.roundResult}. SCORE: YOU: ${Player.score} / OPPONENT: ${this.currentOpponent.score}`);
          
        }
        this.resetGame();

        // let playerMoves = Player.moves;
        // console.log(playerMove.buttonLabel + " " + opponentMove.buttonLabel);
        // this.round++;
        // if (playerMove.code === opponentMove.code) {
        //     this.roundResult = "tie";
        // } else if (playerMove.winsAgainst.includes(opponentMove.code)) {
        //     this.roundResult = "win";
        //     Player.score++;
        // } else {
        //     this.roundResult = "lose";
        //     this.currentOpponent.score++;
        // }
        // console.log(`Round: ${this.round}. Player chose ${playerMove.buttonLabel}, Opponent chose ${opponentMove.buttonLabel}, You ${this.roundResult}. SCORE: YOU: ${Player.score} / OPPONENT: ${this.currentOpponent.score}`);

        // if (Player.score === 3 || this.currentOpponent.score === 3) {
        //     console.log("GAME OVER.");
        //     if (Player.score > this.currentOpponent.score) {
        //         console.log("YOU WIN.");
        //     } else {
        //         console.log("YOU LOSE.");
        //     }
        //     //function to reset round and scores
        //     this.resetGame();
        // }
        


        },
    resetGame() {
        this.round = 0;
        Player.score = 0;
        this.currentOpponent.score = 0;
        Player.moves = [];

    }
}

//initiate
Board.createButtons();
Engine.setupGame();