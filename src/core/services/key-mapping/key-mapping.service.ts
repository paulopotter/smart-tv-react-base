import { useCallback, useEffect } from 'react';

import { PCKeys } from './pc.key';
import { TizenKeys } from './tizen.key';
import { WebosKeys } from './webos.key';

export type onNavigate = {
  onEnter?(): void;
  onBack?(): void;
  onLeft?(): void;
  onRight?(): void;
  onTop?(): void;
  onDown?(): void;
  onUp?(): void;
};

type KeyMapping = Record<string, string>;

export function ScreenNavigation(isActive: boolean, onNavigate: onNavigate) {
  const handleUserKeyPress = useCallback((event: KeyboardEvent) => {
    event.preventDefault();
    const { keyCode } = event;

    const TvOs: string = window?.SmartTvOS || 'pc';

    const keyMapping: KeyMapping = {
      tizen: TizenKeys,
      webos: WebosKeys,
      pc: PCKeys,
    }[TvOs]!;

    if (keyMapping?.[keyCode] === 'UP') {
      onNavigate?.onUp?.();
      event.stopPropagation();
    } else if (keyMapping?.[keyCode] === 'DOWN') {
      onNavigate?.onDown?.();
      event.stopPropagation();
    } else if (keyMapping?.[keyCode] === 'LEFT') {
      onNavigate?.onLeft?.();
      event.stopPropagation();
    } else if (keyMapping?.[keyCode] === 'RIGHT') {
      onNavigate?.onRight?.();
      event.stopPropagation();
    } else if (keyMapping?.[keyCode] === 'ENTER') {
      onNavigate?.onEnter?.();
      event.stopPropagation();
    } else if (keyMapping?.[keyCode] === 'BACK') {
      onNavigate?.onBack?.();
      event.stopPropagation();
    } else {
      console.debug(`key ${keyCode} not recognize`);
    }
  }, []);

  useEffect(() => {
    if (isActive) {
      window.addEventListener('keydown', handleUserKeyPress);
      // console.debug('event active');
    } else {
      return () => {
        window.removeEventListener('keydown', handleUserKeyPress);
        // console.debug('event destroyed');
      };
    }
  }, [handleUserKeyPress, isActive]);
}
