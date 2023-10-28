import React from 'react';

import { useTheme } from '../../theme';
import { HomeStyle } from './home.style';

export function Home() {
  console.log(new Date(), 'Home');
  const theme = useTheme();
  const style = HomeStyle({theme});
  return (
    <div className={style.container}>
      <h1>Welcome to Home Page!!!</h1>
    </div>
  );
}
