import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SplashStyle } from './splash.style';

export function Splash() {
  const navigate = useNavigate();
  const redirectTime = 2_000;
  const [counter, setCounter] = useState(redirectTime);
  useEffect(() => {
    setTimeout(() => {
      navigate('/home');
    }, redirectTime);
  }, []);

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1_000), 1_000);
  }, [counter]);

  const style = SplashStyle();

  return (
    <div className={style.container}>
      <h1>Hello World!!</h1>
      <h2>Splash Page!!</h2>
      <div>Redirect in {counter / 1000}</div>
    </div>
  );
}
