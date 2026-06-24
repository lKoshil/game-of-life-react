import React, { useState, useCallback, useRef } from 'react';
import Grid from './components/Grid';
import Controls from './components/Controls';
import PatternSelector from './components/PatternSelector';
import {
  createEmptyGrid,
  createRandomGrid,
  nextGeneration,
  PATTERNS,
  placePattern,
} from './utils/gameOfLife';
import './App.css';

const ROWS = 30;
const COLS = 50;

function App() {
  const [grid, setGrid] = useState(() => createEmptyGrid(ROWS, COLS));
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(300);
  const [generation, setGeneration] = useState(0);
  const runningRef = useRef(isRunning);
  runningRef.current = isRunning;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) return;

    setGrid((g) => nextGeneration(g));
    setGeneration((gen) => gen + 1);
    setTimeout(runSimulation, speed);
  }, [speed]);

  const handleToggle = () => {
    setIsRunning(!isRunning);
    if (!isRunning) {
      runningRef.current = true;
      runSimulation();
    }
  };

  const handleStep = () => {
    setGrid((g) => nextGeneration(g));
    setGeneration((gen) => gen + 1);
  };

  const handleClear = () => {
    setGrid(createEmptyGrid(ROWS, COLS));
    setGeneration(0);
    setIsRunning(false);
  };

  const handleRandom = () => {
    setGrid(createRandomGrid(ROWS, COLS));
    setGeneration(0);
  };

  const handleCellClick = (i, j) => {
    const newGrid = grid.map(row => [...row]);
    newGrid[i][j] = newGrid[i][j] ? 0 : 1;
    setGrid(newGrid);
  };

  const handlePatternSelect = (patternName) => {
    const pattern = PATTERNS[patternName];
    const startX = Math.floor(ROWS / 2) - Math.floor(pattern.length / 2);
    const startY = Math.floor(COLS / 2) - Math.floor(pattern[0].length / 2);
    setGrid(placePattern(createEmptyGrid(ROWS, COLS), pattern, startX, startY));
    setGeneration(0);
  };

  return (
    <div className="app">
      <h1>🎮 Game of Life</h1>
      <div className="stats">Поколение: {generation}</div>
      <Controls
        isRunning={isRunning}
        onToggle={handleToggle}
        onStep={handleStep}
        onClear={handleClear}
        onRandom={handleRandom}
        speed={speed}
        onSpeedChange={setSpeed}
      />
      <PatternSelector onSelect={handlePatternSelect} />
      <div className="grid-container">
        <Grid grid={grid} onCellClick={handleCellClick} />
      </div>
    </div>
  );
}

export default App;
