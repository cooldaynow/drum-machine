import React from 'react';
import styles from './index.scss';

const Audio = React.forwardRef(({src}, ref) => (
    <audio id = 'trackId' ref = {ref}  src = {src}></audio>
));


export default Audio ;
