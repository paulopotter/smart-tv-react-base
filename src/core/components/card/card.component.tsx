import classNames from 'classnames';

import { useTheme } from '@/theme';
import { px } from '@/tools';

import {
  CARD_HORIZONTAL_HEIGHT,
  CARD_HORIZONTAL_WIDTH,
  CARD_HORIZONTAL_ZOOM,
  CARD_VERTICAL_HEIGHT,
  CARD_VERTICAL_WIDTH,
  CARD_VERTICAL_ZOOM,
  cardStyle,
} from './card.style';

export type Card = {
  type?: 'vertical' | 'horizontal';
  active?: boolean;
  variant?: 'border' | 'zoom' | 'border-zoom';
  image?: {
    src: string;
    width?: number;
    height?: number;
    alt?: string;
  };
  extraClass?: string;
};

export function Card({
  image,
  variant = 'border-zoom',
  active,
  type = 'vertical',
  extraClass,
}: Card): JSX.Element | null {
  if (!['vertical', 'horizontal'].includes(type)) {
    return null;
  }

  const theme = useTheme();
  const style = cardStyle({ type: type, theme });
  const activeZoom = (variant === 'zoom' || variant === 'border-zoom') && active;

  const size: Record<string, Record<string, number>> = {
    vertical: {
      width: CARD_VERTICAL_WIDTH * (activeZoom ? CARD_VERTICAL_ZOOM : 1),
      height: CARD_VERTICAL_HEIGHT * (activeZoom ? CARD_VERTICAL_ZOOM : 1),
    },
    horizontal: {
      width: CARD_HORIZONTAL_WIDTH * (activeZoom ? CARD_HORIZONTAL_ZOOM : 1),
      height: CARD_HORIZONTAL_HEIGHT * (activeZoom ? CARD_HORIZONTAL_ZOOM : 1),
    },
  };

  const activeStyle = [
    {
      [style.border]: (variant === 'border' || variant === 'border-zoom') && active,
      [style.zoom]: activeZoom,
    },
    style.container,
    extraClass ?? '',
  ];

  return (
    <div className={classNames(activeStyle)} data-active={active} data-type={type} data-variant={variant}>
      <img
        src={image?.src}
        alt={image?.alt ?? ''}
        width={px(image?.width ?? size[type].width)}
        height={px(image?.height ?? size[type].height)}
      />
    </div>
  );
}
