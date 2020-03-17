/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState } from 'react';
import { useTheme } from 'emotion-theming';
import PropTypes from 'prop-types';

const Tooltip = ({ children }) => {
  const { colours } = useTheme();
  const [isVisible, setVisible] = useState(false);

  const tooltip = css`
    display: inline-block;
    position: relative;
  `;

  const text = css`
    visibility: hidden;
    min-width: 200px;
    padding: 5px;
    color: white;
    font-size: 0.8rem;
    background-color: ${colours.black};
    border-radius: 5px;
    position: absolute;
    left: 20px;
    bottom: 10px;
    opacity: 0;
    transition-property: opacity;
    transition-duration: 0.5s;
  `;

  const hidden = css`
    visibility: visible;
    opacity: 0.7;
  `;

  const handleMouseEnter = () => {
    setVisible(true);
  };

  const handleMouseLeave = () => {
    setVisible(false);
  };

  return (
    <div css={tooltip}>
      <span
        data-testid="tooltip"
        className="fas fa-info-circle"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      <div css={isVisible ? [text, hidden] : text}>{children}</div>
    </div>
  );
};

Tooltip.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Tooltip;
