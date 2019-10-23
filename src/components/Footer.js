/** @jsx jsx */
import { jsx, css } from '@emotion/core';

const Footer = () => {
  const style = css`
    text-align: center;
    margin: 50px;
  `;

  return (
    <footer css={style}>
      <span className="far fa-copyright" /> 2020 peterith
    </footer>
  );
};

export default Footer;
