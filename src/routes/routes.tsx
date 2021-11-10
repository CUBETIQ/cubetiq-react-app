import About from '@/pages/About'
import NotFound from '@/pages/Error/404'
import Home from '@/pages/Home'
import Info from '@/pages/Info'
import Login from '@/pages/Login'
import Profile from '@/pages/Profile'
import Reset from '@/pages/Reset'
import { CustomRouteProps } from '@/routes/interfaces'
import { RouteTypes } from '@/routes/types'

const routes: CustomRouteProps[] = [
    // Auth
    {
        key: 'login',
        path: RouteTypes.LOGIN,
        component: () => <Login />,
    },
    {
        key: 'home',
        exact: true,
        path: RouteTypes.HOME,
        component: () => <Home />,
    },
    {
        key: 'about',
        path: RouteTypes.ABOUT,
        component: () => <About />,
    },
    {
        exact: true,
        key: 'info',
        path: RouteTypes.INFO,
        component: () => <Info />,
    },
    {
        exact: true,
        key: 'reset',
        path: RouteTypes.RESET,
        component: () => <Reset />,
    },
    {
        exact: true,
        key: 'profile',
        path: RouteTypes.PROFILE,
        component: () => <Profile />,
        withAuthority: true,
    },

    // Errors
    {
        key: 'notfound',
        path: RouteTypes.ERROR_404,
        component: () => <NotFound />,
    },
]

export { routes }
