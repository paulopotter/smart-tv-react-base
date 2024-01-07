import 'abortcontroller-polyfill/dist/polyfill-patch-fetch';
import 'es6-promise/auto';
import 'whatwg-fetch';
import 'core-js/stable';

import jss from 'jss';
import jssPluginGlobal from 'jss-plugin-global';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { router } from './routes';
import { globalStyles, Theme, ThemeProvider } from './theme';

// JSS Setup
jss.use(jssPluginGlobal());
jss.createStyleSheet(globalStyles).attach();

const domNode = document.getElementById('root');
const root = createRoot(domNode!);

const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  root.render(
    <StrictMode>
      <ThemeProvider theme={Theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </StrictMode>,
  );
} else {
  root.render(
    <ThemeProvider theme={Theme}>
      <RouterProvider router={router} />
    </ThemeProvider>,
  );
}
