const slideAndMergeLine = (line) => {
  let filtered = line.filter(value => value !== 0);
  let scoreGain = 0;

  for (let i = 0; i < filtered.length - 1; i++) {
    if (filtered[i] === filtered[i + 1]) {
      filtered[i] *= 2;
      scoreGain += filtered[i];
      filtered[i + 1] = 0;
    }
  }

  filtered = filtered.filter(value => value !== 0);

  while (filtered.length < 4) {
    filtered.push(0);
  }

  return {
    line: filtered,
    scoreGain
  };
};

const transpose = (matrix) => {
  return matrix[0].map((_, i) =>
    matrix.map(row => row[i])
  );
};

export const moveBoard = (board, direction) => {
  let nextBoard = board.map(row => [...row]);
  let scoreGain = 0;

  if (direction === "LEFT" || direction === "RIGHT") {
    nextBoard = nextBoard.map(row => {
      const targetRow =
        direction === "RIGHT"
          ? [...row].reverse()
          : row;

      const result = slideAndMergeLine(targetRow);

      scoreGain += result.scoreGain;

      return direction === "RIGHT"
        ? result.line.reverse()
        : result.line;
    });
  }

  if (direction === "UP" || direction === "DOWN") {
    let transposed = transpose(nextBoard);

    transposed = transposed.map(column => {
      const targetColumn =
        direction === "DOWN"
          ? [...column].reverse()
          : column;

      const result = slideAndMergeLine(targetColumn);

      scoreGain += result.scoreGain;

      return direction === "DOWN"
        ? result.line.reverse()
        : result.line;
    });

    nextBoard = transpose(transposed);
  }

  const changed =
    JSON.stringify(board) !== JSON.stringify(nextBoard);

  return {
    board: nextBoard,
    scoreGain,
    changed
  };
};