import React from 'react';
import logo from "../assets/bluetooth_avec_noir-removebg.png"; 
import { useDate } from './UseDate.jsx';
import './Header.css';
import user from "../assets/user (1).png";

function Header({ navigateTo }) {
  const { date, time } = useDate();

  const handleAccountClick = () => {
    navigateTo('account');
  };

  const handleLogout = () => {
    navigateTo('login'); 
  };

  return (
    <div>
      <header className='nav'>
        <div className="nav-logo">
          <img title="Taksentina" src={logo} alt="Logo" />
          <a href="#" title="Taksentina" className='nav-name'>
            Taksantina
          </a>
        </div>
        <div className="nav-time-date">
          <div className='nav-time'>{time}</div>
          <div className='nav-date'>{date}</div>
        </div>
        <div className="nav-link">
          <a className='nav-link1' href=''>
            Home
          </a>
          <a className='nav-link2' href='#'>
            About
          </a>
          <a className='nav-link3' href='#'>
            Contact
          </a>
        </div>
        <div className='nav-menu'>
           
          <a title="Account" className='nav-account' onClick={handleAccountClick}>
          <img src={user} alt="avatar_account" />
          </a>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>
    </div>
  );
}

export default Header;


