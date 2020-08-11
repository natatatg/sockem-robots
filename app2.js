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
    //REFRACTOR///
    //Try and get runRound to work with any RPS varient
    //use Options.possibleMoves[i]["winsAgainst"]
    runRound() {
        let playerMove = Player.move;
        let opponentMove = this.currentOpponent.move;
        const randomNum = (Math.floor((Math.random()*5)));
        opponentMove = Options.possibleMoves[randomNum];
        console.log(playerMove.buttonLabel + " " + opponentMove.buttonLabel);
        if (playerMove.code === opponentMove.code) {
            console.log("tie.");
        } else if (playerMove.winsAgainst.includes(opponentMove.code)) {
            console.log("you win.");
        } else {
            console.log("you lose.");
        }




        // switch (Player.move.code) {
        //     case "jab":
        //         switch (this.currentOpponent.move.code) {
        //             case "jab":
        //                 this.roundResult = "tie";
        //                 break;
        //             case "cross":
        //                 this.roundResult = "win";
        //                 break;
        //             case "lHook":
        //                 this.roundResult = "lose";
        //                 break;
        //             case "rHook":
        //                 this.roundResult = "lose";
        //                 break;
        //             case "uppercut":
        //                 this.roundResult = "win";
        //                 break;
        //         }
        //     break;
        //     case "cross":
        //         switch (this.currentOpponent.move.code) {
        //             case "jab":
        //                 this.roundResult = "lose";
        //                 break;
        //             case "cross":
        //                 this.roundResult = "tie";
        //                 break;
        //             case "lHook":
        //                 this.roundResult = "lose";
        //                 break;
        //             case "rHook":
        //                 this.roundResult = "win";
        //                 break;
        //             case "uppercut":
        //                 this.roundResult = "win";
        //                 break;
        //         }
        //     break;
        //     case "lHook":
        //         switch (this.currentOpponent.move.code) {
        //             case "jab":
        //                 this.roundResult = "win";
        //                 break;
        //             case "cross":
        //                 this.roundResult = "win";
        //                 break;
        //             case "lHook":
        //                 this.roundResult = "tie";
        //                 break;
        //             case "rHook":
        //                 this.roundResult = "lose";
        //                 break;
        //             case "uppercut":
        //                 this.roundResult = "lose";
        //                 break;
        //         }
        //     break;
        //     case "rHook":
        //         switch (this.currentOpponent.move.code) {
        //             case "jab":
        //                 this.roundResult = "win";
        //                 break;
        //             case "cross":
        //                 this.roundResult = "lose";
        //                 break;
        //             case "lHook":
        //                 this.roundResult = "win";
        //                 break;
        //             case "rHook":
        //                 this.roundResult = "tie";
        //                 break;
        //             case "uppercut":
        //                 this.roundResult = "lose";
        //                 break;
        //         }
        //     break;
        //     case "uppercut":
        //         switch (this.currentOpponent.move.code) {
        //             case "jab":
        //                 this.roundResult = "lose";
        //                 this.currentOpponent.score = this.currentOpponent.score+1;
        //                 break;
        //             case "cross":
        //                 this.roundResult = "lose";
        //                 this.currentOpponent.score = this.currentOpponent.score+1;
        //                 break;
        //             case "lHook":
        //                 this.roundResult = "win";
        //                 Player.score = Player.score+1;
        //                 break;
        //             case "rHook":
        //                 this.roundResult = "win";
        //                 Player.score = Player.score+1;
        //                 break;
        //             case "uppercut":
        //                 this.roundResult = "tie";
        //                 break;
        //         }
        // }
            // this.round = this.round+1;
            
            
            // console.log(`Round: ${this.round}. Player chose ${Player.move.buttonLabel}, Opponent chose ${this.currentOpponent.move.buttonLabel}, You ${this.roundResult}. SCORE: YOU: ${Player.score} / OPPONENT: ${this.currentOpponent.score}`);
        },
}

//initiate
Board.createButtons();