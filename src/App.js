import React, { useState } from "react";
import { motion } from "framer-motion";

function App() {
  const [player, setPlayer] = useState({ val: 0, symbol: "X" });
  const [board, setBoard] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

  const [winner, setWinner] = useState(null);

  const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWin = (symbol) => {
    return WINNING_COMBINATIONS.some((combination) => {
      return combination.every((value, index) => {
        let i = value % 3;
        let j = parseInt(value / 3);
        return board[i][j] == symbol;
      });
    });
  };

  const WinDrawMessage = () => {
    return (
      <motion.div
        initial={{ x: 0 }}
        animate={{ opacity: [0, 0.6, 0.2, 1], x: 0 }}
        transition={{ duration: 1 }}
        className=" mt-4 text-3xl tracking-widest font-mono text-green-600 font-bold"
      >
        {winner
          ? `Player ${winner?.val + 1} wins!`
          : isDraw()
          ? `Its Draw`
          : ""}
      </motion.div>
    );
  };

  const isDraw = () => {
    const allFilled = board.flat().indexOf(null);
    if (allFilled == -1 && !winner) {
      //all slots filled and there is not winner - its a isDraw
      return true;
    }
    return false;
  };

  const PlayerTurnMessage = () => {
    return (
      <motion.div
        initial={{ x: 0 }}
        animate={{ opacity: [0, 0.6, 0.2, 1], x: 0 }}
        transition={{ duration: 1 }}
        className="text-2xl p-2 m-2 font-mono"
      >
        Player <span>{player.val + 1}</span>'s turn
      </motion.div>
    );
  };

  const Footer = () => {
    return (
      <div className="flex flex-row">
        <button
          className="rounded-full  hover:text-white hover:border-orange-400 border border-gray-400 text-gray-500 p-1 m-2 w-20"
          onClick={(e) => {
            setBoard([
              [null, null, null],
              [null, null, null],
              [null, null, null],
            ]);
            setPlayer({ val: 0, symbol: "X" });
            setWinner(null);
          }}
        >
          Reset
        </button>
        <div className="text-xl text-gray-500 font-semibold font-mono justify-end flex flex-row w-52">
          Player 1 - X
          <br />
          Player 2 - O
        </div>
      </div>
    );
  };

  const BoardView = () => {
    return (
      <div className="mt-12 flex flex-col items-center justify-center p-1 m-1 rounded-md">
        {board.map((row, rowIndex) => {
          return (
            <row className="flex flex-row">
              {row.map((col, colIndex) => {
                return (
                  <div
                    className={`h-20 w-20 sm:h-28 sm:w-28 lg:h-32 lg:w-32 bg-yellow-200 border-2 border-yellow-500 m-1 rounded-lg p-1 ${
                      board[rowIndex][colIndex] || winner
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }  ${
                      board[rowIndex][colIndex] == "X"
                        ? "text-rose-600"
                        : "text-blue-600"
                    }`}
                    onClick={() => {
                      if (board[rowIndex][colIndex] == null && !winner) {
                        var tempBoard = board;
                        tempBoard[rowIndex][colIndex] = player.symbol;
                        setBoard(tempBoard);
                        if (checkWin(player.symbol)) {
                          setWinner(player);
                        }

                        setPlayer({
                          val: Math.abs(player.val - 1),
                          symbol: player.symbol == "O" ? "X" : "O",
                        });
                      }
                    }}
                  >
                    {/* {rowIndex + " " + colIndex} */}
                    <motion.div
                      intitial={{ x: 0, scale: 0, opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      animate={{ x: 0, scale: [1.2, 0.8, 1] }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                      className="text-6xl min-h-full min-w-full items-center justify-center flex"
                    >
                      {board[rowIndex][colIndex]}
                    </motion.div>
                  </div>
                );
              })}
            </row>
          );
        })}
      </div>
    );
  };
  return (
    <div className="bg-zinc-800 h-screen text-white">
      <div className="flex flex-col items-center justify-center">
        <motion.div
          initial={{ x: -200 }}
          animate={{ opacity: [0, 1], x: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-5xl tracking-[20px] p-2 m-2 mt-12 text-gray-400 font-semibold"
        >
          TicTacToe
        </motion.div>
        <WinDrawMessage />
        <BoardView />
        <PlayerTurnMessage />
        <Footer />
      </div>
    </div>
  );
}

export default App;
