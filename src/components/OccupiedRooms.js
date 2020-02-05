import React from 'react';
import OccupiedRoom from './OccupiedRoom';

export default (props) => {
  return (
    <div className="d-flex justify-space-between mt-20 flex-wrap">
      {
        props.rooms && props.rooms.map((room, i) => (
          <OccupiedRoom room={room} key={`o-${i}`} />
        ))
      }
    </div>
  );
}