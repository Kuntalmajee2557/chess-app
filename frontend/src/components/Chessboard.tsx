import { Chess, Color, PieceSymbol, Square } from 'chess.js';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface boardProps {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][],
  chess: Chess,
  turn: "white" | "black" | null,
  socket: WebSocket | null,
  setBoard: Dispatch<SetStateAction<({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][]>>

}

interface colProps {
  square: Square;
  type: PieceSymbol;
  color: Color;
}

function Chessboard({ board, setBoard, chess, turn, socket }: boardProps) {
  const [from, setFrom] = useState<Square | null>(null)
  const [to, setTo] = useState<Square | null>(null)
  const [possibleMoves, setPossibleMoves] = useState<string[] | null>(null)

  useEffect(() => {
    if (from) {
      const moves = chess.moves({
        square: from,
      })
      setPossibleMoves(moves)
    }
    else {
      setPossibleMoves(null)
    }
  }, [from, chess])

  //print possible moves
  useEffect(() => {
    console.log(possibleMoves)
  }, [possibleMoves])

  useEffect(() => {
    if (from && to) {
      const moves = chess.moves({
        square: from,
      });

      let validmove = false;
      moves.map((move) => {
        if (move.includes(to)) {
          validmove = true
        }
      })

      if (validmove) {
        socket?.send(JSON.stringify({
          type: "move",
          move: {
            from: from,
            to: to
          }

        }))
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

  const clickhandler = (position: Square, col: colProps | null) => {
      if (col?.color && turn?.[0] === col.color) {
        const moves = chess.moves({
          square: col.square
        })
        setPossibleMoves(moves);
      }
      else {
        setPossibleMoves(null)
      }

      if (!from) {
        if(turn?.[0] === col?.color){
          setFrom(position)
        }
      }
      else {
        const moves = chess.moves({
          square: from
        })
        let include = false;
        moves.map((move) => {
          if (move.includes(position)) {
            include = true;
          }
        })
        if (include) {
          setTo(position)
        }
        else {
          if(turn?.[0] === col?.color){
            setFrom(position)
          }
        }
      }
  }


  return (
    <div className='grid grid-cols-8 grid-rows-8'>
      {board.map((row, i) => {
        return (
          row.map((col, j) => {
            const position = String.fromCharCode(j + 97) + (8 - i) as Square
            return <div key={position} onClick={() => clickhandler(position, col)} className={(i % 2 == 0 && j % 2 == 0) || (i % 2 != 0 && j % 2 != 0) ? 'size-28 flex flex-col justify-center items-center bg-slate-400 text-black' : 'size-28 flex flex-col justify-center items-center bg-slate-600 text-black'} >
              {/* <div className=''>{String.fromCharCode(j + 97)}{8 - i}</div> */}
              {/* <div>{col?.square}</div> */}
              {/* <div>{col?.type}</div> */}
              {/* {possibleMove?.includes(position) && <div>to</ div>} */}
              {
                possibleMoves?.map((possibleMove) => {
                  if (possibleMove.includes(position)) {
                    return (
                      <img src="possible.png" className="size-10 absolute" alt="" />
                    )
                  }
                })
              }

              <img src={col?.color == "b" ? `${col.type}.png` : `${col?.type} copy.png`} alt="" className='' />
            </div>
          })
        )
      })}
    </div>
  )
}

export default Chessboard

