/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Route, Switch } from 'react-router-dom';
import { ProfileProvider } from '../context';
import About from './About';
import Contact from './Contact';
import ProfileDashboard from './ProfileDashboard';

const Main = () => {
  const style = css`
    width: 100%;
    margin-top: 150px;
    @media (min-width: 960px) {
      margin-top: 200px;
    }
  `;

  return (
    <main css={style}>
      <Switch>
        <Route exact path="/">
          <About />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/@:username">
          <ProfileProvider>
            <ProfileDashboard />
          </ProfileProvider>
        </Route>
      </Switch>
    </main>
  );
};

export default Main;
