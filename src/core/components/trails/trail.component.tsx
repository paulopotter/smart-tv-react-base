/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import classNames from 'classnames';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useThemeStoreInContext } from '@/theme';
import { px } from '@/tools';

import { type onNavigate, ScreenNavigation } from '../../services/key-mapping';
import { cardinalNavigation } from '../../tools';
import { Card, CARD_MARGIN_RIGHT, getCardSize, isSupportedContent, type SupportedCards } from '../card';
import { Highlight, HIGHLIGHT_WIDTH } from '../highlight';
import { TrailStyle } from './trail.style';

type TrailProps = {
  type?: 'highlight' | SupportedCards;
  items: any[];
  active?: boolean;
  navigate?: onNavigate;
  trailKey?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  title?: string;
};

export function Trail({
  type = 'title',
  items,
  active: isActive = false,
  navigate,
  trailKey = '',
  onMouseEnter: parentMouseEnter,
  onMouseLeave: parentMouseLeave,
  title,
}: TrailProps): JSX.Element | null {
  if (items?.length <= 0) {
    return null;
  }

  const [activeItem, setActiveItem] = useState(0);
  const [horizontalScroll, setHorizontalScroll] = useState(0);
  const routeNavigate = useNavigate();
  const totalItems = items.length - 1;

  const theme = useThemeStoreInContext('theme');
  const style = TrailStyle({
    totalItems: items?.length,
    type,
    theme,
  });
  const styles = {
    [style.container]: true,
    [style.horizontal]: type === 'horizontal',
    [style.vertical]: type === 'vertical',
    [style.highlight]: type === 'highlight',
  };

  const onNavigate: onNavigate = {
    ...navigate,
    onRight() {
      if (activeItem + 1 > totalItems) {
        navigate?.onRight?.();
      }
      setActiveItem((prevCardItem) => {
        const cardItem = Math.min(prevCardItem + 1, totalItems);

        if (type !== 'highlight' && prevCardItem + 1 <= totalItems) {
          setHorizontalScroll((prevHorizontalScroll) => {
            return moveHorizontal(prevHorizontalScroll, type, 'right', cardItem);
          });
        }

        return cardItem;
      });
    },
    onLeft() {
      if (activeItem - 1 < 0) {
        navigate?.onLeft?.();
        setHorizontalScroll(0);
      }
      setActiveItem((prevCardItem) => {
        const cardItem = Math.max(prevCardItem - 1, 0);

        if (type !== 'highlight') {
          setHorizontalScroll((prevHorizontalScroll) => {
            if (cardItem > 0) {
              return moveHorizontal(prevHorizontalScroll, type, 'left', cardItem);
            }
            return 0;
          });
        }

        return cardItem;
      });
    },
    onDown: navigate?.onDown,
    onUp: navigate?.onUp,
  };
  const moveHorizontal = (
    value: number,
    type: 'hightlight' | SupportedCards,
    direction: 'left' | 'right' = 'right',
    position: number = 0,
  ) => {
    const size: number = type === 'hightlight' ? HIGHLIGHT_WIDTH : getCardSize(type, { size: 'width' });
    return cardinalNavigation(value, direction, size, CARD_MARGIN_RIGHT);
  };

  function buildTrail(item: Record<string, any>, index: number) {
    const onEnterNavigation = () => routeNavigate(item.navigate.to);
    const onMouseEnter = () => setActiveItem(index);

    if (type === 'highlight') {
      return (
        <Highlight
          title={item.title}
          headline={item.headline}
          key={`highlight-${index}-${item.id}-${item.title}`}
          background={item.background}
          navigate={{
            onEnter: onEnterNavigation,
          }}
          onDisplay={activeItem === index}
          active={activeItem === index && isActive}
          position={index}
          button={{
            label: 'veja',
          }}
        />
      );
    } else if (type === 'video' || type === 'title') {
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
    return;
  }

  const bullets = () => {
    return (
      <div className={style.highlightBulletsWrapper}>
        {items
          ?.filter((item) => item.id)
          .map((_, index) => (
            <span
              className={classNames([
                style.highlightBullet,
                {
                  [style.highlightBulletActive]: activeItem === index,
                },
              ])}
              onClick={() => {
                setActiveItem(index);
              }}
              key={`bullet-${index}`}
            />
          ))}
      </div>
    );
  };

  const trailContent = items.filter((item) => item.uuid && isSupportedContent(type)).map(buildTrail);

  ScreenNavigation(isActive, onNavigate);

  return (
    <div
      className={classNames(styles)}
      data-active={isActive}
      onMouseEnter={parentMouseEnter}
      onMouseLeave={parentMouseLeave}
    >
      {title && type !== 'highlight' && <p className={style.trailTitle}>{title}</p>}
      <div style={{ marginLeft: px(horizontalScroll) }}>{trailContent}</div>
      {type === 'highlight' && bullets()}
    </div>
  );
}
