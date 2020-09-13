/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import Nav from './Nav';
import HeaderIcons from './HeaderIcons';
import Hamburger from './Hamburger';
import { useWindowWidth } from '../../hooks';

const Header = () => {
  const { colours } = useTheme();
  const windowWidth = useWindowWidth();

  const header = css`
    background-color: ${colours.background};
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
  `;

  const overlay = css`
    background-color: ${colours.surface.low};
    padding: 15px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.7);
    font-size: 1.3rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  `;

  return (
    <header css={header}>
      <div css={overlay}>
        {windowWidth < 960 ? <Hamburger /> : <Nav />}
        <HeaderIcons />
      </div>
    </header>
  );
};

export default Header;
