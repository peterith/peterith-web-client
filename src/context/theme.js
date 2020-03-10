/** @jsx jsx */
import { jsx, css, Global } from '@emotion/core';
import { createContext } from 'react';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import PropTypes from 'prop-types';
import { useToggle } from '../hooks';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [isDarkMode, toggleDarkMode] = useToggle(true);

  const darkMode = {
    colours: {
      primary: { main: '#f25e5e', dark: '#d73e3e', light: '#f0a0a2' },
      secondary: { main: '#4d5389', dark: '#3d4070', light: '#858cb1' },
      success: '#4fb',
      black: '#313147',
      white: '#fff',
      background: '#1c2c3d',
      text: '#ededed',
    },
  };

  const lightMode = {
    colours: {
      primary: { main: '#f25e5e', dark: '#d73e3e', light: '#f0a0a2' },
      secondary: { main: '#4d5389', dark: '#3d4070', light: '#858cb1' },
      success: '#4fb',
      black: '#313147',
      white: '#fff',
      background: '#fff',
      text: '#313147',
    },
  };

  const style = css`
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
        'Droid Sans', 'Helvetica Neue', sans-serif;
      background-color: ${isDarkMode ? darkMode.colours.background : lightMode.colours.background};
      color: ${isDarkMode ? darkMode.colours.text : lightMode.colours.text};
      margin: 0px;
      transition: background-color 0.3s;
      user-select: none;
    }
    p {
      line-height: 1.5rem;
    }
    span {
      outline: none;
    }
  `;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      <Global styles={style} />
      <EmotionThemeProvider theme={isDarkMode ? darkMode : lightMode}>{children}</EmotionThemeProvider>
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = { children: PropTypes.element.isRequired };

export { ThemeContext, ThemeProvider };
