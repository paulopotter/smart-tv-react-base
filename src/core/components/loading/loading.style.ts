import { createUseStyles } from 'react-jss';

import { px } from '@/tools';

export const LoadingStyle = createUseStyles<any, any, any>((theme) => ({
  text: {
    fontSize: px(theme.font.size[6]),
    position: 'fixed',
    left: px(520),
    top: px(330),
  },
}));
