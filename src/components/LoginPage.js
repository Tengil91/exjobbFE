import React from 'react';
import { connect } from 'react-redux';

import PrimaryButton from './PrimaryButton';

import { loginErrorAction } from '../redux/actions/actions';

const mapStateToProps = state => ({
  loginError: state.loginError
});

const mapDispatchToProps = { loginErrorAction };

let LoginPage = (props) => {
  let attemptLogin = e => {
    e.preventDefault();
    let data = {
      username: document.getElementById('username-input').value,
      password: document.getElementById('password-input').value
    }
    document.getElementById('password-input').value = '';
    props.socket.emit('login', data);
  }
  let removeError = () => {
    props.loginErrorAction({loginError: null});
  }

  return (
    <div>
      <h3>Logga in</h3>
      <form onSubmit={attemptLogin}>
        <input type="text" placeholder='Användarnamn...' className='form-control mb-5' id='username-input' onKeyDown={removeError} />
        <input type="password" placeholder='Lösenord...' className='form-control mb-5' id='password-input' onKeyDown={removeError} />
        <PrimaryButton>Logga in</PrimaryButton>
      </form>
      {
        props.loginError && <p className='text-error'>{props.loginError}</p>
      }
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);