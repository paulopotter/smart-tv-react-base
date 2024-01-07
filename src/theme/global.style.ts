import { px } from '@/tools';

import { Theme } from './theme.style';

export const globalStyles = {
  '@global': {
    html: {
      background: `${Theme.color.secondary} !important`,
      color: Theme.color.primary,
      width: px(Theme.screen.width),
      height: px(Theme.screen.height),
      overflow: 'hidden',
      padding: 0,
    },
    body: {
      background: `${Theme.color.secondary} !important`,
      color: `${Theme.color.primary} !important`,
      width: px(Theme.screen.width),
      height: px(Theme.screen.height),
      overflow: 'hidden',
      padding: 0,
      margin: 0,
    },
    '#root': {
      position: 'relative',
      width: px(Theme.screen.width),
      height: px(Theme.screen.height),
      display: 'block',
      overflow: 'hidden',
      padding: 0,
    },
    '*': {
      'font-family': Theme.font.family,
      outline: 'none',
      'box-sizing': 'content-box',
    },
  },
};
