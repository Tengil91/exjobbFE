import React from 'react';

const MessageDisplayer = props => {
  return (
    <div style={props.style} className='message-displayer'>
      {
        props.messages && props.messages.map(message => {
          return <p className={message.className}>{message.text}</p>;
        })
      }
    </div>
  );
};

export default MessageDisplayer;