import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import logo from '../chessLogo.png';

import PrimaryButton from './PrimaryButton';
import PrimaryButtonLink from './PrimaryButtonLink';

export default (props) => {
  const [checked, setChecked] = useState(false);
  const [clicked, setClicked] = useState(false);
  let clickListener = (e) => {
    if(!clicked && checked){
      setChecked(!checked);
    }
    setClicked(false);
  }
  useEffect(() => {
    window.addEventListener('click', clickListener);
    return () => {
      window.removeEventListener('click', clickListener);
    }
  })
  let logout = e => {
    props.socket.emit('logout', null);
  }
  return (
    <div style={{position: 'fixed', width: '100vw'}}>
      <nav className='nav p-5 small-visible'>
          <div className='d-flex align-center'>
            <Link to="/" style={{display: 'block'}} className='nav-logo'>
              <img src={logo} alt="logo" />
            </Link>
            <Link to="/" style={{display: 'block'}}>
              <div className='mr-20 nav-title'>Schack</div>
            </Link>
            <Link to="/users" style={{display: 'block'}} className='ml-auto mr-20'>
              Användare
            </Link>
            {props.loggedIn ? (
              <>
                <Link to={`/user/${props.username}`} className='mr-20 username'>{props.username}</Link>
                <PrimaryButton onClick={logout} className='mr-20'>Logga ut</PrimaryButton>
              </>
            ) : (
              <>
                <PrimaryButtonLink to='/login' className='mr-20'>Logga in</PrimaryButtonLink>
                <PrimaryButtonLink to='/register' className='mr-20'>Registrera dig</PrimaryButtonLink>
              </>
            )}
          </div>
      </nav>
      <nav className="d-flex align-center nav p-5 big-visible">

        <Link to="/" style={{display: 'block'}} className='nav-logo'>
          <img src={logo} alt="logo" />
        </Link>
        <Link to="/" style={{display: 'block'}}>
          <div className='ml-20 nav-title'>Schack</div>
        </Link>
        <div id="menuToggle" className="ml-auto mr-10">
          <input type="checkbox" id='nav-checkbox' checked={checked} onChange={() => {
            setChecked(!checked);
            setClicked(true);
          }} />
          <span></span>
          <span></span>
          <span></span>
          <ul id="menu" className='nav'>
            <li><Link to="/users" className='ml-auto'>
              Användare
            </Link></li>
            {props.loggedIn ? (
              <>
                <li><Link to={`/user/${props.username}`} className='username'>{props.username}</Link></li>
                <li><PrimaryButton onClick={logout}>Logga ut</PrimaryButton></li>
              </>
            ) : (
              <>
                <li><PrimaryButtonLink to='/login'>Logga in</PrimaryButtonLink></li>
                <li><PrimaryButtonLink to='/register'>Registrera dig</PrimaryButtonLink></li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>

  );
}