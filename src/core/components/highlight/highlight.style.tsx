import { createUseStyles } from 'react-jss';

import { useDefaultTheme } from '@/theme';
import { px } from '@/tools';

// import { MENU_SIZE } from '../menu/menu.style';
const MENU_SIZE = 0;
export const HIGHLIGHT_MARGIN = 176;
export const HIGHLIGHT_WIDTH = useDefaultTheme().screen.width - HIGHLIGHT_MARGIN * 2; //928
export const HIGHLIGHT_WIDTH_TOTAL = useDefaultTheme().screen.width;
export const HIGHLIGHT_HEIGHT = 522;

export const HighlightStyle = createUseStyles<any, any, any>({
  wrapper: {
    backgroundColor: ({ theme }) => theme.color.secondary,
    color: ({ theme }) => theme.color.primary,
    display: 'inline-block',
    float: 'left',
    height: px(HIGHLIGHT_HEIGHT),
    maxHeight: px(HIGHLIGHT_HEIGHT),
    padding: 0,
    position: 'relative',
    width: px(HIGHLIGHT_WIDTH_TOTAL),
  },
  active: {
    zIndex: 1,
    left: ({ position }) => {
      if (position !== null && position > 0) {
        return px(-position * HIGHLIGHT_WIDTH_TOTAL);
      }
      return 0;
    },
  },
  background: {
    position: 'absolute',
    top: 0,
    left: px(HIGHLIGHT_MARGIN),
  },
  overlayer: {
    background: ({ theme }) => `linear-gradient(to right, ${theme.color.secondary}, rgba(18,18,18,0 ))`,
    // visibility: 'hidden',
    position: 'absolute',
    zIndex: 1,
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  infoWrapper: {
    display: 'block',
    fontSize: ({ theme }) => px(theme.font.size['4']),
    left: px(MENU_SIZE + 20),
    lineHeight: 1.2,
    padding: px(8),
    position: 'relative',
    top: px(100),
    minHeight: px(150),
    whiteSpace: 'initial',
    width: px(HIGHLIGHT_WIDTH_TOTAL / 2),
    zIndex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: px(40),
    display: 'block',
  },
  headline: {
    fontSize: ({ theme }) => px(theme.font.size['3']),
    display: 'block',
    marginBottom: px(10),
  },
});
