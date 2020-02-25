/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Route, Switch } from 'react-router-dom';
import About from './About';
import Contact from './Contact';
import Profile from './Profile';

const Main = () => {
  const style = css`
    margin: 50px;
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
          <Profile />
        </Route>
      </Switch>
    </main>
  );
};

export default Main;
