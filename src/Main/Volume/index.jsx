import React from 'react';
import './index.scss';

function Volume({volume, disabled}) {
  return (
    <div className='wrap__volume'>
      <input
        className="volume"
        type="range"
        min="0"
        max="1"
        step="0.01"
        defaultValue={volume}
        disabled = {disabled}
      />
    </div>
  );
}

export default Volume;
