import { useEffect } from 'react';

export type onWheelEvent = {
  up?(): void;
  down?(): void;
};

export function MouseWheelNavigation(onWheel: onWheelEvent, isActive: boolean = true) {
  const mouseWheel = (event: WheelEvent) => {
    if (event.deltaY < 0) {
      onWheel.up?.();
    }
    if (event.deltaY > 0) {
      onWheel.down?.();
    }
  };

  useEffect(() => {
    if (isActive) {
      window.addEventListener('wheel', mouseWheel);
    }
    return () => {
      window.removeEventListener('wheel', mouseWheel);
    };
  }, [isActive]);
}
