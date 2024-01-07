import 'abortcontroller-polyfill/dist/polyfill-patch-fetch';
import 'es6-promise/auto';
import 'whatwg-fetch';
import 'core-js/stable';

import jss from 'jss';
import jssPluginGlobal from 'jss-plugin-global';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { router } from './routes';
import { globalStyles, Theme, ThemeProvider } from './theme';

// JSS Setup
jss.use(jssPluginGlobal());
jss.createStyleSheet(globalStyles).attach();

const domNode = document.getElementById('root');
const root = createRoot(domNode!);
root.render(
  <ThemeProvider theme={Theme}>
    <RouterProvider router={router} />
  </ThemeProvider>,
);
