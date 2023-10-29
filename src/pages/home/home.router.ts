import { Route } from '@tanstack/react-router';

import { rootRoute } from '../../routes';
import { Home } from './home.page';
import { HomeService } from './home.service';

export const HomeRouter = new Route({
  component: Home,
  getParentRoute: () => rootRoute,
  path: '/home',
  loader: HomeService,
  // loader: async function () {
  //   return {
  //     homeData: await HomeService().then((data: any) => {
  //       return data;
  //     }),
  //   };
  // },
});
