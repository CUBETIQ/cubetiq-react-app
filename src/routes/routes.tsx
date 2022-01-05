import React from 'react'
import { Reset, Home, Profile, Info } from '@/pages'

export interface Authority {
    privileges?: string | Array<string>
    // if true => AND | is false => OR (related to privileges)
    // compare privileges of reponse and privileges above
    strict?: boolean
    // if true, hide or not render. Else show but disabled (element/children)
    hideNoPrivilege?: boolean
}

export interface RouteObj {
    path: string
    component: () => React.ReactNode
    exact?: boolean
    key: string
    headerLabel?: string
    authority?: Authority
}

export interface SideMenuRouteObj extends RouteObj {
    icon?: any
    label: string
}

export interface SideSubMenuObj {
    icon: any
    label: string
    key: string
    subMenus: SideMenuRouteObj[]
}

const sideMenuRouteObjs: (SideMenuRouteObj | SideSubMenuObj)[] = [
    {
        component: () => <Home />,
        path: '/',
        key: 'home',
        headerLabel: '',
        label: 'Home',
        // authority: {
        //   privileges: ['ADMIN', 'USER'],
        //   hideNoPrivilege: false,
        //   strict: true,
        // }
    },
    {
        component: () => <Profile />,
        path: '/profile',
        key: 'profile',
        headerLabel: '',
        label: 'Profile',
    },
]

const routes: RouteObj[] = [
    {
        path: '/reset',
        component: () => <Reset />,
        key: 'reset',
        headerLabel: 'Reset',
    },
]

export { sideMenuRouteObjs, routes as default }
