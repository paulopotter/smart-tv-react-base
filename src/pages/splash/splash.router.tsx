import { Splash } from './splash.page';
import { splashService } from './splash.service';

export const SplashRouter = {
  element: <Splash />,
  path: '/',
  errorElement: <div>error</div>,
  loader: splashService,
};
