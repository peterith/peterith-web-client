import { useRef, useEffect } from 'react';

const useClickOutside = (state, callback) => {
  const node = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!node.current.contains(event.target)) {
        callback();
      }
    };

    if (state) {
      document.addEventListener('mousedown', handleClickOutside, false);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside, false);
    };
  }, [state, callback]);

  return node;
};

export default useClickOutside;
