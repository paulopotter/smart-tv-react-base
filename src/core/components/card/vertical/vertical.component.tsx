import classNames from 'classnames';

import { useTheme } from '@/theme';
import { px } from '@/tools';

import type { Card } from '../card.component';
import { CARD_VERTICAL_HEIGHT, CARD_VERTICAL_WIDTH, CARD_VERTICAL_ZOOM, cardVerticalStyle } from './vertical.style';

type CardVertical = Omit<Card, 'type'> & {
  isActive?: boolean;
};

export function CardVertical({ image, variant = 'border-zoom', isActive }: CardVertical): JSX.Element | null {
  const theme = useTheme();
  const style = cardVerticalStyle({ theme });
  const activeZoom = (variant === 'zoom' || variant === 'border-zoom') && isActive;

  const activeStyle = {
    [style.border]: (variant === 'border' || variant === 'border-zoom') && isActive,
    [style.zoom]: activeZoom,
  };

  const defaultImageSize = {
    width: CARD_VERTICAL_WIDTH * (activeZoom ? CARD_VERTICAL_ZOOM : 1),
    height: CARD_VERTICAL_HEIGHT * (activeZoom ? CARD_VERTICAL_ZOOM : 1),
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
