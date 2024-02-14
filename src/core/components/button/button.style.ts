import { createUseStyles } from 'react-jss';

import { ThemeI } from '@/theme/theme.style';
import { px } from '@/tools';

export const ButtonStyle = createUseStyles<any, unknown, ThemeI>((theme) => ({
  container: {
    background: theme.color.secondary,
    color: theme.color.primary,
    border: 'none',
    fontSize: px(20),
    padding: px(20),
    borderRadius: px(20),
  },
  active: {
    background: theme.color.primary,
    color: theme.color.secondary,
    transform: 'scale(1.05)',
  },
  icon: {
    display: 'inline',
    verticalAlign: 'bottom',
    height: px(24),
    width: px(24),
    marginRight: px(6),
  },
  iconActive: {
    transform: 'scale(1.05)',
  },
}));
