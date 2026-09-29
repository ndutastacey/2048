"use client";

import './globals.css';

import { useState, useEffect, useCallback } from "react";

import {
  createEmptyBoard,
  addRandomTile
} from "../game/board";

import { moveBoard } from "../game/moves";
import { checkGameOver } from "../game/game";
import { getBestMove } from "../ai/player";

export default function GamePage() {
  const [board, setBoard] = useState(createEmptyBoard());
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [aiPlaying, setAiPlaying] = useState(false);

  const initGame = useCallback(() => {
  let newBoard = createEmptyBoard();

  newBoard = addRandomTile(newBoard);
  newBoard = addRandomTile(newBoard);

  setBoard(newBoard);
  setScore(0);
  setGameOver(false);
}, []);
  

  const move = useCallback((direction) => {
  if (gameOver) return;

  const result = moveBoard(board, direction);

  if (!result.changed) {
    return;
  }

  const boardWithNewTile = addRandomTile(result.board);

  setBoard(boardWithNewTile);
  setScore(prev => prev + result.scoreGain);

  if (checkGameOver(boardWithNewTile)) {
    setGameOver(true);
  }
}, [board, gameOver]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowLeft":
          move("LEFT");
          break;
        case "ArrowRight":
          move("RIGHT");
          break;
        case "ArrowUp":
          move("UP");
          break;
        case "ArrowDown":
          move("DOWN");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [move]);

  useEffect(() => {
  if (!aiPlaying || gameOver) {
    return;
  }

  const timer = setTimeout(() => {
    const direction = getBestMove(board);

    if (direction) {
      move(direction);
    } else {
      setAiPlaying(false);
    }
  }, 300);

  return () => clearTimeout(timer);
}, [aiPlaying, gameOver, board, move]);

  return (
    <div
      className="main-container"
      style={{
        flexDirection: "column",
        gap: "20px"
      }}
    >

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "460px",
          alignItems: "center"
        }}
      >
        <div
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "saddlebrown"
          }}
        >
          Score: {score}
        </div>

        <button
          onClick={initGame}
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            backgroundColor: "saddlebrown",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Reset Game
        </button>
      </div>

        <button
          onClick={() => setAiPlaying(prev => !prev)}
          style={{
            padding: '10px 20px',
            borderRadius: '5px',
            backgroundColor: 'darkgreen',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold'
            }}
          >
            {aiPlaying ? "Stop AI" : "AI Play"}
        </button>

      <div
        className="grid"
        style={{ position: "relative" }}
      >
        {board.flatMap((row, rIdx) =>
          row.map((value, cIdx) => (
            <div
              key={`${rIdx}-${cIdx}`}
              className={`tile-${value}`}
            >
              {value !== 0 ? value : ""}
            </div>
          ))
        )}

        {gameOver && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.65)",
              borderRadius: "15px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "white"
            }}
          >
            <h2
              style={{
                fontSize: "36px",
                marginBottom: "10px"
              }}
            >
              Game Over!
            </h2>

            <button
              onClick={initGame}
              style={{
                padding: "10px 20px",
                fontSize: "18px",
                cursor: "pointer"
              }}
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
