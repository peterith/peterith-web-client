/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import PropTypes from 'prop-types';
import { useTheme } from 'emotion-theming';
import { ColourTypeEnum } from '../../utils/enums';

const InputButton = ({ colourType, value }) => {
  const { colours } = useTheme();

  const style = css`
    transition-duration: 0.5s;
    color: ${colours.white};
    height: 35px;
    padding: 0px 10px;
    margin: 5px 0px;
    border-radius: 500px;
    font-size: 0.8rem;
    font-weight: bold;
    cursor: pointer;
    background-color: ${colours[colourType].main};
    border: 2px solid;
    &:hover {
      background-color: ${colours[colourType].light};
    }
  `;

  return <input css={style} type="submit" value={value} />;
};

InputButton.propTypes = {
  colourType: PropTypes.string,
  value: PropTypes.string.isRequired,
};

InputButton.defaultProps = {
  colourType: ColourTypeEnum.SECONDARY,
};

export default InputButton;
