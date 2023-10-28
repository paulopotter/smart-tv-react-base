import { Route } from '@tanstack/react-router'
import { Splash } from './splash.page'
import { rootRoute } from '../../routes'


export const SplashRouter = new Route({
    component: Splash,
    getParentRoute: () => rootRoute,
    path: '/'
})
