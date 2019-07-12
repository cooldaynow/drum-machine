import React from 'react';
import './index.scss';
import {URL} from '../../constants';

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
        {/*buttons.map((e, i) => (
          <button
            className={
              press && e.value === pressValue ? 'buttons press' : 'buttons'
            }
            id={bank ? e.pianoName : e.drumName}
            key={i + e.value}
            onClick={power ? handleButtons : undefined}>
            <audio id={e.value} src={bank ? URL + e.piano : URL + e.drum} />
            {e.value}
          </button>
        ))*/}
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
