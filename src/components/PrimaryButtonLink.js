import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
  return (
    <Link to={props.to} className={'primary-button standard-button ' + (props.className ? props.className : '')}>
      {props.children}
    </Link>
  );
}