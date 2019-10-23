import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { Global, css } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import App from './components/App';
import { AuthProvider, ModalProvider } from './context';
import { ToastProvider } from './context/toast';

const { REACT_APP_SERVER_SCHEME, REACT_APP_SERVER_HOST, REACT_APP_SERVER_PORT } = process.env;

const httpLink = createHttpLink({
  uri: `${REACT_APP_SERVER_SCHEME}://${REACT_APP_SERVER_HOST}:${REACT_APP_SERVER_PORT}/graphql`,
});

const authLink = setContext((_request, { headers }) => {
  const token = localStorage.getItem('token');
  return { headers: { ...headers, authorization: token ? `Bearer ${token}` : '' } };
});

const client = new ApolloClient({ link: authLink.concat(httpLink), cache: new InMemoryCache() });

const theme = {
  colours: {
    primary: { main: '#f25e5e', dark: '#d73e3e' },
    secondary: { main: '#4d5389', light: '#6b73a1' },
    success: '#4fb',
    black: '#313147',
    white: '#fff',
  },
};

const styles = css`
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
      'Droid Sans', 'Helvetica Neue', sans-serif;
    color: ${theme.colours.black};
    margin: 0px;
  }
`;

ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <ToastProvider>
            <ModalProvider>
              <Global styles={styles} />
              <App />
            </ModalProvider>
          </ToastProvider>
        </ThemeProvider>
      </AuthProvider>
    </ApolloProvider>
  </Router>,
  document.getElementById('app-root'),
);
