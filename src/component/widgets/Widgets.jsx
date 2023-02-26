import React, { useEffect, useState } from 'react';
import Question from '../question/Question';
import Rating from '../rating/Rating';
import WidgetItem from '../widgetItem/WidgetItem';
import './widgets.scss';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Likely from '../likely/Likely';
import Final from '../final/Final';


function Widgets({ length }) {
    const [currentItem, setCurrentItem] = useState(0);
    const items = length - 1;
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
        console.log(currentItem)
    }
    useEffect(() => {
        console.log(currentItem)
    }, [currentItem])

    return (
        <div className='widgets'>
            <div className='top'>
                <WidgetItem child={<Likely />} position={0} current={currentItem} handlePosition={handlePosition} />
                <WidgetItem child={<Question />} position={1} current={currentItem} handlePosition={handlePosition} />
                <WidgetItem child={<Rating />} position={2} current={currentItem} handlePosition={handlePosition} />
                <WidgetItem haveButton={false} child={<Final />} position={3} current={currentItem} handlePosition={handlePosition} />

            </div>

            <div className='bottom'>
                <button className='next' onClick={() => { checkPosition(false) }}><ArrowBackIosIcon /></button>
                <button className='back' onClick={() => { checkPosition(true) }}><ArrowForwardIosIcon /></button>

            </div>


        </div>
    )
}

export default Widgets