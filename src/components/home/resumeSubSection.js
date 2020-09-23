/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import PropTypes from 'prop-types';
import Pill from './pill';

const ResumeSubSection = ({
  position,
  company,
  pills,
  location,
  startDate,
  endDate,
  descriptions,
  className,
}) => {
  const { colours } = useTheme();

  const styles = {
    container: css`
      background: ${colours.surface.low};
      border-radius: 10px;
      padding: 15px;
      &:not(:first-of-type) {
        margin-top: 50px;
      }
      @media (min-width: 641px) {
        padding: 30px;
      }
    `,
    heading: css`
      display: flex;
      flex-direction: column;
      @media (min-width: 961px) {
        flex-direction: row;
      }
    `,
    leftHeading: css`
      margin-top: 0px;
      font-size: 1.2rem;
      @media (min-width: 641px) {
        font-size: 1.4rem;
      }
    `,
    red: css`
      color: ${colours.primary.main};
    `,
    rightHeading: css`
      margin-top: 0px;
      font-size: 1.1rem;
      @media (min-width: 641px) {
        font-size: 1.3rem;
      }
      @media (min-width: 961px) {
        margin-left: auto;
      }
    `,
    descriptions: css`
      padding-left: 20px;
      @media (min-width: 641px) {
        font-size: 1.2rem;
      }
    `,
    description: css`
      margin: 10px 0px;
    `,
    pills: css`
      display: flex;
      flex-wrap: wrap;
    `,
  };

  return (
    <section css={styles.container} className={className}>
      <div css={styles.heading}>
        <p css={styles.leftHeading}>
          <span css={styles.red}>{position}</span> @ {company}
        </p>
        <p css={styles.rightHeading}>
          {location} | {startDate}
          {endDate && ` - ${endDate}`}
        </p>
      </div>
      <ul css={styles.descriptions}>
        {descriptions.map((description) => (
          <li css={styles.description} key={description.replaceAll('\\s', '')}>
            {description}
          </li>
        ))}
      </ul>
      <div css={styles.pills}>
        {pills.map((pill) => (
          <Pill key={pill.replaceAll('\\s', '')}>{pill}</Pill>
        ))}
      </div>
    </section>
  );
};

ResumeSubSection.propTypes = {
  position: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string,
  descriptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  pills: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
};

ResumeSubSection.defaultProps = {
  endDate: null,
  pills: [],
  className: null,
};

export default ResumeSubSection;
