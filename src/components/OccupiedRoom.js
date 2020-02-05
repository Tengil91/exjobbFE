import React from 'react';
import { Link } from 'react-router-dom'

export default (props) => {
  let { players, room } = props.room;
  return (
    <div className="border occupied-room mb-20">
      <Link to={`/games/${room}`}>
        <div className="w-100 h-100">
          <p>{`Rum ${room}`}</p>
          <p>
            <span>{players[0]}</span>
            {players.length === 2 && <span> <span>vs</span> <span>{players[1]}</span></span>} 
          </p>
        </div>
      </Link>
    </div>
  );
}