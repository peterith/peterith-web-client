/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import PropTypes from 'prop-types';

const Pill = ({ children, className }) => {
  const { colours } = useTheme();

  const styles = {
    container: css`
      background: ${colours.primary.main};
      color: ${colours.onPrimary};
      border-radius: 20px;
      padding: 7px;
      margin: 5px;
      min-width: 40px;
      text-align: center;
    `,
  };

  return (
    <span css={styles.container} className={className}>
      {children}
    </span>
  );
};

Pill.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Pill.defaultProps = {
  className: null,
};

export default Pill;
