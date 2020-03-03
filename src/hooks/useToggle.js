import { useState } from 'react';

const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);
  return [state, () => setState((prevState) => !prevState)];
};

export default useToggle;
