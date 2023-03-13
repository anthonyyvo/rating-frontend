import React, { useEffect, useState } from 'react'
import './widget.scss';
import PeopleIcon from '@mui/icons-material/People';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'; 
import axios from 'axios';
import { Link } from 'react-router-dom';
const Widget = ({type}) => {
  const [data, setData] = useState();

  useEffect(() => {
    let urlRes = `${process.env.REACT_APP_SERVER}/rating?day=7`
    axios.get(urlRes)
    .then(res => {
      switch (type) {
        case "location-1":
          const data1 = res.data.reduce((acc, c, i) => {
            if (c.location === 1) {
              acc.push(c);
            };
            return acc
          }, [])
          setData({
            title: "RATING EDEN D1 THIS WEEK",
            link: "See all rating",
            href: "/admin/q1",
            count: data1.length,
            icon: <PeopleIcon />
          })
          break;
        case "location-7":
          const data7 = res.data.reduce((acc, c, i) => {
            if (c.location === 7) {
              acc.push(c);
            };
            return acc
          }, [])
          setData({
            title: "RATING EDEN D7 THIS WEEK",
            link: "See all rating",
            href: "/admin/q7",
            count: data7.length,
            icon: <PeopleIcon />
          })
          break;
        default:
          setData({
            title: "ALL",
            link: "See all rating",
            href: "/admin/list",          })
      }
    })
    
  }, [])
  

  return (
    <div className='adminWidget'>
        <div className='left'>
            <span className='title'>{data?.title}</span>
            <span className='counter'>{data?.count}</span>
            <span className='link'>
            <Link to={data?.href}>
            {data?.link}
            </Link>
            </span>

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