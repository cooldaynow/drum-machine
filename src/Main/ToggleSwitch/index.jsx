import React from 'react';
import './index.scss';

function ToggleSwitch({name, handle, toggle, power}) {
  return (
    <div className="toggle__switch">
      <span>{name}</span>
      <div className="wrap__toggle">
        <div className={toggle ? 'toggle bank' : 'toggle'} onClick={handle} />
      </div>
    </div>
  );
}

export default ToggleSwitch;
