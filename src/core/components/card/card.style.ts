import { createUseStyles } from 'react-jss';

import { border, px } from '@/tools';

export const CARD_VERTICAL_HEIGHT = 210;
export const CARD_VERTICAL_WIDTH = 160;
export const CARD_VERTICAL_ZOOM = 1.05;

export const CARD_HORIZONTAL_HEIGHT = 110;
export const CARD_HORIZONTAL_WIDTH = 220;
export const CARD_HORIZONTAL_ZOOM = 1.05;

export const cardStyle = createUseStyles<string, any, any>({
  container: {
    display: 'inline-block',
    height: ({ type }) => px(type === 'horizontal' ? CARD_HORIZONTAL_HEIGHT : CARD_VERTICAL_HEIGHT),
    width: ({ type }) => px(type === 'horizontal' ? CARD_HORIZONTAL_WIDTH : CARD_VERTICAL_WIDTH),
  },

  image: {
    display: 'block',
  },
  border: {
    border: ({ theme }) => border(2, theme?.color?.border ?? theme?.color?.white ?? 'yellow'),
  },
  zoom: {
    height: ({ type }) =>
      px(
        type === 'horizontal'
          ? CARD_HORIZONTAL_HEIGHT * CARD_HORIZONTAL_ZOOM
          : CARD_VERTICAL_HEIGHT * CARD_VERTICAL_ZOOM,
      ),
    width: ({ type }) => {
      return px(
        type === 'horizontal' ? CARD_HORIZONTAL_WIDTH * CARD_HORIZONTAL_ZOOM : CARD_VERTICAL_WIDTH * CARD_VERTICAL_ZOOM,
      );
    },
  },
});
