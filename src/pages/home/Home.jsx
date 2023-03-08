import React, { useContext, useEffect, useState } from 'react';
import Widgets from '../../component/widgets/Widgets';
import './home.scss';
import LanguageIcon from '@mui/icons-material/Language';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { LangContext } from '../../context/languageContext/langContext';
import { DataContext } from '../../context/dataContext/dataContext';
import { DataContextActions } from '../../context/dataContext/dataContextActions';
import { LoginContext } from '../../context/loginContext/Context';

function Home() {
  const { langs } = useContext(LangContext);
  const { dispatch } = useContext(LangContext);
  const {state, dispatch: dispatchData} = useContext(DataContext)
  const [location, setLocation] = useState(state.location)
  const [menu, setMenu] = useState(false)
  useEffect(() => {

  }, [])
  const handleLocation = (loc) => {
    setLocation(loc);
    setMenu(false);
    dispatchData({
      type: DataContextActions.LOCATION,
      payload: loc
    }, [])
  }
  return (
    <div className='home'>
      <div className={`locationMenu ${menu && 'show'}`}>
        <ArrowDropDownIcon onClick={e=>{setMenu(!menu)}}/>
        <div className='dropWrapper'>
          <span className={location === 7 && 'active'} onClick={e=>{handleLocation(7)}}>Eden D7</span>
          <span className={location === 1 && 'active'} onClick={e=>{handleLocation(1)}}>Eden D1</span>
        </div>

      </div>
      <div className='langs'>
        <LanguageIcon />
        <span className={`langItem ${langs.lang === "eng" ? "active" : ""}`}
          onClick={() => { dispatch({ type: "ENGLISH" }) }}>ENG</span>
        <span className={`langItem ${langs.lang === "vi" ? "active" : ""}`}
          onClick={() => { dispatch({ type: "VIETNAMESE" }) }}>VI</span>
      </div>
      <Widgets length={5} />
    </div>
  )
}

export default Home