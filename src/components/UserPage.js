import React from 'react';
import { connect } from 'react-redux';

import { updateUserPage, UPDATE_USER_PAGE } from '../redux/actions/actions';
import MatchHistory from './MatchHistory';
import MessageDisplayer from './MessageDisplayer';

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
  if(props.points){
    return (
      <div>
        <h3>Matchhistorik för {props.pageUsername} ({props.points})</h3>
        {(props.games && props.games.length > 0) ? props.games.map(game => (
          <MatchHistory game={game} />
        )) : <p>{props.pageUsername} har inte spelat några matcher än.</p>}
        <MessageDisplayer {...props} />
      </div>
    );
  } else {
    return (
    <div>
      Det finns ingen användare "{props.pageUsername}" registrerad på sidan.
    </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);