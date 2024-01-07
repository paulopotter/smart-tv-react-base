import classNames from 'classnames';

import { useTheme } from '@/theme';
import { px } from '@/tools';

import { cardStyle, getCardSize } from './card.style';
import type { SupportedCards } from './card.tool';

export type Card = {
  type?: SupportedCards;
  active?: boolean;
  variant?: 'border' | 'zoom' | 'border-zoom';
  title?: string;
  image?: {
    src: string;
    width?: number;
    height?: number;
  };
  extraClass?: string;
};

export function Card({
  title = '',
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

  const size = (type: SupportedCards) => ({
    height: getCardSize(type, { hasZoom: activeZoom }),
    width: getCardSize(type, { hasZoom: activeZoom, size: 'width' }),
  });

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
        alt={title}
        width={px(image?.width ?? size(type).width)}
        height={px(image?.height ?? size(type).height)}
      />
    </div>
  );
}
