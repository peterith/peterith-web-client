/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Link } from 'react-router-dom';
import { useTheme } from 'emotion-theming';
import Hamburger from './Hamburger';

const Nav = () => {
  const { colours } = useTheme();

  const fullNav = css`
    display: none;
    letter-spacing: 3px;
    @media (min-width: 850px) {
      display: block;
    }
  `;

  const title = css`
    font-weight: bold;
    font-size: 2.8rem;
  `;

  const link = css`
    text-decoration: none;
    color: ${colours.text};
    &:hover {
      color: ${colours.primary.main};
    }
  `;

  return (
    <nav>
      <Hamburger />
      <div css={fullNav}>
        const <span css={title}>peterith</span> = {'{ '}
        <Link to="/" css={link}>
          about
        </Link>
        ,{' '}
        <Link to="/contact" css={link}>
          contact
        </Link>
        {' };'}
      </div>
    </nav>
  );
};

export default Nav;
