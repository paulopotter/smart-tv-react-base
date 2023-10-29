import { createUseStyles } from 'react-jss';

import { px } from '@/tools';

import { CARD_HORIZONTAL_HEIGHT, CARD_VERTICAL_HEIGHT } from '../card/card.style';

export const TRAIL_WIDTH = 1280;

export const TrailStyle = createUseStyles({
  container: {
    background: 'gray',
    padding: px(10),
    width: px(TRAIL_WIDTH),
  },
  cards: {
    margin: px(5),
  },
  horizontal: {
    minHeight: px(CARD_HORIZONTAL_HEIGHT),
  },
  vertical: {
    minHeight: px(CARD_VERTICAL_HEIGHT),
  },
});
