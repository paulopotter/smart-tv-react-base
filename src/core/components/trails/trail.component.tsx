import classNames from 'classnames';
import { useState } from 'react';

import { type onNavigate, ScreenNavigation } from '../../services';
import { getNextPosition } from '../../tools';
import { Card, type SupportedCards } from '../card';
import { TrailStyle } from './trail.style';

type TrailProps = {
  type?: SupportedCards;
  items: any[];
  active?: boolean;
  navigate?: onNavigate;
  trailKey?: string;
};

export function Trail({
  type = 'vertical',
  items,
  active = false,
  navigate,
  trailKey = '',
}: TrailProps): JSX.Element | null {
  const [activeItem, setActiveItem] = useState(0);
  const totalItems = items.length - 1;

  const style = TrailStyle();
  const styles = {
    [style.container]: true,
    [style.horizontal]: type === 'horizontal',
    [style.vertical]: type === 'vertical',
  };

  const onNavigate: onNavigate = {
    onRight() {
      if (activeItem + 1 > totalItems) {
        navigate?.onRight?.();
      }
      setActiveItem((prevItem) => getNextPosition(prevItem, totalItems, 'right'));
    },
    onLeft() {
      if (activeItem - 1 < 0) {
        navigate?.onLeft?.();
      }
      setActiveItem((prevItem) => getNextPosition(prevItem, 0, 'left'));
    },
    onDown() {
      navigate?.onDown?.();
    },
    onUp() {
      navigate?.onUp?.();
    },
  };

  ScreenNavigation(active, onNavigate);

  return (
    <div className={classNames(styles)} data-active={active}>
      <TrailContent
        items={items}
        active={active}
        type={type}
        style={style.cards}
        activeItem={activeItem}
        keyIdentify={trailKey}
      />
    </div>
  );
}

function TrailContent({ items, style, type, active: isActive, activeItem, keyIdentify = '' }: any) {
  return items?.map((item: any, index: number) => {
    return (
      <Card
        title={item.title}
        image={{ src: item.src }}
        type={type}
        key={`${index}-trail-${keyIdentify}`}
        active={activeItem === index && isActive}
        extraClass={style}
      />
    );
  });
}
