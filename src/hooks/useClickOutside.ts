import React, { useEffect, useRef } from 'react';

function useClickOutside(ref: React.RefObject<HTMLElement>, onClickOutside: () => void) {
  const onClickRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    onClickRef.current = onClickOutside;
  }, [onClickOutside]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickRef.current?.();
      }
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref]);
}

export default useClickOutside;
