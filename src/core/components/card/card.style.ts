import { createUseStyles } from 'react-jss';

import { border, px } from '@/tools';

import { isHorizontalCard, SupportedCards } from './card.tool';

export const CARD_VERTICAL_HEIGHT = 210;
export const CARD_VERTICAL_WIDTH = 160;
export const CARD_VERTICAL_ZOOM = 1.05;

export const CARD_HORIZONTAL_HEIGHT = 110;
export const CARD_HORIZONTAL_WIDTH = 220;
export const CARD_HORIZONTAL_ZOOM = 1.05;

export const CARD_MARGIN_RIGHT = 10;

export const cardStyle = createUseStyles<string, any, any>({
  container: {
    position: 'relative',
    display: 'inline-block',
    verticalAlign: 'middle',
    overflow: 'hidden',
    borderRadius: px(12),
    marginRight: px(CARD_MARGIN_RIGHT),
    height: ({ type }) => px(getCardSize(type)),
    width: ({ type }) => px(getCardSize(type, { size: 'width' })),
  },

  image: {
    display: 'block',
  },
  border: {
    border: ({ theme }) => border(2, theme?.color?.border ?? theme?.color?.primary ?? theme?.color?.white),
  },
  zoom: {
    height: ({ type }) => px(getCardSize(type, { hasZoom: true })),
    width: ({ type }) => px(getCardSize(type, { hasZoom: true, size: 'width' })),
  },
});

export const progressStyle = createUseStyles<string, any, any>({
  wrapper: {
    position: 'absolute',
    width: '94%',
    left: px(6),
    right: px(6),
    bottom: px(6),
    content: '',
    backgroundColor: 'rgba(255,255,255, 0.84)',
    height: px(4),
    borderRadius: px(6),
  },
  in: {
    borderRadius: px(6),
    display: 'block',
    height: '100%',
    content: '',
    width: ({ percent }) => `${percent}%`,
    backgroundColor: '#FF0E0E',
  },
});

type getCardSizeProps = (
  type: SupportedCards,
  config?: {
    hasZoom?: boolean;
    size?: 'width' | 'height';
  },
) => number;

export const getCardSize: getCardSizeProps = (type, { ...configs }) => {
  const { hasZoom = false, size = 'height' } = configs;

  let multiplyBy = 1;

  if (isHorizontalCard(type) === true) {
    if (hasZoom) {
      multiplyBy = CARD_HORIZONTAL_ZOOM;
    }
    if (size === 'width') {
      return CARD_HORIZONTAL_WIDTH * multiplyBy;
    }
    return CARD_HORIZONTAL_HEIGHT * multiplyBy;
  }

  if (hasZoom) {
    multiplyBy = CARD_VERTICAL_ZOOM;
  }

  if (size === 'width') {
    return CARD_VERTICAL_WIDTH * multiplyBy;
  }
  return CARD_VERTICAL_HEIGHT * multiplyBy;
};
