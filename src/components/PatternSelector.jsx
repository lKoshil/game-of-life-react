import React from 'react';
import { PATTERNS } from '../utils/gameOfLife';

const PatternSelector = ({ onSelect }) => {
  return (
    <div className="patterns">
      <h3>Пресеты:</h3>
      <div className="pattern-buttons">
        {Object.keys(PATTERNS).map((name) => (
          <button key={name} onClick={() => onSelect(name)} className="btn btn-pattern">
            {name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PatternSelector;