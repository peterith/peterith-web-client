/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Route, Switch } from 'react-router-dom';
import { ProfileProvider } from '../context';
import About from './about';
import ProfileDashboard from './ProfileDashboard';

const Main = () => {
  return (
    <Switch>
      <Route exact path="/">
        <About />
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
