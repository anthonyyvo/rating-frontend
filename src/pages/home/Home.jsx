import React, { useContext, useEffect } from 'react';
import Widgets from '../../component/widgets/Widgets';
import './home.scss';
import LanguageIcon from '@mui/icons-material/Language';
import { LangContext } from '../../context/languageContext/langContext';

function Home() {
  const {langs} = useContext(LangContext);
  const {dispatch} = useContext(LangContext);
  useEffect(() => {

  }, [langs])

  return (
    <div className='home'>
      <div className='langs'>
      <LanguageIcon />
      <span className={`langItem ${langs.lang==="eng" ? "active":""}`}
      onClick={()=>{dispatch({type: "ENGLISH"})}}>ENG</span>
<span className={`langItem ${langs.lang==="vi" ? "active":""}`}
      onClick={()=>{dispatch({type: "VIETNAMESE"})}}>VI</span>
      </div>
        <Widgets length={4} />
    </div>
  )
}

export default Home