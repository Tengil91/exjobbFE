import React from 'react';
import { connect } from 'react-redux';

import { updateUserPage, UPDATE_USER_PAGE } from '../redux/actions/actions';
import MatchHistory from './MatchHistory';

const mapStateToProps = state => ({
  games: state.games,
  points: state.points
});

const mapDispatchToProps = { updateUserPage };

let UserPage = (props) => {
  props.socket.on('user page update', data => {
    console.log('user page data:');
    console.log(data);
    props.updateUserPage({
      ...data,
      type: UPDATE_USER_PAGE
    });
  });
  return (
    <div>
      <h3>Matchhistorik för {props.username} ({props.points})</h3>
      {(props.games && props.games.length > 0) ? props.games.map(game => (
        <MatchHistory game={game} />
      )) : `${props.username} har inte spelat några matcher än.`}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);