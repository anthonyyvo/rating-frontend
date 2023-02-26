import React, { useContext, useEffect, useReducer } from 'react';
import { DataContext, DataDispatchContext } from '../../context/dataContext/dataContext';
import { dataContextReducer } from '../../context/dataContext/dataContextReducer';
import { LangContext } from '../../context/languageContext/langContext';
import './question.scss';

function Question() {
  const {dispatch} = useContext(DataContext);
  const {state} = useContext(DataContext)
  const {langs} = useContext(LangContext);

  useEffect(()=> {
    console.log(state);
    console.log(langs);
  }, [state])
  return (
    <div className='question'>
        <div className='header'>
            <h2>
            {
              langs.lang === "eng" && "What changes would this brand have to make for you to give it a higher rating?"
            }
            {langs.lang === "vi" && "Bạn thấy Phòng khám cần có những thay đổi gì để bạn đánh giá cao hơn?"}
            </h2>
        </div>
        <div className='body'>
            <textarea id="answerText" placeholder='Type here ...' onChange={(e)=>dispatch({type: 'QUESTION', payload: e.target.value})}></textarea>
        </div>
    </div>
  )
}

export default Question