/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useHistory } from 'react-router-dom';
import { useTheme as useEmotionTheme } from 'emotion-theming';
import { useAuth, useTheme, useModal, useToast } from '../hooks';
import Nav from './Nav';

const Header = () => {
  const history = useHistory();
  const { colours } = useEmotionTheme();
  const { auth, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { openAuthModal } = useModal();
  const { addSuccessToast } = useToast();

  const header = css`
    padding: 20px;
    background-color: ${colours.background};
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

  const icons = css`
    margin-left: auto;
  `;

  const icon = css`
    font-size: 1.3rem;
    padding: 8px;
    &:hover {
      cursor: pointer;
      color: ${colours.primary.main};
    }
  `;

  const rotate = css`
    transition: transform 0.3s;
    @media (hover: hover) {
      &:hover {
        color: ${colours.primary.main};
        transform: rotate(-70deg);
      }
    }
  `;

  const handleClickProfile = () => {
    history.push(`/@${auth.username}`);
  };

  const handleLogout = () => {
    const { username } = auth;
    logout();
    addSuccessToast(`See you soon, ${username}!`);
  };

  return (
    <header css={header}>
      <Nav />
      <div css={icons}>
        {!auth.token && (
          <span
            css={icon}
            className="fas fa-sign-in-alt"
            role="button"
            aria-label="login/register"
            tabIndex="0"
            onKeyPress={openAuthModal}
            onClick={openAuthModal}
          />
        )}
        {auth.token && (
          <span
            css={icon}
            className="fas fa-user-alt"
            role="button"
            aria-label="open profile"
            tabIndex="0"
            onKeyPress={handleClickProfile}
            onClick={handleClickProfile}
          />
        )}
        {auth.token && (
          <span
            css={icon}
            className="fas fa-sign-out-alt"
            role="button"
            aria-label="logout"
            tabIndex="0"
            onKeyPress={handleLogout}
            onClick={handleLogout}
          />
        )}
        <span
          css={[icon, rotate]}
          className={isDarkMode ? 'fas fa-sun' : 'fas fa-moon'}
          role="button"
          aria-label="toggle dark mode"
          tabIndex="0"
          onKeyPress={toggleDarkMode}
          onClick={toggleDarkMode}
        />
      </div>
    </header>
  );
};

export default Header;
