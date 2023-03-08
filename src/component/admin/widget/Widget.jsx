import React from 'react'
import './widget.scss';
import PeopleIcon from '@mui/icons-material/People';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'; 
const Widget = ({type}) => {
  let data;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        icon: <PeopleIcon className='icon' style={{
          backgroundColor: "rgba(0, 128,0, 0.2)",
          color: 'green'

        }}/>
      };
    break;
    default:
    break;
  }

  return (
    <div className='adminWidget'>
        <div className='left'>
            <span className='title'>{data?.title}</span>
            <span className='counter'>12312</span>
            <span className='link'>See all users</span>

        </div>
        <div className='right'>
            <div className='percentage positive'>
            <KeyboardArrowUpIcon />
                20%
            </div>
            {data?.icon}
        </div>
    </div>
  )
}

export default Widget