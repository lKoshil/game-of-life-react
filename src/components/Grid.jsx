import React from 'react';

const Grid = ({ grid, onCellClick }) => {
  return (
    <div
      className="grid"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${grid[0].length}, 20px)`,
        gap: '1px',
      }}
    >
      {grid.map((row, i) =>
        row.map((cell, j) => (
          <div
            key={`${i}-${j}`}
            className={`cell ${cell ? 'alive' : 'dead'}`}
            onClick={() => onCellClick(i, j)}
          />
        ))
      )}
    </div>
  );
};

export default Grid;