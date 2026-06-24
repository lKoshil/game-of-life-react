export const createEmptyGrid = (rows, cols) => {
  return Array.from({ length: rows }, () => Array(cols).fill(0));
};

export const createRandomGrid = (rows, cols) => {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => (Math.random() > 0.7 ? 1 : 0))
  );
};

export const countNeighbors = (grid, x, y) => {
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      const row = (x + i + rows) % rows; // тороидальное поле (заворачивается)
      const col = (y + j + cols) % cols;
      count += grid[row][col];
    }
  }

  return count;
};

export const nextGeneration = (grid) => {
  const rows = grid.length;
  const cols = grid[0].length;
  const newGrid = createEmptyGrid(rows, cols);

  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      const neighbors = countNeighbors(grid, x, y);
      const cell = grid[x][y];

      if (cell === 1 && (neighbors === 2 || neighbors === 3)) {
        newGrid[x][y] = 1; // выживает
      } else if (cell === 0 && neighbors === 3) {
        newGrid[x][y] = 1; // рождается
      } else {
        newGrid[x][y] = 0; // умирает
      }
    }
  }

  return newGrid;
};

// Пресеты паттернов
export const PATTERNS = {
  glider: [
    [0, 1, 0],
    [0, 0, 1],
    [1, 1, 1],
  ],
  blinker: [
    [1, 1, 1],
  ],
  pulsar: [
    [0,0,1,1,1,0,0,0,1,1,1,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,1,0,1,0,0,0,0,1],
    [1,0,0,0,0,1,0,1,0,0,0,0,1],
    [1,0,0,0,0,1,0,1,0,0,0,0,1],
    [0,0,1,1,1,0,0,0,1,1,1,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,1,1,0,0,0,1,1,1,0,0],
    [1,0,0,0,0,1,0,1,0,0,0,0,1],
    [1,0,0,0,0,1,0,1,0,0,0,0,1],
    [1,0,0,0,0,1,0,1,0,0,0,0,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,1,1,0,0,0,1,1,1,0,0],
  ],
  gosperGliderGun: [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
    [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
    [1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  ],
};

export const placePattern = (grid, pattern, startX, startY) => {
  const newGrid = grid.map(row => [...row]);
  for (let i = 0; i < pattern.length; i++) {
    for (let j = 0; j < pattern[i].length; j++) {
      if (pattern[i][j] === 1) {
        const x = (startX + i) % grid.length;
        const y = (startY + j) % grid[0].length;
        newGrid[x][y] = 1;
      }
    }
  }
  return newGrid;
};