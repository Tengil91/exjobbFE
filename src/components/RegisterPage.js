import React from 'react';
import PrimaryButton from './PrimaryButton';
import { connect } from 'react-redux';
import { registerErrorAction } from '../redux/actions/actions';

const mapStateToProps = state => ({
  registerError: state.registerError
});

const mapDispatchToProps = { registerErrorAction };

let RegisterPage = (props) => {
  let attemptRegister = e => {
    e.preventDefault();
    let data = {
      username: document.getElementById('username-input').value,
      password: document.getElementById('password-input').value
    }
    props.socket.emit('register', data);
    document.getElementById('password-input').value = '';
  }
  let removeErrors = () => {
    props.registerErrorAction({registerError: null});
  }
  console.log('registerpage');
  console.log(props);
  return (
    <div>
      <h3>Registrera dig</h3>
      <form onSubmit={attemptRegister}>
        <input type="text" placeholder='Användarnamn...' className='form-control mb-5' id='username-input' onKeyDown={removeErrors} />
        <input type="password" placeholder='Lösenord...' className='form-control mb-5' id='password-input' onKeyDown={removeErrors} />
        <PrimaryButton>Registrera dig</PrimaryButton>
      </form>
      {
        props.registerError && props.registerError.map((error, i) => (
          <p key={i} className='text-error'>{error}</p>
        ))
      }
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);