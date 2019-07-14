import React from 'react';
import './index.scss';

const Volume = ({disabled, handle,defaultValue}) => (
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

export default Volume;
