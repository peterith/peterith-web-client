/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Hero from './hero';
import Resume from './resume';

const About = () => {
  const about = css`
    max-width: 960px;
    padding: 0px 30px;
    @media (min-width: 961px) {
      margin: auto;
    }
  `;

  return (
    <main css={about}>
      <Hero />
      <Resume />
    </main>
  );
};

export default About;
