import { getEmptyCells } from "./board";

export const checkGameOver = (board) => {
  if (getEmptyCells(board).length > 0) {
    return false;
  }

  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (
        c < 3 &&
        board[r][c] === board[r][c + 1]
      ) {
        return false;
      }

      if (
        r < 3 &&
        board[r][c] === board[r + 1][c]
      ) {
        return false;
      }
    }
  }

  return true;
};