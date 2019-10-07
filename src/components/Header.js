import React from 'react';
import { Link } from 'react-router-dom';
import UserPanel from './UserPanel';
import './Header.css';

export default () => {
  return (
    <nav>
      <div className="nav-main">
        const <span className="peterith">peterith</span> = {'{ '}
        <Link to="/" className="link">
          about
        </Link>
        ,{' '}
        <Link to="/contact" className="link">
          contact
        </Link>
        {' };'}
      </div>
      <UserPanel />
    </nav>
  );
};
