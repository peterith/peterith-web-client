/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

const App = () => {
  const style = css`
    width: 960px;
    margin: auto;
    padding-top: 10px;
  `;

  return (
    <div css={style}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default App;
