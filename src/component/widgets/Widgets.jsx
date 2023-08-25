import React, { useContext, useEffect, useState } from 'react';
import Question from '../question/Question';
import Rating from '../rating/Rating';
import WidgetItem from '../widgetItem/WidgetItem';
import './widgets.scss';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Likely from '../likely/Likely';
import Final from '../final/Final';
import Satisfied from '../satisfied/Satisfied';
import { SendDataContext } from '../../context/sendDataContext/SendDataContext';
import { CurrentContext } from '../../context/currentContext/currentContext';
import slidesList from '../../libs/data';
import Choosing from '../choosing/Choosing';

function Widgets({ length }) {
    const [currentItem, setCurrentItem] = useState(0);
    const {state: sendState} = useContext(SendDataContext);
    const {current, dispatch } = useContext(CurrentContext);
    const items = current.itemsLength - 1;

    const handlePosition = (position) => {
        if (position < items) {
            setCurrentItem(position + 1);
        } else if (currentItem >= items) {
            setCurrentItem(0)
        }
    }
    const nextPosition = (forward) => {
            if (forward) {
                dispatch({type: "FORWARD"});
            } else {
                dispatch({type: "BACKWARD"});
            }
    }
    
    useEffect(() => {
        handlePosition(currentItem)
    }, [current.currentItem])

    const slideComponents = {
        satisfied: <Satisfied position={0}/>,
        choosing: <Choosing position={1} />,
        likely: <Likely position={2}/>,
        // rating: <Rating position={3}/>,
        question: <Question position={3}/>,
        final: <Final position={4}/>
    }
    
    
    return (
        <div className='widgets first-letter:'>
            <div className='top'>
            {/* <WidgetItem haveButton={false} child={<Satisfied position={0} handlePosition={handlePosition}/>} position={0}  handlePosition={handlePosition} />
                <WidgetItem haveButton={false} position={1} child={<Likely position={1}  handlePosition={handlePosition}/>}   handlePosition={handlePosition}/>
                <WidgetItem child={<Question position={1}  handlePosition={handlePosition} />} position={1} current={currentItem} handlePosition={handlePosition} />
                <WidgetItem haveButton={false} child={<Rating position={2}  handlePosition={handlePosition}/>} position={2}  handlePosition={handlePosition} />
                <WidgetItem haveButton={false} child={<Final position={3}  handlePosition={handlePosition}/>} position={3}  handlePosition={handlePosition} /> */}
            {
                Object.keys(slidesList).map((key, i) => {
                    const Component = slideComponents[key];
                    return (
                    <WidgetItem 
                    key={i} 
                    haveButton={true} 
                    position={i} 
                    child={Component}   
                    handlePosition={handlePosition}/>
                    )
                }
                )
            }
            </div>
            <div className='bottom'>
                <button className='next' onClick={() => { nextPosition(false) }}><ArrowBackIosIcon /></button>
                <button className='back' onClick={() => { nextPosition(true) }}><ArrowForwardIosIcon /></button>
            </div>
        </div>
    )
}

export default Widgets