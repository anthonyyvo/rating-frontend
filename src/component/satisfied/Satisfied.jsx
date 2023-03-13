import React, { useContext, useState } from 'react';
import './satisfied.scss';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentVerySatisfiedSharpIcon from '@mui/icons-material/SentimentVerySatisfiedSharp';
import { LangContext } from '../../context/languageContext/langContext';
import { DataContext } from '../../context/dataContext/dataContext';
import { DataContextActions } from '../../context/dataContext/dataContextActions';


function Satisfied({position, handlePosition}) {
    const {langs} = useContext(LangContext);
    const {dispatch} =  useContext(DataContext);
    const [score, setScore] = useState(null);

    const handleScore = (i) => {
        if (i === score) {
            setScore(null);
        } else {
            setScore(i);
            handlePosition(position);
            dispatch({
                type: DataContextActions.SATISFIED,
                payload: i
            })
        }
    }
    return (
        <div className='satisfied'>
            <div className='iconWrap'>
                    <SentimentVeryDissatisfiedIcon onClick={()=>{handleScore(0)}} className='icon' style={{ fontSize: 60 }}/>
                    <SentimentDissatisfiedIcon onClick={()=>{handleScore(1)}} className='icon' style={{ fontSize: 60 }}/>
                    <SentimentSatisfiedIcon onClick={()=>{handleScore(2)}} className='icon' style={{ fontSize: 60 }}/>
                    <InsertEmoticonIcon onClick={()=>{handleScore(3)}} className='icon' style={{ fontSize: 60 }}/>
                    <SentimentVerySatisfiedSharpIcon onClick={()=>{handleScore(4)}} className='icon' style={{ fontSize: 60, color: 'green' }}/>

            </div>
            <div className='bottom'>
                <h2 className='title'>

            {langs.lang==="eng" && "How satisfied are you with our services?"}
            {langs.lang==="vi" && "Bạn có hài lòng về dịch vụ của EDEN?"}
            </h2>
            </div>


        </div>)
}

export default Satisfied