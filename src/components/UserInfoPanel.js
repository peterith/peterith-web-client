/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useTheme } from 'emotion-theming';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { useDarkMode, useAuth, useProfile, useToast } from '../hooks';
import { UPDATE_USER } from '../graphql/mutations';
import { InputTypeEnum, ErrorTypeEnum } from '../utils/enums';
import { validateUsername, validateEmail } from '../utils/validation';
import Heading from './Heading';
import EditableInput from './EditableInput';

const UserInfoPanel = ({ className }) => {
  const { colours } = useTheme();
  const { isDarkMode } = useDarkMode();
  const { user: authUser, refreshUser: refreshAuthUser } = useAuth();
  const {
    user: profileUser,
    refreshUser: refreshProfileUser,
    errors,
    hasNetworkError,
  } = useProfile();
  const { addSuccessToast, addErrorToast } = useToast();
  const [lastSavedFormValues, setLastSavedFormValues] = useState({
    fullName: '',
    username: '',
    email: '',
  });
  const [formValues, setFormValues] = useState({
    fullName: '',
    username: '',
    email: '',
  });

  const [OAuth2Accounts, setOAuth2Accounts] = useState({ fitbit: false });

  useEffect(() => {
    setFormValues({
      fullName: profileUser.fullName,
      username: profileUser.username,
      email: profileUser.email,
    });
    setLastSavedFormValues({
      fullName: profileUser.fullName,
      username: profileUser.username,
      email: profileUser.email,
    });
    setOAuth2Accounts({ fitbit: !!profileUser.fitbit });
  }, [profileUser]);

  const [updateUserMutation] = useMutation(UPDATE_USER, {
    variables: {
      id: profileUser.id,
      user: formValues,
    },
    onCompleted: ({ updateUser: { __typename, ...updateUser } }) => {
      if (authUser.id === profileUser.id) {
        refreshAuthUser();
      }
      refreshProfileUser({ variables: { username: updateUser.username } });
      setFormValues(updateUser);
      setLastSavedFormValues(updateUser);
      addSuccessToast('User information has been saved.');
    },
    onError({ graphQLErrors }) {
      setFormValues(lastSavedFormValues);
      addErrorToast(graphQLErrors[0].message);
    },
  });
  const handleChange = (field) => (value) => {
    setFormValues((previousFormValues) => ({ ...previousFormValues, [field]: value }));
  };

  const handleClickOutsideFullName = () => {
    if (formValues.fullName !== lastSavedFormValues.fullName) {
      updateUserMutation();
    }
  };

  const handleClickOutsideUsername = () => {
    if (formValues.username !== lastSavedFormValues.username) {
      if (validateUsername(formValues.username)) {
        updateUserMutation();
      } else {
        setFormValues(lastSavedFormValues);
        addErrorToast('You have entered an invalid username.');
      }
    }
  };

  const handleClickOutsideEmail = () => {
    if (formValues.email !== lastSavedFormValues.email) {
      if (validateEmail(formValues.email)) {
        updateUserMutation();
      } else {
        setFormValues(lastSavedFormValues);
        addErrorToast('You have entered an invalid email address.');
      }
    }
  };
  const userInfoGrid = css`
    background-color: ${colours.background.secondary};
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.7);
    border-radius: 10px;
    padding: 30px;
    height: 250px;
  `;

  const grid = css`
    display: grid;
    grid-template-columns: 2fr 5fr;
    grid-template-rows: 65px repeat(3, 20px) 35px;
    grid-gap: 20px;
  `;

  const heading = css`
    grid-column: span 2;
    text-align: center;
  `;

  const oauth2 = css`
    padding: 7px;
    text-align: center;
    border: 2px solid;
    border-radius: 500px;
    color: ${colours.text};
    text-decoration: none;
  `;

  const hover = css`
    transition: color 0.3s;
    &:hover {
      color: ${colours.primary.main};
    }
  `;

  const connected = css`
    background-color: ${colours.fitbit.main};
    border-color: ${colours.fitbit.main};
    transition: background-color 0.3s, border-color 0.3s;
    &:hover {
      background-color: ${colours.fitbit.dark};
      border-color: ${colours.fitbit.dark};
    }
  `;

  const lightMode = css`
    color: ${colours.white};
  `;

  if (errors.length) {
    return (
      <div css={userInfoGrid} className={className}>
        <Heading css={heading} headingLevel={2}>
          Profile
        </Heading>
        {hasNetworkError && <span>Network error. Please try again later.</span>}
        {errors.map((error) => {
          switch (error) {
            case ErrorTypeEnum.BAD_USER_INPUT:
              return (
                <span key={uuidv4()}>
                  User does not exist, please check username and try again.
                </span>
              );
            default:
              return <span key={uuidv4()}>Unknown error, please try again later.</span>;
          }
        })}
      </div>
    );
  }

  return (
    <div css={[userInfoGrid, grid]} className={className}>
      <Heading css={heading} headingLevel={2}>
        Profile
      </Heading>
      <strong>Full Name:</strong>
      <EditableInput
        type={InputTypeEnum.TEXT}
        value={formValues.fullName}
        isEditable={!!authUser.id && authUser.id === profileUser.id}
        onChange={handleChange('fullName')}
        onClickOutside={handleClickOutsideFullName}
      />
      <strong>Username:</strong>
      <EditableInput
        type={InputTypeEnum.TEXT}
        value={formValues.username}
        isEditable={!!authUser.id && authUser.id === profileUser.id}
        onChange={handleChange('username')}
        onClickOutside={handleClickOutsideUsername}
      />
      <strong>Email:</strong>
      <EditableInput
        type={InputTypeEnum.EMAIL}
        value={formValues.email}
        isEditable={!!authUser.id && authUser.id === profileUser.id}
        onChange={handleChange('email')}
        onClickOutside={handleClickOutsideEmail}
      />
      {authUser.id && authUser.id === profileUser.id && (
        <a
          css={
            OAuth2Accounts.fitbit
              ? isDarkMode
                ? [oauth2, connected]
                : [oauth2, connected, lightMode]
              : [oauth2, hover]
          }
          href={`${process.env.REACT_APP_SERVER_URI}/connect/fitbit${
            OAuth2Accounts.fitbit ? '/revoke' : ''
          }`}
        >
          Fitbit
        </a>
      )}
    </div>
  );
};

UserInfoPanel.propTypes = {
  className: PropTypes.string,
};

UserInfoPanel.defaultProps = {
  className: null,
};

export default UserInfoPanel;
