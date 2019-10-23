/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import PropTypes from 'prop-types';
import { ColourTypeEnum } from '../utils/enums';

const Heading = ({ colourType, children, className }) => {
  const { colours } = useTheme();

  const style = css`
    font-size: 1.3rem;
    color: ${colours[colourType].main};
  `;

  return (
    <h1 css={style} className={className}>
      {children}
    </h1>
  );
};

Heading.propTypes = {
  colourType: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.string.isRequired,
};

Heading.defaultProps = {
  colourType: ColourTypeEnum.PRIMARY,
  className: null,
};

export default Heading;
