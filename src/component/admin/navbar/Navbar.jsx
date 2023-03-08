import React from 'react';
import "./navbar.scss";
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';

const Navbar = () => {
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
            <AccountCircleIcon className='icon' />
            <div className='counter'>1</div>
            Profile
          </div>
          <div className='item'>
            <img
              className='avatar'
              src="https://images.theconversation.com/files/501182/original/file-20221214-14389-tahjkr.jpg?ixlib=rb-1.1.0&q=30&auto=format&w=600&h=883&fit=crop&dpr=2"
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