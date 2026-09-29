export const createEmptyBoard = () => {
  return Array(4)
    .fill(null)
    .map(() => Array(4).fill(0));
};

export const getEmptyCells = (board) => {
  const emptyCells = [];

  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (board[r][c] === 0) {
        emptyCells.push({ r, c });
      }
    }
  }

  return emptyCells;
};

export const addRandomTile = (board) => {
  const emptyCells = getEmptyCells(board);

  if (emptyCells.length === 0) {
    return board;
  }

  const { r, c } =
    emptyCells[Math.floor(Math.random() * emptyCells.length)];

  const newBoard = board.map(row => [...row]);

  newBoard[r][c] = Math.random() < 0.9 ? 2 : 4;

  return newBoard;
};