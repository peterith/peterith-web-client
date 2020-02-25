/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useHistory } from 'react-router-dom';
import { useTheme } from 'emotion-theming';
import { useAuth, useModal, useToast } from '../hooks';
import Nav from './Nav';

const Header = () => {
  const history = useHistory();
  const { colours } = useTheme();
  const { auth, logout } = useAuth();
  const { openAuthModal } = useModal();
  const { addSuccessToast } = useToast();

  const header = css`
    display: flex;
    align-items: center;
    padding: 10px 20px;
    border-bottom: 2px solid;
    font-size: 1.5rem;
  `;

  const user = css`
    margin-left: auto;
  `;

  const iconStyle = css`
    font-size: 1.2rem;
    padding: 5px;
    &:hover {
      cursor: pointer;
      color: ${colours.primary.main};
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
      <div css={user}>
        {!auth.token && (
          <span
            css={iconStyle}
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
            css={iconStyle}
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
            css={iconStyle}
            className="fas fa-sign-out-alt"
            role="button"
            aria-label="logout"
            tabIndex="0"
            onKeyPress={handleLogout}
            onClick={handleLogout}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
