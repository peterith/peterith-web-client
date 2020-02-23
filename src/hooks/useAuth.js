import { useContext } from 'react';
import { AuthContext } from '../context';

export default () => {
  return useContext(AuthContext);
};
