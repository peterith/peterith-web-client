/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Link, useHistory } from 'react-router-dom';
import { useTheme } from 'emotion-theming';
import { useAuth, useModal, useToast } from '../hooks';

const Header = () => {
  const history = useHistory();
  const { colours } = useTheme();
  const { auth, logout } = useAuth();
  const { openAuthModal } = useModal();
  const { addSuccessToast } = useToast();

  const headerStyle = css`
    display: flex;
    padding-bottom: 20px;
    border-bottom: 2px solid;
    font-size: 1.5rem;
  `;

  const titleStyle = css`
    font-weight: bold;
    font-size: 2.8rem;
  `;

  const linkStyle = css`
    text-decoration: none;
    color: ${colours.black};
    &:hover {
      color: ${colours.primary.main};
      text-decoration: underline;
    }
  `;

  const authStyle = css`
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
    <header css={headerStyle}>
      <nav>
        const <span css={titleStyle}>peterith</span> = {'{ '}
        <Link to="/" css={linkStyle}>
          about
        </Link>
        ,{' '}
        <Link to="/contact" css={linkStyle}>
          contact
        </Link>
        {' };'}
      </nav>
      <div css={authStyle}>
        {!auth.token && <span css={iconStyle} className="fas fa-sign-in-alt" onClick={openAuthModal} />}
        {auth.token && <span css={iconStyle} className="fas fa-user-alt" onClick={handleClickProfile} />}
        {auth.token && <span css={iconStyle} className="fas fa-sign-out-alt" onClick={handleLogout} />}
      </div>
    </header>
  );
};

export default Header;
