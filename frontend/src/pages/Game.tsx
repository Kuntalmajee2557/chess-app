import React, { useEffect, useState } from 'react'
import Chessboard from '../components/Chessboard'
import { Chess, Color, PieceSymbol, Square } from 'chess.js'
import { useSocket } from '../hooks/useSocket'

interface GameMessage {
    type: string,
    payload?: any
}




function Game() {
    const [chess, setChess] = useState(new Chess())
    const [board, setBoard] = useState(chess.board())
    const { socket, message } = useSocket();
    const [turn, setTurn] = useState<"white" | "black" | null>(null)

    useEffect(() => {
        console.log(turn)
    }, [turn])


    useEffect(() => {
        const gameMessage = message as GameMessage;
        console.log(gameMessage)
        if (gameMessage) {
            switch (gameMessage.type) {
                case "init_game":
                    const newChess = new Chess(gameMessage.payload?.chess?.fen)
                    setChess(newChess)
                    setBoard(newChess.board())
                    setTurn(gameMessage.payload?.color)
                    break
                case "move":
                    chess.move(gameMessage?.payload)
                    setBoard(chess.board())
                    break
            }
        }
    }, [message])
    function clickHandler() {
        console.log("clicked");
        socket?.send(JSON.stringify({ type: "init_game" }))
    }
    return (
        <div className='bg-black h-screen text-white grid grid-cols-12'>
            <div className='flex flex-col justify-center items-center col-span-8 border border-r-stone-500'>
                <Chessboard board={board} setBoard={setBoard} chess={chess} turn={turn} socket={socket} />
            </div>
            <div className='col-span-4 flex flex-col items-center border border-l-slate-500'>
                <button onClick={clickHandler} className='border border-slate-500 px-24 py-5 rounded-lg font-bold mt-16 hover:bg-slate-800 text-7xl'>play</button>
            </div>
        </div>
    )
}

export default Game