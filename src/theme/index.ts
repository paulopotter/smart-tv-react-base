import React from 'react';
import { createTheming } from 'react-jss';

import { Theme } from './theme.style';
export { Theme } from './theme.style';

const ThemeContext = React.createContext(Theme);

// Creating a namespaced theming object.
export const theming = createTheming(ThemeContext);

export const { ThemeProvider, useTheme } = theming;
