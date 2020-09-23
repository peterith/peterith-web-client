import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { AuthProvider, DarkModeProvider, ToastProvider, ModalProvider } from './context';
import App from './components/App';
import 'react-datepicker/dist/react-datepicker.css';

const client = new ApolloClient({
  link: createHttpLink({
    uri: `${process.env.REACT_APP_SERVER_URI}/graphql`,
    credentials: 'include',
  }),
  cache: new InMemoryCache(),
});

library.add(faChevronRight);

ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <AuthProvider>
        <DarkModeProvider>
          <ToastProvider>
            <ModalProvider>
              <App />
            </ModalProvider>
          </ToastProvider>
        </DarkModeProvider>
      </AuthProvider>
    </ApolloProvider>
  </Router>,
  document.getElementById('app-root'),
);
