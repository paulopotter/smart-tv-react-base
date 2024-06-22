import { createUseStyles } from 'react-jss';

import { px } from '@/tools';

export const ErrorStyle = createUseStyles<any, any, any>({
  wrapper: {
    backgroundColor: 'rgba(0, 0, 0, .5)',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 999,
    height: ({ theme }) => px(theme.screen.height),
    width: ({ theme }) => px(theme.screen.width),
    textAlign: 'center',
  },
  container: {
    position: 'relative',
    top: '32%',
    // width: px(334),
    height: px(152),
    verticalAlign: 'middle',
  },
  title: {
    fontSize: ({ theme }) => px(theme.font.size[6]),
    width: px(334),
    margin: [0, 'auto', px(30)],
  },
  subtitle: {
    fontSize: ({ theme }) => px(theme.font.size[4]),
    width: px(644),
    margin: [0, 'auto', px(30)],
  },
  buttons: {
    fontSize: ({ theme }) => px(theme.font.size[2]),
    fontWeight: 'bold',
    height: px(36),
    width: px(200),
    padding: [px(10), 0],
    borderRadius: px(10),
  },
  firstButton: {
    marginRight: px(14),
  },
});
