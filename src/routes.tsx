import { createBrowserRouter } from 'react-router-dom';

import { ErrorBoundary } from './core';
import * as Pages from './pages';

export const defaultRoute = {
  path: '*',
  element: <ErrorBoundary />,
  exact: true,
};

export const router = createBrowserRouter([...Object.values(Pages), defaultRoute], {
  basename: '/',
});
