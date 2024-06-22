import { useNavigate, useRouteError } from 'react-router-dom';

import { useThemeStoreInContext } from '@/theme';

import { Button } from '../button';
import { ErrorStyle } from './error.style';

export function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();
  const theme = useThemeStoreInContext('theme');
  const style = ErrorStyle({ theme });

  const onNavigate = {
    onEnter() {
      navigate('/home');
    },
  };
  console.error(error);

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <h2 className={style.title}>Algo deu errado</h2>
        <p className={style.subtitle}>
          Desculpe, estamos tendo problemas com sua solicitação. Você encontra muitos outros títulos na página inicial.
        </p>
        <Button extraClass={style.buttons} active={true} navigate={onNavigate}>
          Página Inicial
        </Button>
      </div>
    </div>
  );
}
