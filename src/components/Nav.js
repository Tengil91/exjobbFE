import React from 'react';
import logo from '../chessLogo.png';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <nav className='nav p-5'>
        <div className='d-flex align-center'>
          <Link to="/" style={{display: 'block'}} className='nav-logo'>
            <img src={logo} alt="logo" />
          </Link>
          <Link to="/" style={{display: 'block'}}>
            <div className='ml-20'>Schack</div>
          </Link>
        </div>
    </nav>
  );
}