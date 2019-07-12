import React from 'react';
import './index.scss';
import ToggleSwitch from '../ToggleSwitch';
import Volume from '../Volume';
import Label from '../Label';

const DrumPanel = ({
  power,
  screen,
  switchPower,
  switchTool,
  changeVolume,
  defaultVolume,
  bank,
}) => {
  return (
    <div className="wrap__panel">
      <div className="drum__panel">
        <Label />
        <ToggleSwitch name="Power" toggle={power} handle={switchPower} />
        <div className="screen">{screen}</div>
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
};

export default DrumPanel;
