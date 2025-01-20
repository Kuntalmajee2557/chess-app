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
        // validation
        // is it this users move
        if (this.moves.length % 2 === 0 && socket != this.player1) {
            return;
        }
        if (this.moves.length % 2 === 1 && socket != this.player2) {
            return;
        }
        // is the move valid??
        try {
            this.board.move(move);
            this.moves.push(move);
        } catch (e) {
            console.log(e)
            return
        }

        if (this.board.isGameOver()) {
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

        if (this.moves.length % 2 === 0) {
            this.player1.send(JSON.stringify({
                type: MOVE,
                payload: move
            }))
        }
        else {
            this.player2.send(JSON.stringify({
                type: MOVE,
                payload: move
            }))
        }
        // update the board
        // send the update board to both player
    }

}
