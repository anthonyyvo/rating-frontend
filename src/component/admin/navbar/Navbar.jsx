import React, { useContext } from 'react';
import "./navbar.scss";
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';
import { LoginContext } from '../../../context/loginContext/Context';

const Navbar = () => {
  const {user} = useContext(LoginContext);
  const PF =  "http://localhost:5000/images/";

  return (
    <div className='navbar'>
      <div className='wrapper'>
        <div className='inputSearch'>
          <input type="text" placeholder='Search'></input>
          <SearchIcon className='icon' />
        </div>
        <div className='items'>
          <div className='item'>
            <LanguageIcon className='icon' />
            English
          </div>
          <div className='item'>
            <SettingsIcon className='icon' />
            Settings
          </div>
          <div className='item'>
            <Link to="/admin/profile">
            <AccountCircleIcon className='icon' />
            <div className='counter'>1</div>
            {user.displayName ? user.displayName : user.username}
            </Link>
          </div>
          <div className='item'>
            <img
              className='avatar'
              src={PF + user.profilePicture}
              width="30px"
              height="30px"
            />
          </div>
        </div>


      </div>

    </div>
  )
}

export default Navbar