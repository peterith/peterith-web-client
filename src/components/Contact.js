/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useTheme } from 'emotion-theming';

const Contact = () => {
  const { colours } = useTheme();

  const section = css`
    text-align: center;
  `;

  const text = css`
    margin-bottom: 30px;
  `;

  const link = css`
    display: inline-block;
    margin: 5px;
    padding: 7px;
    border: 2px solid;
    border-radius: 500px;
    color: ${colours.text};
    text-decoration: none;
    &:hover {
      color: ${colours.primary.main};
    }
  `;

  return (
    <section css={section}>
      <p css={text}>Let&apos;s keep in touch!</p>
      <a css={link} href="https://www.linkedin.com/in/peterith" target="_blank" rel="noopener noreferrer">
        <span className="fab fa-linkedin-in" /> LinkedIn
      </a>
      <a css={link} href="https://www.github.com/peterith" target="_blank" rel="noopener noreferrer">
        <span className="fab fa-github" /> GitHub
      </a>
      <a css={link} href="https://www.instagram.com/peterith" target="_blank" rel="noopener noreferrer">
        <span className="fab fa-instagram" /> Instagram
      </a>
      <a css={link} href="https://www.facebook.com/lsimplel" target="_blank" rel="noopener noreferrer">
        <span className="fab fa-facebook" /> Facebook
      </a>
      <a css={link} href="mailto:p.rithisith@hotmail.com" target="_blank" rel="noopener noreferrer">
        <span className="fas fa-envelope" /> Email
      </a>
    </section>
  );
};

export default Contact;
