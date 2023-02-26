import React, { useContext, useState } from 'react';
import { DataContext } from '../../context/dataContext/dataContext';
import './likely.scss';
import { DataContextActions } from '../../context/dataContext/dataContextActions';
import { LangContext } from '../../context/languageContext/langContext';


function Likely() {
    const {dispatch} =  useContext(DataContext);
    const [score, setScore] = useState(null);
    const {langs} = useContext(LangContext);
    const handleScore = (num) => {
        if (num === score) {
            setScore(null);
            dispatch({
                type: DataContextActions.LIKELY,
                payload: null
            })
        } else {
            setScore(num);
            dispatch({
                type: DataContextActions.LIKELY,
                payload: num
            })
        }
    }
  return (
<div className='likely'>
        <div className='header'>
            <h2>
            {langs.lang==="eng" && "How likely is it that you would recommend this company to a friend or colleague?"}
            {langs.lang==="vi" && "Có bao nhiêu khả năng bạn sẽ giới thiệu phòng khám chúng tôi cho bạn bè hoặc đồng nghiệp?"}

            </h2>
        </div>
        <div className='body'>
            <div className='title'>
            <span>NOT AT ALL LIKELY</span>
            <span>EXTREMELY LIKELY</span>
            </div>
            <div className='scoreWrap'>
                <div onClick={()=> {handleScore(0)}} className={`score ${score === 0 && 'active'}`}>0</div>
                <div onClick={()=> {handleScore(1)}} className={`score ${score === 1 && 'active'}`}>1</div>
                <div onClick={()=> {handleScore(2)}} className={`score ${score === 2 && 'active'}`}>2</div>
                <div onClick={()=> {handleScore(3)}} className={`score ${score === 3 && 'active'}`}>3</div>
                <div onClick={()=> {handleScore(4)}} className={`score ${score === 4 && 'active'}`}>4</div>
                <div onClick={()=> {handleScore(5)}} className={`score ${score === 5 && 'active'}`}>5</div>
                <div onClick={()=> {handleScore(6)}} className={`score ${score === 6 && 'active'}`}>6</div>
                <div onClick={()=> {handleScore(7)}} className={`score ${score === 7 && 'active'}`}>7</div>
                <div onClick={()=> {handleScore(8)}} className={`score ${score === 8 && 'active'}`}>8</div>
                <div onClick={()=> {handleScore(9)}} className={`score ${score === 9 && 'active'}`}>9</div>
                <div onClick={()=> {handleScore(10)}} className={`score ${score === 10 && 'active'}`}>10</div>



            </div>

        </div>
    </div>  )
}

export default Likely