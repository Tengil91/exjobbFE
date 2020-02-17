import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import LandingPage from './LandingPage';

const mapStateToProps = null;
const mapDispatchToProps = null;

let LandingPageContainer = (props) => {
  useEffect(() => {
    props.socket.emit('join landing page', null);
    return () => {
      props.socket.emit('leave landing page', null);
    };
  });
  return <LandingPage {...props} />
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPageContainer);