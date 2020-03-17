import { useContext } from 'react';
import { DarkModeContext } from '../context';

const useDarkMode = () => {
  return useContext(DarkModeContext);
};

export default useDarkMode;
