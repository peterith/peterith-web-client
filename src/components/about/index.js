/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Hero from './hero';
import Resume from './resume';

const About = () => {
  const styles = {
    container: css`
      margin: auto;
      max-width: 960px;
      padding: 0px 10px;
      @media (min-width: 641px) {
        padding: 0px 30px;
      }
    `,
  };

  return (
    <main css={styles.container}>
      <Hero />
      <Resume />
    </main>
  );
};

export default About;
