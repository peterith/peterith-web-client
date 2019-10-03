import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import './index.css';
import App from './components/App';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: `http://${process.env.REACT_APP_NODE_HOST}:${process.env.REACT_APP_NODE_PORT}/graphql`
});

const client = new ApolloClient({ cache, link });

ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Router>,
  document.getElementById('root')
);
