import React, { createContext, useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { GET_AUTH_USER } from '../graphql/queries';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

  // https://github.com/apollographql/react-apollo/issues/3709
  // apollo client does not run onCompleted callback on refetch.
  // Until this is fixed, we need to use a combination of useLazyQuery and useEffect
  const [refreshUser, { client }] = useLazyQuery(GET_AUTH_USER, {
    fetchPolicy: 'network-only',
    onCompleted: ({ getAuthUser: { __typename, ...getAuthUser } }) => {
      setUser(getAuthUser);
    },
  });

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const logout = () => {
    client.clearStore().then(() => {
      setUser({});
    });
  };

  return (
    <AuthContext.Provider value={{ user, refreshUser, logout }}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export { AuthContext, AuthProvider };
