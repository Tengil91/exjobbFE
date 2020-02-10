import React from 'react';
import PrimaryButton from './PrimaryButton';

export default (props) => {
  let attemptRegister = e => {
    e.preventDefault();
    //vertifiera i BE
    let data = {
      username: document.getElementById('username-input').value,
      password: document.getElementById('password-input').value
    }
    props.socket.emit('register', data);
    //kanske lägga in en spinner i knappen?
  }


  return (
    <div>
      register
      <form onSubmit={attemptRegister}>
        <input type="text" placeholder='Användarnamn...' className='form-control mb-5' id='username-input' />
        <input type="password" placeholder='Lösenord...' className='form-control mb-5' id='password-input' />
        <PrimaryButton>Registrera dig</PrimaryButton>
      </form>
    </div>
  );
}