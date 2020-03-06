/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from 'emotion-theming';
import Hamburger from './Hamburger';

const Nav = () => {
  const { colours } = useTheme();
  const { pathname } = useLocation();

  const fullNav = css`
    display: none;
    letter-spacing: 3px;
    @media (min-width: 850px) {
      display: block;
    }
  `;

  const title = css`
    font-size: 3rem;
    letter-spacing: 2px;
  `;

  const link = css`
    text-decoration: none;
    color: ${colours.text};
    letter-spacing: 2px;
    font-weight: bold;
    transition: color 0.3s;
  `;

  const hover = css`
    &:hover {
      color: ${colours.primary.light};
    }
  `;

  const selected = css`
    color: ${colours.primary.main};
  `;

  return (
    <nav>
      <Hamburger />
      <div css={fullNav}>
        const <span css={title}>peterith</span> = {'{ '}
        <Link to="/" css={pathname === '/' ? [link, selected] : [link, hover]}>
          about
        </Link>
        ,{' '}
        <Link to="/contact" css={pathname === '/contact' ? [link, selected] : [link, hover]}>
          contact
        </Link>
        {' };'}
      </div>
    </nav>
  );
};

export default Nav;
