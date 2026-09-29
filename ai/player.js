import { moveBoard } from "../game/moves";
import { evaluateBoard } from "./evaluator";

const DIRECTIONS = [
  "LEFT",
  "RIGHT",
  "UP",
  "DOWN"
];

export const getBestMove = (board) => {
  let bestMove = null;
  let bestScore = -Infinity;

  for (const direction of DIRECTIONS) {
    const result = moveBoard(board, direction);

    if (!result.changed) {
      continue;
    }

    const score = evaluateBoard(result.board);

    if (score > bestScore) {
      bestScore = score;
      bestMove = direction;
    }
  }

  return bestMove;
};