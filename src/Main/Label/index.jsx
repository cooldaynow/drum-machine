import React from 'react';
import './index.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFreeCodeCamp} from '@fortawesome/free-brands-svg-icons';

const Label = () => {
  return (
    <div className="label">
        FCC
        <FontAwesomeIcon icon={faFreeCodeCamp} />
    </div>
  );
};

export default Label;
