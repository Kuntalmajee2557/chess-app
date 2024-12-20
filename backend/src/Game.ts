import { Chess } from "chess.js";
import { WebSocket } from "ws";
import { GAME_OVER, INIT_GAME, MOVE } from "./message";
export class Game {
    public player1: WebSocket;
    public player2: WebSocket;
    private board: Chess;
    private moves: object[];
    private startTime: Date;

    constructor(player1: WebSocket, player2: WebSocket) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.moves = [];
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "white"
            }
        }))
        this.player2.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "black"
            }
        }))
    }

    makeMove(socket: WebSocket, move: {
        from: string,
        to: string
    }) {
        console.log("move is here " + move)
        // validation
        // is it this users move
        if (this.moves.length % 2 === 0 && socket != this.player1) {
            console.log("not white's move")
            return;
        }
        if (this.moves.length % 2 === 1 && socket != this.player2) {
            console.log("not black's move")

            return;
        }
        // is the move valid??
        try {
            console.log("here3")
            console.log(this.moves.length)
            
            this.board.move(move);
            this.moves.push(move);
            console.log("here4")
            console.log(this.moves.length)


        } catch (e) {
            console.log(e)
            return
        }

        console.log("here5")

        if (this.board.isGameOver()) {
            console.log("here6")

            this.player1.emit(JSON.stringify({
                type: GAME_OVER,
                payload: {
                    winner: this.board.turn() == "w" ? "white" : "black" 
                }
            }))
            this.player2.emit(JSON.stringify({
                type: GAME_OVER,
                payload: {
                    winner: this.board.turn() == "w" ? "white" : "black" 
                }
            }))
        }

        if(this.moves.length % 2 === 0){
            console.log("here7")

            this.player1.send(JSON.stringify({
                type: MOVE,
                payload: move
            }))
        }
        else{
            console.log("here8")

            this.player2.send(JSON.stringify({
                type: MOVE,
                payload: move
            }))
        }
        // update the board
        // send the update board to both player
    }

}
