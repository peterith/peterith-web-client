/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import PropTypes from 'prop-types';
import { ColourTypeEnum } from '../utils/enums';

const getFontSize = (headingLevel) => {
  switch (headingLevel) {
    case 1:
      return '2rem';
    case 2:
      return '1.5rem';
    default:
      return '1rem';
  }
};

const Heading = ({ headingLevel, colourType, children, className }) => {
  const { colours } = useTheme();

  const style = css`
    font-size: ${getFontSize(headingLevel)};
    color: ${colours[colourType].main};
  `;

  const Tag = `h${headingLevel}`;

  return (
    <Tag css={style} className={className}>
      {children}
    </Tag>
  );
};

Heading.propTypes = {
  headingLevel: PropTypes.number.isRequired,
  colourType: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.string.isRequired,
};

Heading.defaultProps = {
  colourType: ColourTypeEnum.PRIMARY,
  className: null,
};

export default Heading;
