import React, { useContext, useEffect, useState } from 'react';
import { LangContext } from '../../context/languageContext/langContext';
import './widgetItem.scss'

function WidgetItem({handlePosition, position , current, child, haveButton=true}) {
    const [currentPosition, setCurrentPosition] = useState('');
    const {langs} = useContext(LangContext);

    useEffect(()=> {
        if (current === position) {
            setCurrentPosition('center');
        } else if (current < position || parseInt(current - position) > 1) {
            setCurrentPosition('right');
        } else {
            setCurrentPosition('left');
        }

    }, [current])

  return (
    <div className={`widgetItem ${currentPosition}`}>
    <div className='main'>
    {child}
    </div>
    <div className='footer'>
    {
        haveButton && (
            <button className='nextButton' onClick={(e)=> {handlePosition(position)}}>{
        langs.lang==="eng" && "NEXT"
    }
    {
        langs.lang==="vi" && "TIẾP THEO"
    }
    </button>
        )
    }
    
    </div>
    </div>
  )
}

export default WidgetItem