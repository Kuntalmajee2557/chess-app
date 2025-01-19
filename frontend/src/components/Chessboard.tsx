import { Chess, Color, PieceSymbol, Square } from 'chess.js';
import React, { Dispatch, SetStateAction, useEffect } from 'react'

interface boardProps {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][],
  chess : Chess,
  setBoard: Dispatch<SetStateAction<({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][]>>

}


function Chessboard({ board ,setBoard, chess}: boardProps) {


  return (
    <div className='grid grid-cols-8 grid-rows-8'>
      {board.map((row, i) => {
        return (
          row.map((col, j) => {
            return <div className={(i % 2 == 0 && j % 2 == 0) || (i % 2 != 0 && j % 2 != 0) ? 'size-28 flex flex-col justify-center items-center bg-slate-400 text-black' : 'size-28 flex flex-col justify-center items-center bg-slate-600 text-black'} >
              {/* <div className=''>{String.fromCharCode(j + 97)}{8 - i}</div> */}
              {/* <div>{col?.square}</div> */}
              {/* <div>{col?.type}</div> */}
              <img src={col?.color == "b" ? `${col.type}.png` : `${col?.type} copy.png`} alt="" className=''/>
            </div>
          })
        )
      })}
    </div>
  )
}

export default Chessboard

