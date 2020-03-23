/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useHistory } from 'react-router-dom';
import { useTheme } from 'emotion-theming';
import { useAuth, useDarkMode, useModal, useToast } from '../../hooks';

const HeaderIcons = () => {
  const { colours } = useTheme();
  const history = useHistory();
  const { username, token, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { openAuthModal } = useModal();
  const { addSuccessToast } = useToast();
  const headerIcons = css`
    margin-left: auto;
  `;

  const icon = css`
    font-size: 1.3rem;
    padding: 8px;
    transition: color 0.3s;
    cursor: pointer;
    &:hover {
      color: ${colours.primary.main};
    }
  `;

  const rotate = css`
    @media (hover: hover) {
      transition: transform 0.3s;
      &:hover {
        color: ${colours.primary.main};
        transform: rotate(-70deg);
      }
    }
  `;

  const handleClickProfile = () => {
    history.push(`/@${username}`);
  };

  const handleLogout = () => {
    logout();
    addSuccessToast(`See you soon, ${username}!`);
  };
  return (
    <div css={headerIcons}>
      {!token && (
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
      {token && (
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
      {token && (
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
  );
};

export default HeaderIcons;
