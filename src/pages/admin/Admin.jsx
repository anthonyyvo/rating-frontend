import React from 'react';
import './admin.scss';
import Sidebar from '../../component/admin/sidebar/Sidebar';
import Navbar from '../../component/admin/navbar/Navbar';
import Widget from '../../component/admin/widget/Widget';
import Chart from '../../component/admin/chart/Chart';

function Admin() {
  return (
    <div className='admin'>
      <Sidebar />
      <div className='homeContainer'>
        <Navbar />
        <div className='adminWidgets'>
          <Widget type='location-1'/>
          <Widget type='location-7' />
          <Widget />



        </div>

        <div className='chartContainer'>
              <Chart location={1} info="rating" />
              <Chart location={7} info="satisfied" />
            
        </div>
      </div>
    </div>)
}

export default Admin