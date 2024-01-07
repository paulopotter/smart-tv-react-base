import { createUseStyles } from 'react-jss';

import { px } from '@/tools';

export const LoadingStyle = createUseStyles((theme) => ({
  text: {
    fontSize: px(theme.font.size[6]),
    position: 'fixed',
    left: px(520),
    top: px(330),
  },
}));
