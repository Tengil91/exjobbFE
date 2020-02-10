import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../chessLogo.png';

import PrimaryButton from './PrimaryButton';
import PrimaryButtonLink from './PrimaryButtonLink';

export default (props) => {
  let logout = e => {
    props.socket.emit('logout', null);
  }
  return (
    <nav className='nav p-5'>
        <div className='d-flex align-center'>
          <Link to="/" style={{display: 'block'}} className='nav-logo'>
            <img src={logo} alt="logo" />
          </Link>
          <Link to="/" style={{display: 'block'}}>
            <div className='ml-20'>Schack</div>
          </Link>
          {props.loggedIn ? (
            <>
              
              <span className='ml-auto username'>{props.username}</span>
              <PrimaryButton onClick={logout} className='ml-20'>Logga ut</PrimaryButton>
            </>
          ) : (
            <>
              <PrimaryButtonLink to='/login' className='ml-auto'>Logga in</PrimaryButtonLink>
              <PrimaryButtonLink to='/register' className='ml-20'>Registrera dig</PrimaryButtonLink>
            </>
          )}
        </div>
    </nav>
  );
}