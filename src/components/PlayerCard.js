import React from 'react';
import { Link } from 'react-router-dom';

export default props => (
  <div className='d-flex justify-space-between'>
    <div>
      <Link to={`/user/${props.user.username}`}>{props.user.username}</Link>
    </div>
    <div>
      {props.user.points}
    </div>
  </div>
)