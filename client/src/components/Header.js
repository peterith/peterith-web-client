import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default () => {
  return (
    <nav>
      const <span className="peterith">peterith</span> = {'{ '}
      <Link to="/" className="link">
        about
      </Link>
      ,{' '}
      <Link to="/contact" className="link">
        contact
      </Link>
      ,{' '}
      <Link to="/register" className="link">
        register
      </Link>
      {' };'}
    </nav>
  );
};
