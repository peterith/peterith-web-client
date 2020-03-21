/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useTheme } from 'emotion-theming';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useToast, useAuth } from '../hooks';
import { GET_USER } from '../graphql/queries';
import { UPDATE_USER } from '../graphql/mutations';
import { InputTypeEnum } from '../utils/enums';
import Heading from './Heading';
import EditableInput from './EditableInput';
import { validateUsername, validateEmail } from '../utils/validation';

const UserInfoPanel = ({ className }) => {
  const { colours } = useTheme();
  const { username } = useParams();
  const { login } = useAuth();
  const { addSuccessToast, addErrorToast } = useToast();
  const [lastSavedFormValues, setLastSavedFormValues] = useState({
    username: '',
    email: '',
  });
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
  });

  const { error } = useQuery(GET_USER, {
    variables: { username },
    onCompleted: ({ getUser: { __typename, ...getUser } }) => {
      setFormValues(getUser);
      setLastSavedFormValues(getUser);
    },
  });

  const [updateUserMutation] = useMutation(UPDATE_USER, {
    variables: { user: formValues },
    onCompleted: ({ updateUser: { __typename, token, ...updateUser } }) => {
      login(updateUser.username, token);
      setFormValues(updateUser);
      setLastSavedFormValues(updateUser);
      addSuccessToast('User information has been saved.');
    },
    onError({ graphQLErrors }) {
      setFormValues(lastSavedFormValues);
      addErrorToast(graphQLErrors[0].message);
    },
  });

  const grid = css`
    background-color: ${colours.background.secondary};
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.7);
    border-radius: 10px;
    padding: 30px;
  `;

  const userInfoGrid = css`
    display: grid;
    grid-template-columns: 2fr 5fr;
    grid-auto-rows: minmax(30px, auto);
    align-items: center;
  `;

  const heading = css`
    grid-column: span 2;
    text-align: center;
  `;

  const handleChange = (field) => (value) => {
    setFormValues((previousFormValues) => ({
      ...previousFormValues,
      [field]: value,
    }));
  };

  const handleBlurUsername = () => {
    if (formValues.username !== lastSavedFormValues.username) {
      if (validateUsername(formValues.username)) {
        updateUserMutation();
      } else {
        setFormValues(lastSavedFormValues);
        addErrorToast('You have entered an invalid username.');
      }
    }
  };

  const handleBlurEmail = () => {
    if (formValues.email !== lastSavedFormValues.email) {
      if (validateEmail(formValues.email)) {
        updateUserMutation();
      } else {
        setFormValues(lastSavedFormValues);
        addErrorToast('You have entered an invalid email address.');
      }
    }
  };

  if (error) {
    return (
      <div css={grid} className={className}>
        Unable to get user info, please try again later.
      </div>
    );
  }

  return (
    <div css={[userInfoGrid, grid]} className={className}>
      <Heading css={heading} headingLevel={2}>
        Profile
      </Heading>
      <strong>Username:</strong>
      <EditableInput
        type={InputTypeEnum.TEXT}
        label="Username"
        value={formValues.username}
        onChange={handleChange('username')}
        onBlur={handleBlurUsername}
      />
      <strong>Email:</strong>
      <EditableInput
        type={InputTypeEnum.EMAIL}
        label="Email"
        value={formValues.email}
        onChange={handleChange('email')}
        onBlur={handleBlurEmail}
      />
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
