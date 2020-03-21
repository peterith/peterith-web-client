import { useState } from 'react';

const useHover = () => {
  const [isHovering, setIsHovering] = useState(false);
  const props = {
    onMouseEnter: () => {
      setIsHovering(true);
    },
    onMouseLeave: () => {
      setIsHovering(false);
    },
  };
  return [isHovering, props];
};

export default useHover;
