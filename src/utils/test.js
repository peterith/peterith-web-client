/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render } from '@testing-library/react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '../context';

const wrapper = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

wrapper.propTypes = {
  children: PropTypes.element.isRequired,
};

const customRender = (ui, options) => {
  return render(ui, { wrapper, ...options });
};

export * from '@testing-library/react';
export * from '@testing-library/jest-dom';
export { customRender as render };
