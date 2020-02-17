import React from 'react';
import { Link } from 'react-router-dom';

export default props => (
  <div className='d-flex playercard bg-white'>
    <h4 className="ml-5 mb-5 mt-5">{props.i + 1}</h4>
    <h4 className="ml-5 mb-5 mt-5">
      <Link to={`/user/${props.user.username}`}>{props.user.username}</Link>
    </h4>
    <h4  className="ml-auto mb-5 mt-5">
      {props.user.points}
    </h4>
  </div>
)