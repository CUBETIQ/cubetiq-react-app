import { RouteProps } from 'react-router-dom'
import About from '../pages/About'
import Home from '../pages/Home'
import RouteTypes from './types'

interface Authority {
    authority?: string | undefined
    strict?: boolean | undefined
    with?: Authority | undefined
}

interface AuthorityProps {
    authorities?: Authority | string[] | string | undefined
    strictAuthority?: boolean | undefined
}

interface CustomRouteProps extends RouteProps, AuthorityProps {
    key: string
}

export interface MenuProps {
    icon: any
    label?: string | undefined
}

export interface SideMenuRouteProps extends CustomRouteProps, MenuProps {}

export interface SideSubMenuProps extends MenuProps {
    key?: string | undefined
    subMenus: SideSubMenuProps[]
}

const routes: CustomRouteProps[] = [
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
]

const menus: (SideMenuRouteProps | SideSubMenuProps)[] = []

export { routes, menus }
