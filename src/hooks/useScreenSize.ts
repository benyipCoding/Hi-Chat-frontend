import { useEffect, useState } from 'react';

export function useScreenSize(): () => boolean {
  return () => window.innerWidth >= 1024;
}

export function useShowExtra() {
  const [showExtraSideBox, setShowExtraSideBox] = useState<boolean>(false);
  function resizeEvent() {
    if (window.innerWidth >= 1535) {
      setShowExtraSideBox(true);
    } else {
      setShowExtraSideBox(false);
    }
  }

  useEffect(() => {
    resizeEvent();
    window.addEventListener('resize', resizeEvent);

    return () => {
      window.removeEventListener('resize', resizeEvent);
    };
  }, []);

  return {
    showExtraSideBox,
  };
}
