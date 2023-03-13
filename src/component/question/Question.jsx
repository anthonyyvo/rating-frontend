import React, { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { DataContext, DataDispatchContext } from '../../context/dataContext/dataContext';
import { dataContextReducer } from '../../context/dataContext/dataContextReducer';
import { LangContext } from '../../context/languageContext/langContext';
import './question.scss';
const jobs = ['Receptionist', 'Assistant', 'Doctor', 'Security' , 'Customer Service'];
const jobsVi = ['Lễ Tân' , 'Phụ Tá', 'Bác Sĩ', 'Bảo Vệ', 'CSKH'];
function Question({ position, handlePosition }) {
  const { dispatch } = useContext(DataContext);
  const { state } = useContext(DataContext)
  const { langs } = useContext(LangContext);
  const inputRef = useRef();
  
  const [checked, setChecked] = useState(new Array(jobs.length).fill(false));
  const [jobsTitle, setJobsTitle] = useState(jobs) ;

  const handleChecked = (position) => {
    const updateChecked = checked.map((check, index) => 
    index === position ? !check : check
    )
    setChecked(updateChecked);
    dispatch({type: 'POSITION', payload: checked});
  }

  useEffect(() => {
    if (langs.lang === 'vi') {
      setJobsTitle(jobsVi)
    } else if (langs.lang === 'eng') {
      setJobsTitle(jobs)
    }
    dispatch({type: 'POSITION', payload: checked});
  }, [checked, langs])
  return (
    <div className='question'>
      <div className='header'>
        <h2>
          {
            langs.lang === "eng" && "What changes would EDEN have to make for you to give it a higher rating?"
          }
          {langs.lang === "vi" && "Bạn thấy EDEN cần thay đổi gì để bạn đánh giá cao hơn?"}
        </h2>
      </div>
      <div className='body'>
        <div className='checkBoxWrap'>
          {jobsTitle.map((job, index) => (
            <div key={index} className='checkItem'>
            <input type="checkbox" value={job} name={job} onChange={()=>handleChecked(index)} />
            <label htmlFor={job}>{job}</label>
            </div>
          ))}
        </div>
        <textarea ref={inputRef} id="answerText" placeholder={langs.lang === 'eng' ? "Feedback..." : "Góp ý..."} onChange={(e) => dispatch({ type: 'QUESTION', payload: e.target.value })}
          onKeyUp={e => {
            if (e.key === "Enter") {
              handlePosition(position);
              inputRef.current.blur()
            }
          }}
        ></textarea>
      </div>
    </div>
  )
}

export default Question