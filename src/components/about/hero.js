/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import profile from '../../assets/profile.jpg';

const Hero = () => {
  const { colours } = useTheme();

  const hero = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
  `;

  const content = css`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    text-align: center;
    letter-spacing: 0.1rem;
    @media (min-width: 641px) {
    }
  `;

  const photo = css`
    grid-column: 1/3;
    border: 5px solid ${colours.surface.high};
    border-radius: 100%;
    width: 250px;
    margin: auto;
    @media (hover: hover) {
      transition: border 0.3s;
      &:hover {
        border: 5px solid ${colours.primary.main};
      }
    }
    @media (min-width: 641px) {
      width: 300px;
    }
    @media (min-width: 961px) {
      grid-column: 2;
      grid-row: 1/5;
    }
  `;

  const name = css`
    grid-column: 1/3;
    font-weight: normal;
    margin: 10px 0px;
    align-self: flex-end;
    font-size: 2rem;
    @media (min-width: 641px) {
      font-size: 3rem;
    }
    @media (min-width: 961px) {
      grid-column: 1;
      font-size: 4rem;
    }
  `;

  const title = css`
    font-size: 1.5rem;
    margin: 10px 0px;
    align-self: flex-start;
    color: ${colours.primary.main};
    grid-column: 1/3;
    @media (min-width: 641px) {
      font-size: 2rem;
    }
    @media (min-width: 961px) {
      grid-column: 1;
    }
  `;

  const domain = css`
    font-size: 0.9rem;
    grid-column: 1/3;
    @media (min-width: 641px) {
      font-size: 1.2rem;
    }
    @media (min-width: 961px) {
      grid-column: 1;
      font-size: 1.4rem;
    }
  `;

  const links = css`
    border-top: 2px solid ${colours.surface.high};
    align-self: flex-start;
    padding-top: 30px;
    grid-column: 1/3;
    font-size: 1.2rem;
    @media (min-width: 641px) {
      font-size: 1.5rem;
    }
    @media (min-width: 961px) {
      grid-column: 1;
    }
  `;

  const link = css`
    margin: 10px;
    color: ${colours.text};
    text-decoration: none;
    @media (hover: hover) {
      transition: color 0.3s;
      &:hover {
        color: ${colours.primary.main};
      }
    }
  `;

  return (
    <section css={hero}>
      <div css={content}>
        <img css={photo} src={profile} alt="Profile" />

        <h1 css={name}>Pete Rithisith</h1>
        <p css={title}>Software Engineer</p>
        <p css={domain}>
          <span role="img" aria-label="web">
            🕸️
          </span>{' '}
          Web &#183;{' '}
          <span role="img" aria-label="AI">
            🤖
          </span>{' '}
          AI &#183;{' '}
          <span role="img" aria-label="drones">
            📡
          </span>{' '}
          Drones &#183;{' '}
          <span role="img" aria-label="fitness">
            💪🏻
          </span>{' '}
          Fitness
        </p>
        <div css={links}>
          <a
            css={link}
            href="https://www.linkedin.com/in/peterith"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="fab fa-linkedin-in" />
          </a>
          <a
            css={link}
            href="https://www.github.com/peterith"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="fab fa-github" />
          </a>
          <a
            css={link}
            href="https://www.instagram.com/peterith"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="fab fa-instagram" />
          </a>
          <a
            css={link}
            href="https://www.facebook.com/lsimplel"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="fab fa-facebook" />
          </a>
          <a css={link} href="mailto:p.rithisith@hotmail.com">
            <span className="fas fa-envelope" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
