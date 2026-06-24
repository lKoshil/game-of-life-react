import React from 'react';

const Controls = ({ isRunning, onToggle, onStep, onClear, onRandom, speed, onSpeedChange }) => {
  return (
    <div className="controls">
      <button onClick={onToggle} className="btn btn-primary">
        {isRunning ? '⏸ Пауза' : '▶ Старт'}
      </button>
      <button onClick={onStep} disabled={isRunning} className="btn">
         Шаг
      </button>
      <button onClick={onRandom} className="btn">
        🎲 Случайно
      </button>
      <button onClick={onClear} className="btn btn-danger">
        🗑 Очистить
      </button>
      <div className="speed-control">
        <label>Скорость: {speed} мс</label>
        <input
          type="range"
          min="50"
          max="1000"
          step="50"
          value={1050 - speed}
          onChange={(e) => onSpeedChange(1050 - Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default Controls;