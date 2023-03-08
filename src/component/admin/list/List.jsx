import React from 'react';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import UserTable from '../usertable/UserTable';
import "./list.scss";
import { useNavigate } from "react-router-dom";



const List = ({location}) => {
  const navigate = useNavigate();

const refreshPage = () => {
    navigate(0);
}
  refreshPage();
  return (
    <div className='list'>
          <Sidebar />
      <div className='listContainer'>
          <Navbar />
          <div className='tableWrapper'>
          <UserTable location={location} />

          </div>
      </div>
    </div>
  )
}

export default List