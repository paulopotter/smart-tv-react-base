import { createUseStyles } from 'react-jss';

import { border, px } from '@/tools';

export const CARD_HORIZONTAL_HEIGHT = 80;
export const CARD_HORIZONTAL_WIDTH = 120;
export const CARD_HORIZONTAL_ZOOM = 1.05;

export const cardHorizontalStyle = createUseStyles((theme) => ({
  image: {
    height: px(CARD_HORIZONTAL_HEIGHT),
    width: px(CARD_HORIZONTAL_WIDTH),
  },
  border: {
    border: border(2, theme.color.border ?? theme.color.white),
  },
  zoom: {
    height: px(CARD_HORIZONTAL_HEIGHT * CARD_HORIZONTAL_ZOOM),
    width: px(CARD_HORIZONTAL_WIDTH * CARD_HORIZONTAL_ZOOM),
  },
}));
