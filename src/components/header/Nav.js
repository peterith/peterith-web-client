/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from 'emotion-theming';

const Nav = () => {
  const { colours } = useTheme();
  const { pathname } = useLocation();

  const fullNav = css`
    letter-spacing: 0.15rem;
  `;

  const title = css`
    font-size: 2.8rem;
  `;

  const link = css`
    text-decoration: none;
    color: ${colours.text};
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
      <div css={fullNav}>
        const <span css={title}>peterith</span> = [{' '}
        <Link to="/" css={pathname === '/' ? [link, selected] : [link, hover]}>
          home
        </Link>
        ,{' '}
        <Link to="/" css={pathname === '/projects' ? [link, selected] : [link, hover]}>
          projects
        </Link>
        {' ];'}
      </div>
    </nav>
  );
};

export default Nav;
