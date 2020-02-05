import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { removeRedirect } from '../redux/actions/actions';

import LandingPage from './LandingPage';

const mapStateToProps = null;
const mapDispatchToProps = { removeRedirect };

let LandingPageContainer = (props) => {
  useEffect(() => {
    props.socket.emit('join landing page', null);
    return () => {
      props.socket.emit('leave landing page', null);
    };
  });
  useEffect(() => {
    removeRedirect();
  });
  return <LandingPage {...props} />
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPageContainer);