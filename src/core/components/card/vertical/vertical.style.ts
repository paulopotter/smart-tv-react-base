import { createUseStyles } from 'react-jss';

import { border, px } from '@/tools';

export const CARD_VERTICAL_HEIGHT = 120;
export const CARD_VERTICAL_WIDTH = 80;
export const CARD_VERTICAL_ZOOM = 1.05;

export const cardVerticalStyle = createUseStyles((theme) => ({
  image: {
    height: px(CARD_VERTICAL_HEIGHT),
    width: px(CARD_VERTICAL_WIDTH),
  },
  border: {
    border: border(2, theme.color.border ?? theme.color.white),
  },
  zoom: {
    height: px(CARD_VERTICAL_HEIGHT * CARD_VERTICAL_ZOOM),
    width: px(CARD_VERTICAL_WIDTH * CARD_VERTICAL_ZOOM),
  },
}));
