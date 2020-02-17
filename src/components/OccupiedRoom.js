import React from 'react';
import { Link } from 'react-router-dom'

export default (props) => {
  let { players, room } = props.room;
  return (
    <div className="border occupied-room mb-20">
      <Link to={`/game/${room}`}>
        <div className="w-100 h-100 bg-white">
          <p>{`Rum ${room}`}</p>
          <p>
            {players.white && <span>{players.white}</span>}
            {players.black && players.white && <span> vs </span>}
            {players.black && <span>{players.black}</span>} 
          </p>
        </div>
      </Link>
    </div>
  );
}