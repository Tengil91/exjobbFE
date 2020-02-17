import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { removeRedirect } from '../redux/actions/actions';

import UserPage from './UserPage';

const mapDispatchToProps = { removeRedirect };
const mapStateToProps = null;

let UserPageContainer = (props) => {
  console.log(props);
  useEffect(() => {
    let data = {
      username: props.match.params.username,
      roomType: 'user'
    };
    props.socket.emit('join user page', data);
    return () => {
      props.socket.emit('leave user page', data)
    }
  });
  useEffect(() => {
    removeRedirect();
  });
  return (
    <UserPage {...props} pageUsername={props.match.params.username} />
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPageContainer);