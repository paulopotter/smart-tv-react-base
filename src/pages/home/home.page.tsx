import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

import { getNextPosition, onNavigate, Trail } from '@/core';

import { useTheme } from '../../theme';
import { HomeStyle } from './home.style';

export function Home() {
  const homeData = useLoaderData();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, _] = useState<any | null>(homeData ?? []);
  const [activeTrail, setActiveTrail] = useState(0);
  const theme = useTheme();
  const style = HomeStyle({ theme });

  const trailNavigate: onNavigate = {
    onDown() {
      setActiveTrail((prevItem) => getNextPosition(prevItem, data.length - 1, 'down'));
    },
    onUp() {
      setActiveTrail((prevItem) => getNextPosition(prevItem, 0, 'up'));
    },
  };

  return data ? (
    <div className={style.container}>
      <h1>Welcome to Home Page!!!</h1>
      {data !== null &&
        data.length > 0 &&
        data.map((line: any, index: number) => (
          <div key={`${line.title}-${index}`}>
            <p>{line.title}</p>
            <Trail
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
          </div>
        ))}
    </div>
  ) : (
    <div>home</div>
  );
}
