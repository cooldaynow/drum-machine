import React from 'react';
import './index.scss';

function LeftSide({bank, power, press, pressValue, buttons, handleButtons}) {
  let renderButtons = function() {
    let src = 'https://s3.amazonaws.com/freecodecamp/drums/';
    return buttons.map((but, i) => {
      return (
        <button
          className={
            press && but.value === pressValue ? 'buttons press' : 'buttons'
          }
          id={bank ? but.pianoName : but.drumName}
          key={i + but.value}
          onClick={power ? handleButtons : undefined}>
          <audio id={but.value} src={bank ? src + but.piano : src + but.drum} />
          {but.value}
        </button>
      );
    });
  };
  return (
    <div className="left__side">
      <div className="drum__pad">{renderButtons()}</div>
    </div>
  );
}

export default LeftSide;
