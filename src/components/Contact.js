import React from 'react';
import './Contact.css';

export default () => {
  return (
    <div>
      <h1>Contact</h1>
      <section className="contact">
        <p>I am always around</p>
        <a
          href="https://www.linkedin.com/in/peterith"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="fab fa-linkedin-in social-link" />
        </a>
        <a
          href="https://www.github.com/peterith"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="fab fa-github social-link" />
        </a>
        <a
          href="mailto:p.rithisith@hotmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="fas fa-envelope social-link" />
        </a>
      </section>
    </div>
  );
};
