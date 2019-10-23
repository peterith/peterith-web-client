import { useContext } from 'react';
import { ModalContext } from '../context';

export default () => {
  return useContext(ModalContext);
};
