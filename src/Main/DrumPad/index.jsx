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
}) => {
  let renderButtons = function() {
    let src = 'https://s3.amazonaws.com/freecodecamp/drums/';
    return buttons.map((e, i) => {
      return (
        <button
          className={
            press && e.value === pressValue ? 'buttons press' : 'buttons'
          }
          id={bank ? e.pianoName : e.drumName}
          key={i + e.value}
          onClick={power ? handleButtons : undefined}>
          <audio id={e.value} src={bank ? src + e.piano : src + e.drum} />
          {e.value}
        </button>
      );
    });
  };
  return (
    <div className="wrap__pad">
      <div className="drum__pad">{renderButtons()}</div>
    </div>
  );
};

export default DrumPad;
