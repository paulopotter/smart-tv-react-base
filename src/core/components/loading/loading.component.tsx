import { useThemeStoreInContext } from '@/theme';

import { LoadingStyle } from './loading.style';

export function Loading() {
  const theme = useThemeStoreInContext('theme');
  const style = LoadingStyle({ theme });

  return (
    <>
      <p className={style.text}>Carregando ...</p>
    </>
  );
}
