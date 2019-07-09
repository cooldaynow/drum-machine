import React from 'react';
import './index.scss';

function Volume({disabled, handle,defaultValue}) {
  return (
    <div className='wrap__volume'>
      <input
        className="volume"
        type="range"
        min="0"
        max="1"
        step="0.01"
        id='vol'
        defaultValue={defaultValue}
        disabled = {disabled}
        onChange ={handle} 
      />
    </div>
  );
}

export default Volume;
