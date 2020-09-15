/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTheme } from 'emotion-theming';
import PropTypes from 'prop-types';
import { useToggle } from '../../hooks';
import { slideUp } from '../../utils/keyframes';

const ResumeSection = ({ heading, children, className }) => {
  const { colours } = useTheme();
  const [isHiding, toggleHiding] = useToggle();

  const styles = {
    container: css`
      background: ${colours.surface.low};
      box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.7);
      border-radius: 10px;
      margin-top: 50px;
      padding: 10px;
      animation: ${slideUp(30)} 1s;
      @media (min-width: 641px) {
        padding: 30px;
        margin-top: 100px;
      }
    `,
    icon: css`
      font-size: 1.2rem;
      float: left;
      transform: ${!isHiding && 'rotate(90deg)'};
      transition: transform 0.3s;
      @media (hover: hover) {
        cursor: pointer;
        transition: color 0.3s, transform 0.3s;
        &:hover {
          color: ${colours.primary.main};
        }
      }
      @media (min-width: 641px) {
        font-size: 1.5rem;
      }
    `,
    heading: css`
      text-align: center;
      font-size: 1.5rem;
      margin-top: 0px;
      @media (min-width: 641px) {
        font-size: 1.8rem;
      }
      @media (min-width: 961px) {
        font-size: 2rem;
      }
    `,
    hidable: css`
      display: flex;
      flex-direction: column;
      overflow: hidden;
      justify-content: space-between;
      max-height: ${isHiding ? '0px' : '2000px'};
      transition: max-height 0.5s;
    `,
  };

  return (
    <section css={styles.container} className={className}>
      <FontAwesomeIcon
        css={styles.icon}
        icon="chevron-right"
        role="button"
        aria-label="toggle collapse"
        tabIndex="0"
        onKeyPress={toggleHiding}
        onClick={toggleHiding}
      />
      <h3 css={styles.heading}>{heading}</h3>
      <div css={styles.hidable}>{children}</div>
    </section>
  );
};

ResumeSection.propTypes = {
  heading: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
    .isRequired,
  className: PropTypes.string,
};

ResumeSection.defaultProps = {
  className: null,
};

export default ResumeSection;
