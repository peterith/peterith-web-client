import React from 'react';
import Message from './Message';
import './MessageBox.css';

export default props => {
  return (
    <div className="message-container">
      <Message>{props.children}</Message>
    </div>
  );
};
