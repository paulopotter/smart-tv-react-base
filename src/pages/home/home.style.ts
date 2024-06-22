import { createUseStyles } from 'react-jss';

export const HomeStyle = createUseStyles<any, any, any>((theme) => ({
  container: {
    backgroundColor: '#000',
    color: theme.color.primary,
  },
}));
