import { Route } from '@tanstack/react-router'
import { Home } from './home.page'
import { rootRoute } from '../../routes'


export const HomeRouter = new Route({
    component: Home,
    getParentRoute: () => rootRoute,
    path: '/home'
})
