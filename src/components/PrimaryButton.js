import React from 'react';

export default (props) => {
  return (
    <button className={'primary-button standard-button ' + (props.className ? props.className : '')} onClick={props.onClick}>
      {props.children}
    </button>
  );
}