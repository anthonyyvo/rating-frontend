import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import UserTable from '../usertable/UserTable';
import "./time.scss";
import { useNavigate } from "react-router-dom";



const Time = () => {
  const [days , setDays] = useState(7);


const handelDays =  (e) => {
  // refreshPage();
   setDays(e);

}
  return (
    <div className='time'>
          <Sidebar />
      <div className='listContainer'>
          <Navbar />
          <div className='tableWrapper'>
          <div className='navTime'>
            <span>NEAREST:</span>
            <button className='active' onClick={()=>handelDays(1)}>1 Days</button>
            <button onClick={()=>handelDays(3)}>3 Days</button>
            <button onClick={()=>handelDays(7)}>7 Days</button>
            <button onClick={()=>handelDays(30)}>30 Days</button>

          </div>
          <UserTable days={days}/>

          </div>
      </div>
    </div>
  )
}

export default Time