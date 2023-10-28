import { Router } from '@tanstack/react-router';

import * as AppRoutes from './pages';
import { rootRoute } from './routes';


// Create the route tree using your routes
const routeTree = rootRoute.addChildren(Object.values(AppRoutes));

// Create the router using your route tree
export const router = new Router({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
