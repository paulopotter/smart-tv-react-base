import { px } from '@/tools';

export const globalStyles = (Theme: any) => ({
  '@global': {
    html: {
      background: Theme.color.black,
      color: Theme.color.white,
      width: px(window.innerWidth),
      height: px(window.innerHeight),
      overflow: 'hidden',
      padding: 0,
    },
    body: {
      background: Theme.color.black,
      color: Theme.color.white,
      width: px(window.innerWidth),
      height: px(window.innerHeight),
      overflow: 'hidden',
      padding: 0,
    },
  },
});
