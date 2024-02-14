/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
import classNames from 'classnames';
import { useState } from 'react';

import { onNavigate } from '@/core/services';
import { useTheme } from '@/theme';
import { adaptResolution } from '@/tools';

import { Button } from '../button';
import { cardStyle, getCardSize } from './card.style';
import type { SupportedCards } from './card.tool';

export type Card = {
  type?: SupportedCards;
  active?: boolean;
  variant?: 'border' | 'zoom' | 'border-zoom';
  title?: string;
  navigate?: onNavigate;
  image?: {
    src: string;
    width?: number;
    height?: number;
  };
  extraClass?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

export function Card({
  title = '',
  image,
  variant = 'border-zoom',
  active,
  type = 'vertical',
  extraClass,
  navigate,
  onMouseEnter: parentMouseEnter,
  onMouseLeave: parentMouseLeave,
}: Card): JSX.Element | null {
  if (!['vertical', 'horizontal'].includes(type)) {
    return null;
  }

  const [isMouseActive, setIsMouseActive] = useState(false);
  const theme = useTheme();
  const style = cardStyle({ type: type, theme });
  const activeZoom = (variant === 'zoom' || variant === 'border-zoom') && (active || isMouseActive);

  const size = (type: SupportedCards) => ({
    height: getCardSize(type, { hasZoom: activeZoom }),
    width: getCardSize(type, { hasZoom: activeZoom, size: 'width' }),
  });

  const activeStyle = [
    {
      [style.border]: (variant === 'border' || variant === 'border-zoom') && (active || isMouseActive),
      [style.zoom]: activeZoom,
    },
    style.container,
    style.active,
    extraClass ?? '',
  ];

  const mouseEnterEvent = () => {
    if (parentMouseEnter) {
      return parentMouseEnter();
    }
    setIsMouseActive(true);
  };

  const mouseLeaveEvent = () => {
    if (parentMouseLeave) {
      return parentMouseLeave();
    }
    setIsMouseActive(false);
  };

  const clickEvent = () => navigate?.onEnter?.();

  return (
    <Button
      data-active={active}
      data-type={type}
      data-variant={variant}
      extraClass={classNames(activeStyle)}
      active={active}
      navigate={navigate}
      onMouseEnter={mouseEnterEvent}
      onMouseLeave={mouseLeaveEvent}
      onClick={clickEvent}
    >
      <img
        src={image?.src}
        alt={title}
        width={adaptResolution(image?.width ?? size(type).width)}
        height={adaptResolution(image?.height ?? size(type).height)}
      />
    </Button>
  );
}
