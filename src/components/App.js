/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

const App = () => {
  const style = css`
    width: 100%;
    margin: auto;
    @media (min-width: 960px) {
      width: 960px;
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
