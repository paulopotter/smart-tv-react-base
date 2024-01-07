import { Loading } from '@/core';

import { Home } from './home.page';
import { HomeService } from './home.service';

let data: any = [];
export const HomeRouter = {
  element: <Home />,
  path: '/home',
  loader: async () => {
    if (data.length <= 0) {
      data = await HomeService();
    }
    return data;
  },
  pendingComponent: Loading,
};
