/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Link } from 'react-router-dom';
import { useTheme } from 'emotion-theming';
import { useToggle, useClickOutside } from '../../hooks';

const Hamburger = () => {
  const { colours } = useTheme();
  const [isNavOpened, toggleNavOpened] = useToggle(false);
  const node = useClickOutside(isNavOpened, toggleNavOpened);

  const hamburger = css`
    display: flex;
    padding: 8px;
    @media (min-width: 960px) {
      display: none;
    }
  `;

  const icon = css`
    cursor: pointer;
    transition: transform 0.3s;
    transform: ${isNavOpened && 'rotate(90deg)'};
    color: ${isNavOpened && colours.primary.main};
    @media (hover: hover) {
      &:hover {
        color: ${colours.primary.main};
      }
    }
  `;

  const links = css`
    position: absolute;
    top: 55px;
    background-color: ${colours.black};
    text-align: center;
  `;

  const link = css`
    display: block;
    padding: 10px 30px;
    text-decoration: none;
    color: ${colours.white};
    transition: background-color 0.3s;
    &:hover {
      background-color: ${colours.secondary.light};
    }
  `;

  return (
    <div css={hamburger} ref={node}>
      <span
        css={icon}
        className="fas fa-bars"
        role="button"
        aria-label="toggle hamburger menu"
        tabIndex="0"
        onKeyPress={toggleNavOpened}
        onClick={toggleNavOpened}
      />
      {isNavOpened && (
        <div css={links}>
          <Link to="/" css={link} onClick={toggleNavOpened}>
            home
          </Link>
        </div>
      )}
    </div>
  );
};

export default Hamburger;
