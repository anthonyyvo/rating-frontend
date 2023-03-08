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


function Widgets({ length }) {
    const [currentItem, setCurrentItem] = useState(0);
    const items = length - 1;
    const {state: sendState} = useContext(SendDataContext);


    const handlePosition = (position) => {
        if (position < items) {
            setCurrentItem(position + 1);
        } else if (currentItem >= items) {
            setCurrentItem(0)
        }
    }
    const checkPosition = (next) => {
        if (currentItem < items && next) {
            setCurrentItem(currentItem + 1);
        } 
        else if (currentItem > 0 && !next) {
            setCurrentItem(currentItem -1);
        } 
        else if (currentItem >= items  && next ) {
            setCurrentItem(0)
        }
        else if (currentItem <= 0  && !next ) {
            setCurrentItem(items)
        }
    }
    useEffect(() => {
        console.log(currentItem);
        console.log(sendState);
    }, [currentItem])

    return (
        <div className='widgets'>
            <div className='top'>
            <WidgetItem haveButton={false} child={<Satisfied position={0} handlePosition={handlePosition}/>} position={0} current={currentItem} handlePosition={handlePosition} />
                <WidgetItem haveButton={false} position={1} child={<Likely position={1}  handlePosition={handlePosition}/>}  current={currentItem} handlePosition={handlePosition}/>
                <WidgetItem child={<Question position={2}  handlePosition={handlePosition} />} position={2} current={currentItem} handlePosition={handlePosition} />
                <WidgetItem haveButton={false} child={<Rating position={3}  handlePosition={handlePosition}/>} position={3} current={currentItem} handlePosition={handlePosition} />
                <WidgetItem haveButton={false} child={<Final position={4}  handlePosition={handlePosition}/>} position={4} current={currentItem} handlePosition={handlePosition} />


            </div>

            <div className='bottom'>
                <button className='next' onClick={() => { checkPosition(false) }}><ArrowBackIosIcon /></button>
                <button className='back' onClick={() => { checkPosition(true) }}><ArrowForwardIosIcon /></button>

            </div>


        </div>
    )
}

export default Widgets