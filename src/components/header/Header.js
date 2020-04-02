/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import Nav from './Nav';
import HeaderIcons from './HeaderIcons';

const Header = () => {
  const { colours } = useTheme();

  const style = css`
    padding: 20px;
    background-color: ${colours.background.secondary};
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.7);
    font-size: 1.5rem;
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    z-index: 100;
    opacity: 1;
  `;

  return (
    <header css={style}>
      <Nav />
      <HeaderIcons />
    </header>
  );
};

export default Header;
