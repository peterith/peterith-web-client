/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTheme } from 'emotion-theming';
import { useToggle } from '../../hooks';

const ResumeSection = ({ headingText, headingEmoji, children, className }) => {
  const { colours } = useTheme();
  const [isHiding, toggleHiding] = useToggle();

  const subSection = css`
    background: ${colours.surface.low};
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.7);
    border-radius: 10px;
    padding: 30px;
  `;

  const headingSize = css`
    font-size: 1.5rem;
    margin-top: 0px;
    @media (min-width: 641px) {
      font-size: 2rem;
    }
  `;

  const hidable = css`
    max-height: ${isHiding ? 0 : '2000px'};
    transition: max-height 0.5s;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `;

  const heading = css`
    text-align: center;
  `;

  const headingStyle = css`
    display: inline-block;
  `;

  const collaspeIcon = css`
    cursor: pointer;
    font-size: 1.5rem;
    float: left;
    transform: ${!isHiding && 'rotate(90deg)'};
    transition: transform 0.3s;
    @media (hover: hover) {
      transition: color 0.3s, transform 0.3s;
      &:hover {
        color: ${colours.primary.main};
      }
    }
  `;

  const icon = css`
    margin: 0px 10px;
  `;

  return (
    <section css={subSection} className={className}>
      <FontAwesomeIcon
        css={collaspeIcon}
        icon="chevron-right"
        role="button"
        aria-label="toggle collapse"
        tabIndex="0"
        onKeyPress={toggleHiding}
        onClick={toggleHiding}
      />
      <div css={heading}>
        <span css={[icon, headingSize]} role="img" aria-label="heading">
          {headingEmoji}
        </span>
        <h2 css={[headingStyle, headingSize]}>{headingText}</h2>
      </div>
      <div css={hidable}>{children}</div>
    </section>
  );
};

ResumeSection.defaultProps = {
  pills: [],
};

export default ResumeSection;
