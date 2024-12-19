import { WebSocket } from 'ws'
import { INIT_GAME, MOVE } from "./message";
import { Game } from "./Game";


export class GameManager {
    private games: Game[];
    private pendingUser: WebSocket | null;
    private users: WebSocket[];
    
    constructor(){
        this.games = [];
        this.users = [];
        this.pendingUser = null;
    }

    addUser(socket: WebSocket){
        this.users.push(socket);
    }

    removeUser(socket: WebSocket){
        this.users = this.users.filter(user => user != socket);
    }

    private addHandler(socket: WebSocket){
        socket.on("message", (data: any) => {
            const message = JSON.parse(data.type);

            if(message === INIT_GAME){
                if(this.pendingUser){
                    const game = new Game(this.pendingUser, socket);
                    this.games.push(game);
                    this.pendingUser = null;
                }
                else{
                    this.pendingUser = socket;
                }
            }

            if(message === MOVE){
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                game?.makeMove(socket, message.move);
            }
        })
    }



}
