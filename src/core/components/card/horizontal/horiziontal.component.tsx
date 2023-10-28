import classNames from 'classnames';

import { useTheme } from '@/theme';
import { px } from '@/tools';

import type { Card } from '../card.component';
import {
  CARD_HORIZONTAL_HEIGHT,
  CARD_HORIZONTAL_WIDTH,
  CARD_HORIZONTAL_ZOOM,
  cardHorizontalStyle,
} from './horizontal.style';

type CardHorizontal = Omit<Card, 'type'> & {
  isActive?: boolean;
};

export function CardHorizontal({ image, variant = 'border-zoom', isActive }: CardHorizontal): JSX.Element | null {
  const theme = useTheme();
  const style = cardHorizontalStyle({ theme });
  const activeZoom = (variant === 'zoom' || variant === 'border-zoom') && isActive;

  const activeStyle = {
    [style.border]: (variant === 'border' || variant === 'border-zoom') && isActive,
    [style.zoom]: activeZoom,
  };

  const defaultImageSize = {
    width: CARD_HORIZONTAL_WIDTH * (activeZoom ? CARD_HORIZONTAL_ZOOM : 1),
    height: CARD_HORIZONTAL_HEIGHT * (activeZoom ? CARD_HORIZONTAL_ZOOM : 1),
  };

  return (
    <div className={classNames(activeStyle)}>
      <img
        src={image?.src}
        alt={image?.alt ?? ''}
        width={px(image?.width ?? defaultImageSize.width)}
        height={px(image?.height ?? defaultImageSize.height)}
      />
    </div>
  );
}
