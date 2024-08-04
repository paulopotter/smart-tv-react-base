import classNames from 'classnames';
import { useCallback, useState } from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';

import { type Card, HIGHLIGHT_HEIGHT, Loading, onNavigate, Trail } from '@/core';
import {
  TRAIL_HORIZONTAL_HEIGHT,
  TRAIL_MARGIN_BOTTOM,
  TRAIL_VERTICAL_HEIGHT,
} from '@/core/components/trails/trail.style';
import { px } from '@/tools';

import { useThemeStoreInContext } from '../../theme';
import { HomeStyle } from './home.style';

export function Home() {
  const homeData = useLoaderData();
  const NavigationStatus = useNavigation();
  // @ts-ignore: f
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const data = homeData.content ?? [];
  const [activeTrail, setActiveTrail] = useState(0);

  const [verticalScroll, setVerticalScroll] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [___, setActiveTrailType] = useState<Card['type']>(data?.[0]?.type);
  // const [activeElement, setActiveElement] = useState<NavigateElements>(
  //   data?.length > 0 ? NavigateElements.trails : NavigateElements.menu,
  // );
  const [activeElement, setActiveElement] = useState(0);
  const theme = useThemeStoreInContext('theme');
  const style = HomeStyle({ theme });

  const trailNavigate: onNavigate = {
    onUp() {
      moveVerticalStates('up');
    },
    onDown() {
      moveVerticalStates('down');
    },
  };

  const moveVerticalStates = (direction: 'up' | 'down') => {
    if (direction === 'up') {
      setActiveTrail((prevActiveTrail) => {
        const nextActiveTrail = prevActiveTrail - 1;
        const limit = 0;
        const newActiveTrail = Math.max(nextActiveTrail, limit);
        setActiveTrailType(() => {
          const currentActiveTrailType = data[newActiveTrail]!.type;
          setVerticalScroll((prevVerticalScroll) => {
            if (limit < newActiveTrail) {
              if (prevActiveTrail === data.length - 1) {
                return prevVerticalScroll;
              }
              return moveVertical(prevVerticalScroll, currentActiveTrailType, 'up', newActiveTrail);
            }
            return 0;
          });
          return currentActiveTrailType;
        });
        return newActiveTrail;
      });
    } else if (direction === 'down') {
      setActiveTrail((prevActiveTrail) => {
        const nextActiveTrail = prevActiveTrail + 1;
        const limit = data.length - 1;
        const newActiveTrail = Math.min(nextActiveTrail, limit);
        setActiveTrailType((prevActiveType) => {
          const currentActiveTrailType = data[newActiveTrail]!.type;
          setVerticalScroll((prevVerticalScroll) => {
            if (newActiveTrail < limit) {
              return moveVertical(prevVerticalScroll, prevActiveType, 'down', newActiveTrail);
            }
            return prevVerticalScroll;
          });
          return currentActiveTrailType;
        });
        return newActiveTrail;
      });
    }
  };

  const moveVertical = (value: number, type: any, direction = 'down', position: number = 0) => {
    const HIGHLIGHT_JUMP = HIGHLIGHT_HEIGHT - 56;

    const size: Record<string, number> = {
      ['title']: TRAIL_VERTICAL_HEIGHT + TRAIL_MARGIN_BOTTOM,
      ['video']: TRAIL_HORIZONTAL_HEIGHT + TRAIL_MARGIN_BOTTOM,
      ['live']: TRAIL_HORIZONTAL_HEIGHT + TRAIL_MARGIN_BOTTOM,
      ['continue-watching']: TRAIL_HORIZONTAL_HEIGHT + TRAIL_MARGIN_BOTTOM,
      ['top-watched']: TRAIL_HORIZONTAL_HEIGHT + TRAIL_MARGIN_BOTTOM,
      ['highlight']: HIGHLIGHT_HEIGHT,
    };
    let newValue = value;
    if (direction === 'down') {
      newValue -= position === 1 && direction === 'down' && type === 'highlight' ? HIGHLIGHT_JUMP : size[type] ?? 0;
    } else {
      newValue += position <= 1 ? 0 : size[type] ?? 0;
    }

    return newValue;
  };

  const Content = useCallback(function Content({ data, activeTrail, activeElement, trailNavigate }: content) {
    if (data?.length <= 0) {
      return <p>Sem conteúdo disponível.</p>;
    }
    return data.map((line: any, index: number) => (
      <Trail
        title={line.title}
        items={line.items}
        active={index === activeTrail}
        type={line.type}
        key={`${index}-home-trail`}
        trailKey={`${index}-home-trail`}
        navigate={trailNavigate}
        onMouseEnter={() => {
          setActiveTrail(index);
        }}
      />
    ));
  }, []);

  if (NavigationStatus.state === 'loading') {
    return <Loading />;
  }
  return data ? (
    <div className={classNames([style.container])} style={{ marginTop: px(verticalScroll) }}>
      <Content data={data} activeTrail={activeTrail} activeElement={activeElement} trailNavigate={trailNavigate} />
    </div>
  ) : (
    <div>home</div>
  );
}

type content = {
  // data: HomeData[];
  data: any[];
  activeTrail: number;
  activeElement: any;
  trailNavigate: onNavigate;
};
