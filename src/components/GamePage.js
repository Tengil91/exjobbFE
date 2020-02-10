import React from 'react';
import { connect } from 'react-redux';
import { setPlayers, setPlaying, updateTable } from '../redux/actions/actions'; 

import Game from './Game';
import PrimaryButton from './PrimaryButton';

const mapStateToProps = state => ({
  white: state.white,
  black: state.black,
  atTable: state.atTable,
  pieces: state.pieces,
  selectedPiece: state.selectedPiece,
  checkingPieces: state.checkingPieces,
  checkedKing: state.checkedKing,
  matt: state.matt,
  pawnCrossing: state.pawnCrossing
});

const mapDispatchToProps = { setPlayers, setPlaying, updateTable };

let GamePage = (props) => {
  let socket = props.socket;
  let boardLength = 500;
  let handlePlayerClick = (e) => {
    let rect = e.target.getBoundingClientRect();
    let x = Math.floor((e.clientX - rect.left) / boardLength * 8);
    let y = Math.floor((e.clientY - rect.top) / boardLength * 8);
    socket.emit('canvas click', {
      x,
      y,
      room: props.match.params.roomNumber,
    });
  }
  let joinTableAsWhite = () => {
    let data = {
      color: 0,
      room: props.match.params.roomNumber,
    };
    socket.emit('join table', data);
  }
  let joinTableAsBlack = () => {
    let data = {
      color: 1,
      room: props.match.params.roomNumber,
    };
    socket.emit('join table', data);
  }
  let leaveTable = () => {
    let data = {
      room: props.match.params.roomNumber,
    };
    socket.emit('leave table', data);
  }
  socket.on('table update', (data) => {
    props.updateTable({
      ...data,
      type: 'UPDATE_TABLE'
    });
  });
  socket.on('players at table', (data) => {
    props.setPlayers({
      ...data,
      type: 'SET_PLAYERS'
    });
  });
  return (
    <div>
      
      <h3>
        {props.white && <span>{props.white} (vit)</span>}
        {props.black && props.white && <span> vs </span>}
        {props.black && <span>{props.black} (svart)</span>} 
      </h3>
      <Game  {...props} handleClick={props.atTable ? handlePlayerClick : () => {}} />
      {(props.white || props.atTable) ? '' : <PrimaryButton onClick={joinTableAsWhite}>Spela som vit</PrimaryButton>}
      {(props.black || props.atTable) ? '' : <PrimaryButton onClick={joinTableAsBlack}>Spela som svart</PrimaryButton>}
      {(props.atTable) ? <PrimaryButton onClick={leaveTable}>Lämna bord</PrimaryButton> : ''}
      {/* <MessageDisplayer /> */}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);