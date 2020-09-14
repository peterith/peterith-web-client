/** @jsx jsx */
import { jsx, css, Global } from '@emotion/core';
import { createContext, useState } from 'react';
import { ThemeProvider } from 'emotion-theming';
import PropTypes from 'prop-types';

const DarkModeContext = createContext();

const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setDarkMode] = useState(
    localStorage.getItem('isDarkMode') === 'true' || !localStorage.getItem('isDarkMode'),
  );

  const colours = {
    primary: {
      main: '#f25e5e',
      dark: '#d73e3e',
      light: '#f0a0a2',
    },
    secondary: {
      main: '#4d5389',
      dark: '#3d4070',
      light: '#858cb1',
    },
    success: '#4fb',
    black: '#313147',
    white: '#fff',
    fitbit: {
      main: '#49AEB5',
      dark: '#3e8486',
    },
  };

  const darkMode = {
    colours: {
      ...colours,
      background: '#121212',
      surface: {
        low: 'rgba(255, 255, 255, 0.07)',
        high: 'rgba(255, 255, 255, 0.16)',
      },
      backgroundt: {
        primary: '#121212',
        secondary: '#2e4055',
      },
      text: '#ededed',
      onPrimary: '#000',
    },
  };

  const lightMode = {
    colours: {
      ...colours,
      background: {
        primary: '#fff',
        secondary: '#fff',
      },
      text: '#313147',
    },
  };

  const style = css`
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
        'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
      background-color: ${isDarkMode ? darkMode.colours.background : lightMode.colours.background};
      color: ${isDarkMode ? darkMode.colours.text : lightMode.colours.text};
      margin: 0px;
      transition: background-color 0.3s;
    }
    p {
      line-height: 1.5rem;
    }
    div,
    svg {
      outline: none;
    }
  `;

  const toggleDarkMode = () => {
    setDarkMode((previousIsDarkMode) => {
      const value =
        localStorage.getItem('isDarkMode') === 'true' || !localStorage.getItem('isDarkMode')
          ? 'false'
          : 'true';
      localStorage.setItem('isDarkMode', value);
      return !previousIsDarkMode;
    });
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      <Global styles={style} />
      <ThemeProvider theme={isDarkMode ? darkMode : lightMode}>{children}</ThemeProvider>
    </DarkModeContext.Provider>
  );
};

DarkModeProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export { DarkModeContext, DarkModeProvider };
