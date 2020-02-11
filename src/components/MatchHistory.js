import React from 'react';
import { Link } from 'react-router-dom';

export default props => (
  <div className={'user-page-history d-flex justify-space-between ' + (props.game.wonGame ? 'won-game' : 'lost-game')}>
    <div>
      Spelade som {props.game.playedAs} mot <Link to={`/user/${props.game.opponent}`}>{props.game.opponent}</Link>
    </div>
    <div>
      {props.game.wonGame ? ':)' : ':('}
    </div>
  </div>
)