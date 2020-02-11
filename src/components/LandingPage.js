import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import PrimaryButton from './PrimaryButton';
import OccupiedRooms from './OccupiedRooms';

import { updateLandingPage, UPDATE_LANDING_PAGE } from '../redux/actions/actions';

const mapStateToProps = state => ({
  rooms: state.rooms
});

const mapDispatchToProps = { updateLandingPage };

let LandingPage = (props) => {
  let socket = props.socket;
  socket.on('landing page update', (data) => {
    props.updateLandingPage({
      ...data,
      type: UPDATE_LANDING_PAGE
    });
  });
  return (
    <div>
      <PrimaryButton
        onClick={() => {
          socket.emit('create room', null);
        }}
      >
        Gå till ett ledigt bord
      </PrimaryButton>
      <OccupiedRooms rooms={props.rooms} />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);