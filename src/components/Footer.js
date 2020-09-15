/** @jsx jsx */
import { jsx, css } from '@emotion/core';

const Footer = () => {
  const style = css`
    margin: 50px auto;
    text-align: center;
    font-size: 1.2rem;
    @media (min-width: 641px) {
      margin: 100px auto;
      font-size: 1.4rem;
    }
  `;

  return (
    <footer css={style}>
      <span className="far fa-copyright" /> 2020 peterith
    </footer>
  );
};

export default Footer;
