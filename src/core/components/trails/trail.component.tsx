import classNames from 'classnames';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { px } from '@/tools';

import { type onNavigate } from '../../services';
import { getNextPosition } from '../../tools';
import { Card, type SupportedCards } from '../card';
import { TrailStyle } from './trail.style';

type TrailProps = {
  type?: SupportedCards;
  items: any[];
  active?: boolean;
  navigate?: onNavigate;
  trailKey?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

export function Trail({
  type = 'vertical',
  items,
  active: isActive = false,
  navigate,
  trailKey = '',
  onMouseEnter: parentMouseEnter,
  onMouseLeave: parentMouseLeave,
}: TrailProps): JSX.Element | null {
  if (items?.length <= 0) {
    return null;
  }

  const [activeItem, setActiveItem] = useState(0);
  const [horizontalScroll, setHorizontalScroll] = useState(0);
  const routeNavigate = useNavigate();
  const totalItems = items.length - 1;

  const style = TrailStyle();
  const styles = {
    [style.container]: true,
    [style.horizontal]: type === 'horizontal',
    [style.vertical]: type === 'vertical',
  };

  const onNavigate: onNavigate = {
    ...navigate,
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
    onDown: navigate?.onDown,
    onUp: navigate?.onUp,
  };

  function buildTrail(item: Record<string, any>, index: number) {
    const onEnterNavigation = () => routeNavigate(item.navigate.to);
    const onMouseEnter = () => setActiveItem(index);
    return (
      <Card
        title={item.title}
        image={{ src: item.poster }}
        type={type}
        key={`${index}-trail-${trailKey}`}
        active={activeItem === index && isActive}
        extraClass={style.cards}
        navigate={{
          ...onNavigate,
          onEnter: onEnterNavigation,
        }}
        onMouseEnter={onMouseEnter}
      />
    );
  }

  const trailContent = items.filter((item) => item.uuid).map(buildTrail);

  return (
    <div
      className={classNames(styles)}
      data-active={isActive}
      onMouseEnter={parentMouseEnter}
      onMouseLeave={parentMouseLeave}
    >
      <div style={{ marginLeft: px(horizontalScroll) }}>{trailContent}</div>
    </div>
  );
}
