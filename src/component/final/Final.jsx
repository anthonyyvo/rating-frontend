import React from 'react';
import './final.scss';
import qrd1 from '../../images/frame-d1.png';
function Final() {
  return (
    <div className='final'>
        <div className='thank'>
            THANK YOU FOR YOUR TIME
        </div>
        <div className='rateGoogle'>
        <p className='title'>CAN YOU SHARE YOUR VOTE FOR COMMUNITY (ON GOOGLE MAP)?</p>
            <img src={qrd1} />
        </div>
    </div>
  )
}

export default Final