import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { removeRedirect } from '../redux/actions/actions';

import UsersPage from './UsersPage';

const mapDispatchToProps = { removeRedirect };
const mapStateToProps = null;

let UsersPageContainer = (props) => {
  useEffect(() => {
    let data = null;
    props.socket.emit('join users page', data);
  });
  useEffect(() => {
    removeRedirect();
  });
  return (
    <UsersPage {...props} username={props.match.params.username} />
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersPageContainer);