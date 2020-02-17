import React from 'react';
import PrimaryButton from './PrimaryButton';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  loggedIn: state.loggedIn,
  wall: state.wall
});

const mapDispatchToProps = null;

let UserWall = (props) => {
  console.log(props);
  let pageUsername = props.match.params.username;
  let handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      text: document.getElementById('wall-textarea').value,
      wallOwner: pageUsername
    }
    props.socket.emit('post to wall', data);
    document.getElementById('wall-textarea').value = '';
  }
  let makeDateString = (timestamp) => {
    let date = new Date(timestamp);
    return `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()} ${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}-${(date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${date.getFullYear()}`;
  }
  return (
    <>
      {props.loggedIn && <form onSubmit={handleSubmit}>
        <textarea id='wall-textarea' className='form-control mb-5' rows="3" placeholder={`Skriv någonting på ${(pageUsername[pageUsername.length - 1] === 's') ? pageUsername : `${pageUsername}s`} vägg...`}></textarea>
        <PrimaryButton>Skicka</PrimaryButton>
      </form>}
      {props.wall && props.wall.map((message, i) => (
        <div key={i} className='border p-5 bg-white mt-5'>
          <p>{message.text}</p>
          <div className='d-flex justify-space-between'>
            <small>{message.username}</small>
            <small>{makeDateString(message.timestamp)}</small>
          </div>
        </div>
      ))}
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(UserWall);