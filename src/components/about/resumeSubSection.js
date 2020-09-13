/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import Pill from './pill';

const ResumeSubSection = ({
  position,
  company,
  pills,
  location,
  startDate,
  endDate,
  content,
  className,
}) => {
  const { colours } = useTheme();

  const subSection = css`
    background: ${colours.surface.low};
    border-radius: 10px;
    padding: 30px;
    &:not(:first-child) {
      margin-top: 50px;
    }
  `;

  const subHeading = css`
    display: flex;
    font-size: 1.2rem;
    @media (min-width: 641px) {
      font-size: 1.4rem;
    }
  `;

  const red = css`
    color: ${colours.primary.main};
  `;

  const right = css`
    margin-left: auto;
  `;

  const pillsStyle = css`
    display: flex;
    flex-wrap: wrap;
    @media (min-width: 641px) {
      font-size: 1.2rem;
    }
  `;

  const pillStyle = css`
    margin: 5px;
  `;

  const list = css`
    padding-left: 20px;
    @media (min-width: 641px) {
      font-size: 1.2rem;
    }
  `;

  const item = css`
    margin: 10px 0px;
  `;

  return (
    <section css={subSection} className={className}>
      <div css={subHeading}>
        <p>
          <span css={red}>{position}</span> @ {company}
        </p>
        <p css={right}>
          {location} | {startDate} - {endDate}
        </p>
      </div>
      <ul css={list}>
        {content.map((c) => (
          <li css={item}>{c}</li>
        ))}
      </ul>
      <div css={pillsStyle}>
        {pills.map((pill) => (
          <Pill css={pillStyle}>{pill}</Pill>
        ))}
      </div>
    </section>
  );
};

ResumeSubSection.defaultProps = {
  pills: [],
};

export default ResumeSubSection;
