import React, { useEffect, useState } from 'react'
import Chessboard from '../components/Chessboard'
import { Chess, Color, PieceSymbol, Square } from 'chess.js'
import { useSocket} from '../hooks/useSocket'


function Game() {
    const [chess, setChess] = useState(new Chess())
    const [board, setBoard] = useState(chess.board())

    // useEffect(() => {
    //     setChess(() => {
    //         const connect = useSocket();
    //         return chess
    //     })
    // },[])

    return (
        <div className='bg-black h-screen text-white grid grid-cols-12'>
            <div className='flex flex-col justify-center items-center col-span-8 border border-r-stone-500'>
                <Chessboard board={board} setBoard={setBoard} chess={chess}/>
            </div>
            <div className='col-span-4 flex flex-col items-center border border-l-slate-500'>
                <button className='border border-slate-500 px-24 py-5 rounded-lg font-bold mt-16 hover:bg-slate-800 text-7xl'>play</button>
            </div>
        </div>
    )
}

export default Game