import React from 'react';
import Nav from './Nav';

export default (props) => {
  return (
    <div className='wrapper-outer'>
      <Nav />
      <div className='wrapper-inner'>
        {props.children}
      </div>
    </div>
  );
}