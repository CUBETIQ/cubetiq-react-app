import { RouteProps } from 'react-router-dom'

export interface Authority {
    authority?: string | undefined
    strict?: boolean | undefined
    with?: Authority | undefined
}

export interface AuthorityProps {
    withAuthority?: boolean | undefined
    authorities?: Authority | string[] | string | undefined
    strictAuthority?: boolean | undefined
}

export interface CustomRouteProps extends RouteProps, AuthorityProps {
    key: string
}

export interface MenuProps {
    icon: any
    label?: string | undefined
}

export interface SideSubMenuProps extends MenuProps {
    key?: string | undefined
    subMenus: SideSubMenuProps[]
}
