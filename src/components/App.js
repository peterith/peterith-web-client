/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

const App = () => {
  const style = css`
    width: 100%;
    padding: 150px 50px 50px 50px;
    box-sizing: border-box;
    @media (min-width: 960px) {
      padding-top: 200px;
    }
    @media (min-width: 960px) {
      width: 960px;
      margin: auto;
    }
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
