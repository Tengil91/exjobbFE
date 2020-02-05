import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { removeRedirect } from '../redux/actions/actions';

import GamePage from './GamePage';

const mapDispatchToProps = { removeRedirect };
const mapStateToProps = null;

let GamePageContainer = (props) => {
  useEffect(() => {
    let data = {
      room: props.match.params.roomNumber,
      roomType: 'game'
    }
    props.socket.emit('join room', data);
    return () => {
      props.socket.emit('leave room', data);
    };
  });
  useEffect(() => {
    removeRedirect();
  });
  return (
    <GamePage {...props} />
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePageContainer);