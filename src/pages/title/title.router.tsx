import { Loading } from '@/core';

import { TitlePage } from './title.page';

// import { TitleService } from './title.service';

// let data: any = [];
export const TitleRouter = {
  element: <TitlePage />,
  path: 'title/:id',
  // loader: async () => {
  //   if (data.length <= 0) {
  //     data = await TitleService();
  //   }
  //   return data;
  // },
  pendingComponent: Loading,
};
