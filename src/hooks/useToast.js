import { useContext } from 'react';
import { ToastContext } from '../context';

const useToast = () => {
  return useContext(ToastContext);
};

export default useToast;
