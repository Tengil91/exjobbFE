import React from 'react';
import { connect } from 'react-redux';

import { updateUsersPage, UPDATE_USERS_PAGE } from '../redux/actions/actions';
import PlayerCard from './PlayerCard';

const mapStateToProps = state => ({
  users: state.users
});

const mapDispatchToProps = { updateUsersPage };

let UsersPage = (props) => {
  props.socket.on('users page update', data => {
    props.updateUsersPage({
      ...data,
      type: UPDATE_USERS_PAGE
    });
  });
  return (
    <div className="p-5">
      <div className='d-flex justify-space-between'>
        <h3>Registrerade spelare</h3>
        <h3>Poäng</h3>
      </div>
      {props.users ? props.users.map((user, i) => (
        <PlayerCard user={user} i={i} key={i} />
      )) :'Inga registrerade spelare ännu'}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);