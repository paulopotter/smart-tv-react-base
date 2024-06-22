import { Loading } from '@/core';

import { VideoPage } from './video.page';

// import { VideoService } from './video.service';

// let data: any = [];
export const VideoRouter = {
  element: <VideoPage />,
  path: 'video/:id',
  // loader: async () => {
  //   if (data.length <= 0) {
  //     data = await VideoService();
  //   }
  //   return data;
  // },
  pendingComponent: Loading,
};
