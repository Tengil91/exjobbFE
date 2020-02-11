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
            <div className='ml-20 nav-title'>Schack</div>
          </Link>
          <Link to="/users" style={{display: 'block'}} className='ml-auto'>
            Användare
          </Link>
          {props.loggedIn ? (
            <>
              <Link to={`/user/${props.username}`} className='ml-20 username'>{props.username}</Link>
              <PrimaryButton onClick={logout} className='ml-20'>Logga ut</PrimaryButton>
            </>
          ) : (
            <>
              <PrimaryButtonLink to='/login' className='ml-20'>Logga in</PrimaryButtonLink>
              <PrimaryButtonLink to='/register' className='ml-20'>Registrera dig</PrimaryButtonLink>
            </>
          )}
        </div>
    </nav>
  );
}