import classNames from 'classnames';
import { useState } from 'react';

import { type onNavigate, ScreenNavigation } from '../../services';
import { Card } from '../card';
import { TrailStyle } from './trail.style';

type TrailProps = {
  type?: 'vertical' | 'horizontal';
  items: any[];
  active?: boolean;
  navigate?: onNavigate;
};

export function Trail({ type = 'vertical', items, active = false, navigate }: TrailProps): JSX.Element | null {
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
      setActiveItem((prevItem) => Math.min(prevItem + 1, totalItems));
    },
    onLeft() {
      if (activeItem - 1 < 0) {
        navigate?.onLeft?.();
      }
      setActiveItem((prevItem) => Math.max(prevItem - 1, 0));
    },
    onDown() {
      navigate?.onDown?.();
    },
    onUp() {
      navigate?.onUp?.();
    },
  };

  ScreenNavigation(active, onNavigate);

  const content = items?.map((item, index) => {
    return (
      <Card
        image={{ src: item.src, alt: item.title }}
        type={type}
        key={index}
        active={activeItem === index && active}
        extraClass={style.cards}
      />
    );
  });

  return (
    (
      <div className={classNames(styles)} data-active={active}>
        {content}
      </div>
    ) || null
  );
}
