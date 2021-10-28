import { RefObject, useEffect } from 'react';

export const useOutsideAlerter = (ref: RefObject<HTMLElement>, onClose: () => void) => {
  useEffect(() => {
    const handleClick = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [ref, onClose]);
};
