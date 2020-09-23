/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { useState } from 'react';
import Hero from './hero';
import Intro from './intro';
import Hobbies from './hobbies';
import Resume from './resume';

const Home = () => {
  const { colours } = useTheme();
  const [tabId, setTabId] = useState('resume');

  const styles = {
    container: css`
      margin: auto;
      max-width: 960px;
      padding: 0px 10px;
      @media (min-width: 641px) {
        padding: 0px 30px;
      }
    `,
    tabs: css`
      border-bottom: 1px solid ${colours.surface.low};
      margin-bottom: 50px;
      @media (min-width: 641px) {
        margin-bottom: 100px;
      }
    `,
    tab: css`
      display: inline-block;
      padding: 5px 15px;
      background: ${colours.surface.low};
      border-radius: 15px 15px 0px 0px;
      @media (hover: hover) {
        cursor: pointer;
        transition: background-color 0.3s;
        &:hover {
          background: ${colours.primary.main};
        }
      }
      @media (min-width: 641px) {
        padding: 7px 20px;
        font-size: 1.2rem;
      }
    `,
    disabled: css`
      @media (hover: hover) {
        cursor: not-allowed;
      }
    `,
    selected: css`
      background: ${colours.primary.main};
    `,
  };

  const handleClick = (id) => () => {
    setTabId(id);
  };

  return (
    <main css={styles.container}>
      <Hero />
      <div css={styles.tabs}>
        <span
          css={tabId === 'intro' ? [styles.tab, styles.selected] : [styles.tab, styles.disabled]}
          role="button"
          aria-label="intro"
          tabIndex="0"
          // onKeyPress={handleClick('intro')}
          // onClick={handleClick('intro')}
        >
          Intro
        </span>
        <span
          css={tabId === 'resume' ? [styles.tab, styles.selected] : styles.tab}
          role="button"
          aria-label="resume"
          tabIndex="0"
          onKeyPress={handleClick('resume')}
          onClick={handleClick('resume')}
        >
          Resume
        </span>
        <span
          css={tabId === 'hobbies' ? [styles.tab, styles.selected] : styles.tab}
          role="button"
          aria-label="hobbies"
          tabIndex="0"
          onKeyPress={handleClick('hobbies')}
          onClick={handleClick('hobbies')}
        >
          Hobbies
        </span>
      </div>
      {tabId === 'intro' && <Intro />}
      {tabId === 'resume' && <Resume />}
      {tabId === 'hobbies' && <Hobbies />}
    </main>
  );
};

export default Home;
