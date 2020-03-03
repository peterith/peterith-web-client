import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import App from './components/App';
import { AuthProvider, ThemeProvider, ToastProvider, ModalProvider } from './context';

const { REACT_APP_SERVER_SCHEME, REACT_APP_SERVER_HOST, REACT_APP_SERVER_PORT } = process.env;

const httpLink = createHttpLink({
  uri: `${REACT_APP_SERVER_SCHEME}://${REACT_APP_SERVER_HOST}:${REACT_APP_SERVER_PORT}/graphql`,
});

const authLink = setContext((_request, { headers }) => {
  const token = localStorage.getItem('token');
  return { headers: { ...headers, authorization: token ? `Bearer ${token}` : '' } };
});

const client = new ApolloClient({ link: authLink.concat(httpLink), cache: new InMemoryCache() });

ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <AuthProvider>
        <ThemeProvider>
          <ToastProvider>
            <ModalProvider>
              <App />
            </ModalProvider>
          </ToastProvider>
        </ThemeProvider>
      </AuthProvider>
    </ApolloProvider>
  </Router>,
  document.getElementById('app-root'),
);
