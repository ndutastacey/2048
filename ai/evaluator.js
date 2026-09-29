export const evaluateBoard = (board) => {
  let emptyCells = 0;
  let totalValue = 0;
  let highestTile = 0;

  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      const value = board[r][c];

      if (value === 0) {
        emptyCells++;
      } else {
        totalValue += value;

        if (value > highestTile) {
          highestTile = value;
        }
      }
    }
  }

  return (
    emptyCells * 100 +
    totalValue +
    highestTile * 10
  );
};