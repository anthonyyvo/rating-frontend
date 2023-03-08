import React, { useContext } from 'react';
import './sidebar.scss';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BusinessIcon from '@mui/icons-material/Business';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import PeopleIcon from '@mui/icons-material/People';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { Location } from 'react-router';
import { useNavigate } from 'react-router'
import { LoginContext } from '../../../context/loginContext/Context';

const Sidebar = () => {
    const navigate = useNavigate();
    const {dispatch} = useContext(LoginContext);
    const handleLogOut = () => {
        dispatch({type: "LOG_OUT"});
        navigate('/login')
      }
    return (
        <div className='sidebar'>
            <div className='top'>
                <div className='logo'>
                    CSKH EDEN
                </div>
            </div>
            <div className='center'>
                <ul>
                    <p className='title'>USEFUL</p>
                    <li >
                        <Link to={"/admin/list"} >
                            <PeopleIcon className='icon' />
                            <span>ALL RATING</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/admin/q1"}>
                            <BusinessIcon className='icon' />
                            <span>EDEN D1</span>
                        </Link>

                    </li>
                    <li>
                        <Link to={"/admin/q7"}>
                            <BusinessIcon className='icon' />
                            <span>EDEN D7</span>
                        </Link>

                    </li>
                    <li>
                        <Link to={"/admin/time"}>
                            <DashboardIcon className='icon' />
                            <span>TIME</span>
                        </Link>

                    </li>
                    <li>
                        <QueryStatsIcon className='icon' />
                        <span>STATS</span>
                    </li>
                    <p className='title'>USER</p>

                    <li>
                        <AccountCircleIcon className='icon' />
                        <span>Profile</span>
                    </li>
                    <li>
                        <SettingsIcon className='icon' />
                        <span>Setting</span>
                    </li>
                    <li onClick={()=> {handleLogOut()}}>
                        <LogoutIcon  className='icon' />
                        <span>Logout</span>
                    </li>

                </ul>
            </div>
            <div className='bottom'>
                <div className='colorOption' ></div>
                <div className='colorOption'></div>

            </div>

        </div>
    )
}

export default Sidebar