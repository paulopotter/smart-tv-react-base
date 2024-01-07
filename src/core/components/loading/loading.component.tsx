import { useTheme } from '@/theme';

import { LoadingStyle } from './loading.style';

export function Loading() {
  const theme = useTheme();
  const style = LoadingStyle({ theme });

  return (
    <>
      <p className={style.text}>Carregando ...</p>
    </>
  );
}
