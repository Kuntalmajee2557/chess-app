import { Chess, Color, PieceSymbol, Square } from 'chess.js';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface boardProps {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][],
  chess: Chess,
  setBoard: Dispatch<SetStateAction<({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][]>>

}


function Chessboard({ board, setBoard, chess }: boardProps) {
  const [from, setFrom] = useState<Square | null>(null)
  const [to, setTo] = useState<Square | null>(null)

  useEffect(() => {
    if (from && to) {
      const moves = chess.moves({
        square: from,
      });

      let validmove = false;
      moves.map((move) => {
        if(move.includes(to)){
          validmove = true
        }
      })


      if (validmove) {
        chess.move({
          from,
          to
        })
        setBoard(chess.board())
      }
      setFrom(null)
      setTo(null)
    }

  }, [from, to])

  const clickhandler = (position: Square) => {
    if (!from) {
      setFrom(position)
    }
    else {
      setTo(position)
    }
  }


  return (
    <div className='grid grid-cols-8 grid-rows-8'>
      {board.map((row, i) => {
        return (
          row.map((col, j) => {
            const position = String.fromCharCode(j + 97) + (8 - i) as Square
            return <div key={position} onClick={() => clickhandler(position)} className={(i % 2 == 0 && j % 2 == 0) || (i % 2 != 0 && j % 2 != 0) ? 'size-28 flex flex-col justify-center items-center bg-slate-400 text-black' : 'size-28 flex flex-col justify-center items-center bg-slate-600 text-black'} >
              {/* <div className=''>{String.fromCharCode(j + 97)}{8 - i}</div> */}
              {/* <div>{col?.square}</div> */}
              {/* <div>{col?.type}</div> */}
              <img src={col?.color == "b" ? `${col.type}.png` : `${col?.type} copy.png`} alt="" className='' />
            </div>
          })
        )
      })}
    </div>
  )
}

export default Chessboard

