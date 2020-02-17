import React, { useEffect } from 'react';
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
  useEffect(() => {
    props.socket.on('user page update', data => {
      props.updateUserPage({
        ...data,
        type: UPDATE_USER_PAGE
      });
    });
    return () => {
      props.socket.removeAllListeners('user page update')
    }
  })
  if(props.points){
    return (
      <div>
        <div>
          <h3>Matchhistorik för {props.pageUsername} ({props.points})</h3>
          {(props.games && props.games.length > 0) ? props.games.map((game, i) => (
            <MatchHistory game={game} key={i} />
          )) : <p>{props.pageUsername} har inte spelat några matcher än.</p>}
        </div>
        <hr />
        <div>
          <h3>Inlägg</h3>
          <MessageDisplayer {...props} />
        </div>
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