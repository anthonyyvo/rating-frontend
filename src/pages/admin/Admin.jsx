import React from 'react';
import './admin.scss';
import Sidebar from '../../component/admin/sidebar/Sidebar';
import Navbar from '../../component/admin/navbar/Navbar';
import Widget from '../../component/admin/widget/Widget';

function Admin() {
  return (
<div className='admin'>
      <Sidebar />
      <div className='homeContainer'>
        <Navbar />
        <div className='adminWidgets'>
          <Widget type="user" />
          <Widget />
          <Widget />

        

        </div>
        <div className='charts'>
          {/* <Featured />
          <Chart /> */}
        </div>
        <div className='listContainer'>
          <div className='listTitle'>
            Lastest transactions
          </div>
        </div>
      </div>
    </div>  )
}

export default Admin