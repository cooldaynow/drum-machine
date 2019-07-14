import React from 'react';
import './index.scss';

const DrumPad = ({
  children,
  bank,
  power,
  press,
  pressValue,
  buttons,
  handleButtons,
  play
}) => {
  return (
    <div className="wrap__pad">
      <div className="drum__pad">
        {['Q','W','E','A','S','D', 'Z', 'X', 'C'].map((e, i ) => (
          <button 
            className = {press && e === pressValue ? 'buttons press' : 'buttons'} 
            id={e}
            key={i+e}
            onClick={power ? play : undefined } >
            {e}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DrumPad;
