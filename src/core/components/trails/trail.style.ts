import { createUseStyles } from 'react-jss';

import { px } from '@/tools';

import { getCardSize } from '../card/card.style';

export const TRAIL_WIDTH = 1280;

export const TrailStyle = createUseStyles<string, any, any>(({ type }) => ({
  container: {
    background: 'gray',
    padding: px(10),
    width: px(TRAIL_WIDTH),
  },
  cards: {
    margin: px(5),
  },
  [type]: {
    minHeight: px(getCardSize(type)),
  },
}));
