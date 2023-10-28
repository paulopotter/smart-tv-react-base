import {
  RouterProvider,
} from '@tanstack/react-router';
import jss from 'jss';
import jssPluginGlobal from 'jss-plugin-global';
import React from 'react';
import { createRoot } from 'react-dom/client';

import { router } from './app';
import { globalStyles } from './global.style';
import { Theme, ThemeProvider } from './theme';


// JSS Setup
jss.use(jssPluginGlobal());
jss.createStyleSheet(globalStyles).attach();


const domNode = document.getElementById('root');
const root = createRoot(domNode!);
root.render(
  <ThemeProvider theme={Theme}>
    <RouterProvider router={router} />
  </ThemeProvider>
);
