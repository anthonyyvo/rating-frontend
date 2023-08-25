import React, { useContext, useEffect, useState } from 'react';
import { LangContext } from '../../context/languageContext/langContext';
import './widgetItem.scss'
import { CurrentContext } from '../../context/currentContext/currentContext';

function WidgetItem({position , child, haveButton=true}) {
    const [currentPosition, setCurrentPosition] = useState('');
    const {langs} = useContext(LangContext);
    const {current, dispatch: currentDispatch} = useContext(CurrentContext);

    useEffect(()=> {
        if (current.currentItem === position) {
            setCurrentPosition('center');
        } else if (current.currentItem < position || parseInt(current.currentItem - position) > 1) {
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
    <div className='footer '>
    {/* {
        haveButton && (
            <button className='nextButton' onClick={(e)=> {
                if (position === 3) {
                    console.log('send data')
                }
                currentDispatch({type: "FORWARD"});
            }}>{
        langs.lang==="eng" && "NEXT"
    }
    {
        langs.lang==="vi" && "TIẾP THEO"
    }
    </button>
        )
    } */}
    
    </div>
    </div>
  )
}

export default WidgetItem