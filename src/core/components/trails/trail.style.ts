import { createUseStyles } from 'react-jss';

import { px } from '@/tools';

import { CARD_HORIZONTAL_HEIGHT, CARD_VERTICAL_HEIGHT, getCardSize } from '../card/card.style';
import { HIGHLIGHT_HEIGHT, HIGHLIGHT_WIDTH } from '../highlight';

const MENU_SIZE = 0;
const HOME_PADDING_TOP = 0;

export const TRAIL_WIDTH = 1280;
export const TRAIL_TITLE_HEIGHT = 22;
export const TRAIL_TITLE_MARGIN_BOTTON = 14;

export const TRAIL_VERTICAL_HEIGHT = CARD_VERTICAL_HEIGHT + TRAIL_TITLE_HEIGHT + TRAIL_TITLE_MARGIN_BOTTON;
export const TRAIL_HORIZONTAL_HEIGHT = CARD_HORIZONTAL_HEIGHT + TRAIL_TITLE_HEIGHT + TRAIL_TITLE_MARGIN_BOTTON;

export const TRAIL_MARGIN_BOTTOM = 20;

export const TrailStyle = createUseStyles<string, any, any>(({ type }) => ({
  container: {
    paddingLeft: px(10),
    width: ({ type, totalItems, theme }) => {
      if (type === 'highlight') {
        return px(totalItems * (HIGHLIGHT_WIDTH + 10 + 20));
      }
      return px(theme.screen.width - MENU_SIZE);
    },
    whiteSpace: 'nowrap',
    marginBottom: px(TRAIL_MARGIN_BOTTOM),
  },
  highlight: {
    padding: 0,
    overflow: 'hidden',
    position: 'relative',
    left: px(-MENU_SIZE),
    height: px(HIGHLIGHT_HEIGHT),
    marginTop: px(-HOME_PADDING_TOP),
    // whiteSpace: 'nowrap',
  },
  cards: {
    margin: px(5),
  },
  [type]: {
    minHeight: px(getCardSize(type)),
  },
  trailTitle: {
    fontSize: px(16),
    fontWeight: 'bold',
    letterSpacing: 1.25,
    color: ({ theme }) => theme.text.secondary,
    margin: [0, 0, px(TRAIL_TITLE_MARGIN_BOTTON)],
    // margin: [px(24), 0, px(14)],
    padding: 0,
    height: px(TRAIL_TITLE_HEIGHT),
  },
  highlightBulletsWrapper: {
    position: 'absolute',
    top: px(HIGHLIGHT_HEIGHT - 30),
    left: px(HIGHLIGHT_WIDTH / 2),
    width: ({ totalItems }) => px((48 + 8) * totalItems),
    height: px(18),
    padding: 0,
    margin: 0,
    zIndex: 1,
  },
  highlightBullet: {
    position: 'relative',
    display: 'inline-block',
    width: px(48),
    height: px(6),
    marginRight: px(8),
    borderRadius: px(12),
    backgroundColor: ({ theme }) => theme.color.primary,
    opacity: 0.5,
  },
  highlightBulletActive: {
    opacity: 1,
  },
}));
