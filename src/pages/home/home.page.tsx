import { useState } from 'react';

import { onNavigate, ScreenNavigation, Trail } from '@/core';

import { useTheme } from '../../theme';
import { HomeStyle } from './home.style';
//@ts-ignore
export function Home({ useLoader }) {
  const homeData = useLoader();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, _] = useState<any | null>(homeData ?? []);
  const [activeTrail, setActiveTrail] = useState(0);
  const theme = useTheme();
  const style = HomeStyle({ theme });

  const trailNavigate: onNavigate = {
    onDown() {
      setActiveTrail((prevItem) => Math.min(prevItem + 1, data.length - 1));
    },
    onUp() {
      setActiveTrail((prevItem) => Math.max(prevItem - 1, 0));
    },
  };

  return data ? (
    <div className={style.container}>
      <h1>Welcome to Home Page!!!</h1>
      {data !== null &&
        data.length > 0 &&
        //@ts-ignore
        data.map((line, index) => (
          <div key={`${line.title}-${index}`}>
            <p>{line.title}</p>
            <Trail items={line.items} active={index === activeTrail} type={line.type} navigate={trailNavigate} />
          </div>
        ))}
    </div>
  ) : (
    <div>home</div>
  );
}
