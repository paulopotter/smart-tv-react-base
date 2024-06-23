import 'abortcontroller-polyfill/dist/polyfill-patch-fetch';
import 'es6-promise/auto';
import 'whatwg-fetch';
import 'core-js/stable';

import jss from 'jss';
import jssPluginGlobal from 'jss-plugin-global';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { router } from './routes';
import { ThemeStoreProvider } from './theme';
import { globalStyles } from './theme';

// JSS Setup
jss.use(jssPluginGlobal());
jss.createStyleSheet(globalStyles).attach();

const domNode = document.getElementById('root');
const root = createRoot(domNode!);

const isDev = false;
// const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  import('react').then(({ StrictMode }) =>
    root.render(
      <StrictMode>
        <ThemeStoreProvider>
          <RouterProvider router={router} />
        </ThemeStoreProvider>
      </StrictMode>,
    ),
  );
} else {
  root.render(
    <ThemeStoreProvider>
      <RouterProvider router={router} />
    </ThemeStoreProvider>,
  );
}
