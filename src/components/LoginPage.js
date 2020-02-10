import React from 'react';
import PrimaryButton from './PrimaryButton';

export default (props) => {
  let attemptLogin = e => {
    e.preventDefault();
    let data = {
      username: document.getElementById('username-input').value,
      password: document.getElementById('password-input').value
    }
    props.socket.emit('login', data);
    //kanske lägga in en spinner i knappen?
  }


  return (
    <div>
      login
      <form onSubmit={attemptLogin}>
        <input type="text" placeholder='Användarnamn...' className='form-control mb-5' id='username-input' />
        <input type="password" placeholder='Lösenord...' className='form-control mb-5' id='password-input' />
        <PrimaryButton>Logga in</PrimaryButton>
      </form>
    </div>
  );
}