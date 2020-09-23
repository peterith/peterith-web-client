/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Route, Switch } from 'react-router-dom';
import { ProfileProvider } from '../context';
import Home from './home';
import ProfileDashboard from './ProfileDashboard';

const Main = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/@:username">
        <ProfileProvider>
          <ProfileDashboard />
        </ProfileProvider>
      </Route>
    </Switch>
  );
};

export default Main;
