import { Theme } from './theme';

export const globalStyles = {
  '@global': {
    html: {
      background: Theme.color.black,
      color: Theme.color.white,
      width: `${window.innerWidth}px`,
      height: `${window.innerHeight}px`,
      overflow: 'hidden',
      padding: 0,
    },
    body: {
      background: Theme.color.black,
      color: Theme.color.white,
      width: `${window.innerWidth}px`,
      height: `${window.innerHeight}px`,
      overflow: 'hidden',
      padding: 0,
    },
  },
};
