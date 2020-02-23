import { useContext } from 'react';
import { ToastContext } from '../context';

export default () => {
  return useContext(ToastContext);
};
