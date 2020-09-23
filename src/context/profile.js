import React, { createContext, useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import { GET_USER } from '../graphql/queries';
import { useToggle, useAuth } from '../hooks';

const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  const { username } = useParams();
  const history = useHistory();
  const { user: authUser } = useAuth();
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState([]);
  const [hasNetworkError, toggleNetworkError] = useToggle(false);

  // https://github.com/apollographql/react-apollo/issues/3709
  // apollo client does not run onCompleted callback on refetch.
  // Until this is fixed, we need to use a combination of useLazyQuery and useEffect
  const [refreshUser] = useLazyQuery(GET_USER, {
    fetchPolicy: 'network-only',
    onCompleted: ({ getUser: { __typename, fitbit, ...getUser } }) => {
      const result = { ...getUser };
      if (fitbit) {
        const { __typename: _, ...fitbitResult } = fitbit;
        result.fitbit = fitbitResult;
      }
      setUser(result);
      if (user.username && getUser.username !== user.username) {
        history.push(`/@${getUser.username}`);
      }
    },
    onError: ({ networkError, graphQLErrors }) => {
      if (graphQLErrors) {
        graphQLErrors.forEach((error) => {
          setErrors((previousError) => previousError.concat(error.extensions.code));
        });
      }
      if (networkError) {
        toggleNetworkError();
      }
    },
  });

  useEffect(() => {
    refreshUser({ variables: { username } });
  }, [refreshUser, username, authUser]);

  return (
    <ProfileContext.Provider value={{ user, refreshUser, errors, hasNetworkError }}>
      {children}
    </ProfileContext.Provider>
  );
};

ProfileProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export { ProfileContext, ProfileProvider };
