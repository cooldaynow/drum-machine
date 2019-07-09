import React from 'react';
import './index.scss';
import ToggleSwitch from '../ToggleSwitch';
import Volume from '../Volume';

function RightSide({
  power,
  name,
  switchPower,
  switchTool,
  changeVolume,
  defaultVolume,
  bank,
}) {

  return (
    <div className="right__side">
      <div className="drum__panel">
        <ToggleSwitch name="Power" toggle={power} handle={switchPower} />
        <div className="screen">{name}</div>
        <Volume
          disabled={!power}
          handle={changeVolume}
          defaultValue={defaultVolume}
        />
        <ToggleSwitch
          name="Bank"
          handle={power ? switchTool : undefined}
          toggle={bank}
        />
      </div>
    </div>
  );
}

export default RightSide;
