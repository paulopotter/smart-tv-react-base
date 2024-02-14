import { useCallback, useEffect } from 'react';

import { PCKeys } from './pc.key';
import { TizenKeys } from './tizen.key';
import { WebosKeys } from './webos.key';

export type onNavigate = {
  onEnter?(value?: unknown): void;
  onBack?(value?: unknown): void;
  onLeft?(value?: unknown): void;
  onRight?(value?: unknown): void;
  onTop?(value?: unknown): void;
  onDown?(value?: unknown): void;
  onUp?(value?: unknown): void;
  onPlay?(value?: unknown): void;
  onPause?(value?: unknown): void;
  onStop?(value?: unknown): void;
  onForward?(value?: unknown): void;
  onRewind?(value?: unknown): void;
  onColor?(color: string): void;
};

type KeyMapping = Record<string, string>;

export function ScreenNavigation(isActive: boolean, onNavigate?: onNavigate) {
  if (onNavigate === undefined || Object.keys(onNavigate)?.length === 0) {
    return;
  }

  const handleUserKeyPress = useCallback(
    (event: KeyboardEvent) => {
      switch (KeyCodeAdapter(event)) {
        case 'UP':
          event.preventDefault();
          onNavigate?.onUp?.();
          break;
        case 'DOWN':
          event.preventDefault();
          onNavigate?.onDown?.();
          break;
        case 'LEFT':
          event.preventDefault();
          onNavigate?.onLeft?.();
          break;
        case 'RIGHT':
          event.preventDefault();
          onNavigate?.onRight?.();
          break;
        case 'ENTER':
          event.preventDefault();
          onNavigate?.onEnter?.();
          break;
        case 'BACK':
          event.preventDefault();
          onNavigate?.onBack?.();
          break;
        case 'RED':
          event.preventDefault();
          onNavigate?.onColor?.('red');
          break;
        case 'BLUE':
          event.preventDefault();
          onNavigate?.onColor?.('blue');
          break;
        case 'YELLOW':
          event.preventDefault();
          onNavigate?.onColor?.('yellow');
          break;
        case 'GREEN':
          event.preventDefault();
          onNavigate?.onColor?.('green');
          break;
        case 'PLAY':
        case 'PAUSE':
        case 'PLAY_PAUSE':
          event.preventDefault();
          onNavigate?.onPlay?.();
          break;

        default:
          console.debug(`key ${event.keyCode} not recognize`);
          break;
      }
    },
    [onNavigate],
  );

  useEffect(() => {
    if (isActive) {
      window.addEventListener('keydown', handleUserKeyPress);
    }
    return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
    };
  }, [handleUserKeyPress, isActive]);
}

export function KeyCodeAdapter(event: KeyboardEvent) {
  const { keyCode } = event;

  const TvOs: string = window?.SmartTvOS || 'pc';

  const keyMapping: KeyMapping = {
    tizen: TizenKeys,
    webos: WebosKeys,
    pc: PCKeys,
  }[TvOs]!;

  return keyMapping[keyCode];
}
