/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from 'emotion-theming';
import { useToggle } from '../hooks';

const Hamburger = () => {
  const { colours } = useTheme();
  const [isNavOpened, toggleNavOpened] = useToggle(false);
  const ref = useRef(null);

  useEffect(() => {
    if (isNavOpened) {
      document.addEventListener('mousedown', handleClickOutside, false);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, false);
    };
  }, [isNavOpened]);

  const hamburger = css`
    display: flex;
    padding: 8px;
    @media (min-width: 850px) {
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

  const handleClickOutside = (event) => {
    if (!ref.current.contains(event.target)) {
      toggleNavOpened();
    }
  };

  return (
    <div css={hamburger} ref={ref}>
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
            about
          </Link>
          <Link to="/contact" css={link} onClick={toggleNavOpened}>
            contact
          </Link>
        </div>
      )}
    </div>
  );
};

export default Hamburger;
