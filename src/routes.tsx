import { createBrowserRouter } from 'react-router-dom';

import * as Pages from './pages';

export const router = createBrowserRouter(Object.values(Pages));

export const rootRoute = {};
