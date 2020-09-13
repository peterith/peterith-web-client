/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useHistory } from 'react-router-dom';
import { useTheme } from 'emotion-theming';
import { useAuth, useDarkMode, useModal, useToast } from '../../hooks';

const HeaderIcons = () => {
  const { colours } = useTheme();
  const history = useHistory();
  const { user, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { openAuthModal } = useModal();
  const { addSuccessToast, addErrorToast } = useToast();

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
    history.push(`/@${user.username}`);
  };

  const handleLogout = async () => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    switch (response.status) {
      case 200:
        logout();
        addSuccessToast(`See you soon, ${user.username}.`);
        break;
      default:
        addErrorToast('Unable to logout, please try again later.');
        break;
    }
  };

  return (
    <div css={headerIcons}>
      {!user.id && (
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
      {user.id && (
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
      {user.id && (
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
