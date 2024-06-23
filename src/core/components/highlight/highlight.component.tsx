import classNames from 'classnames';

import { onNavigate } from '@/core/services';
import { useThemeStoreInContext } from '@/theme';
import { px } from '@/tools';

import { Button } from '../button';
import { HIGHLIGHT_HEIGHT, HIGHLIGHT_WIDTH, HighlightStyle } from './highlight.style';

interface Highlight {
  title: string;
  headline?: string;
  background: string;
  button: {
    label: string;
  };
  navigate: onNavigate;
  active: boolean;
  onDisplay: boolean;
  position: number;
}

export function Highlight({
  title,
  headline,
  background,
  button,
  navigate,
  active: isActive,
  position,
  onDisplay,
}: Highlight) {
  const theme = useThemeStoreInContext('theme');
  const style = HighlightStyle({ theme: theme, position: position });

  return (
    <div
      className={classNames([style.wrapper, { [style.active]: isActive, [style.active]: onDisplay }])}
      data-active={isActive}
      data-type={'highlight'}
    >
      <div className={style.overlayer}>
        <p className={classNames([style.infoWrapper])}>
          <span className={classNames([style.title])}>{title}</span>
          {headline && <span className={classNames([style.headline])}>{headline}</span>}
          <Button active={isActive} navigate={navigate}>
            {button.label}
          </Button>
        </p>
      </div>
      <img
        className={classNames([style.background])}
        src={background}
        alt=""
        width={px(HIGHLIGHT_WIDTH)}
        height={px(HIGHLIGHT_HEIGHT)}
      />
    </div>
  );
}
