import { useCallback } from 'react'
import routes, { Authority, sideMenuRouteObjs, SideSubMenuObj } from './routes'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import AuthRoute from './auth.route'
import { BaseLayout } from '@/layouts'
import { useLayout, useAuthContext } from '@/context'
import { Login } from '@/pages'
import { AccessDenied } from '@/pages/error'

const renderRoute = (item: any) => {
    const routeProps = {
        key: item.key,
        path: item.path,
        exact: item.exact || true,
        component:
            item?.disabled === true ? () => <AccessDenied /> : item.component,
        headerLabel: item.headerLabel,
    }

    return <AuthRoute {...routeProps} />
}

const newSideMenuRouteObjs: any[] = sideMenuRouteObjs.reduce(
    (acc, curr: any) => {
        let routes: any[] = []
        if (curr.subMenus) {
            routes.push(...curr.subMenus)
        } else {
            routes.push(curr)
        }

        return [...acc, ...routes] as any
    },
    []
)

const subMenusObjs: any[] = sideMenuRouteObjs.filter(
    (item: any) => item.subMenus !== undefined
)

const RouterView = () => {
    const { state } = useAuthContext()
    const { selectedSideMenuKeys, setSelectedSideMenuKeys } = useLayout()

    const authorities = (state && state.user && state.user.authorities) || []
    const location = useLocation()

    const AuthChecker = (item: any): any | null => {
        const authority = item?.authority as Authority
        if (!authority || !authority.privileges) return item
        const privileges = authority.privileges

        if (typeof privileges === 'string') {
            // have permission
            if (authorities.some((e) => e === privileges)) return item
        } else if (Array.isArray(privileges)) {
            // have permission
            if (authority.strict === true) {
                if (privileges.every((e) => authorities.some((a) => e === a)))
                    return item
            } else {
                if (privileges.some((e) => authorities.some((a) => e === a)))
                    return item
            }
        }

        if (authority.hideNoPrivilege === false) {
            return {
                ...item,
                disabled: true,
            }
        }

        // not have permission
        // ignore and return null for no permission
        return null
    }

    const AuthFilterItems = (items: any[]) => {
        const filters = items.map((item) => AuthChecker(item))
        return filters.filter((s) => s !== null)
    }

    const renderMenuItem = useCallback((item: any) => {
        const { key, path, label, disabled } = item

        return (
            <div
                //disabled={disabled || false}
                onClick={() => {
                    setSelectedSideMenuKeys([key])
                }}
                key={key}
                // icon={item.icon}
            >
                <Link to={path}>{label}</Link>
            </div>
        )
    }, [])

    const renderSideMenuLinks = useCallback(() => {
        const defaultSelectedKey = newSideMenuRouteObjs.find((item) => {
            return '/' + item.key === location.pathname
        })

        const defaultOpenKeys: string[] = []

        const openSubMenusObj = subMenusObjs.find((item: SideSubMenuObj) => {
            return item.subMenus.some((s) => '/' + s.key === location.pathname)
        })

        if (openSubMenusObj) {
            defaultOpenKeys.push(openSubMenusObj.key)
        }

        return (
            <div
                style={{
                    height: 'calc(100vh - 64px)',
                    overflow: 'hidden auto',
                }}
            >
                <div
                // theme="light"
                // mode="inline"
                // defaultSelectedKeys={
                //     defaultSelectedKey ? [defaultSelectedKey.key] : []
                // }
                // defaultOpenKeys={defaultOpenKeys}
                >
                    {AuthFilterItems(sideMenuRouteObjs).map((item) => {
                        const { subMenus } = item as any

                        return subMenus ? (
                            <div
                                key={item.key}
                                // icon={item.icon}
                                title={item.label}
                            >
                                {AuthFilterItems(subMenus).map((s: any) =>
                                    renderMenuItem(s)
                                )}
                            </div>
                        ) : (
                            renderMenuItem(item)
                        )
                    })}
                </div>
            </div>
        )
    }, [])

    if (location.pathname === '/login') {
        return <Login />
    }

    const AuthRenderRoutes = () => {
        const allRoutes = [...routes, ...newSideMenuRouteObjs]

        return AuthFilterItems(allRoutes)
    }

    return (
        <BaseLayout
            renderSideMenu={() => {
                return renderSideMenuLinks()
            }}
        >
            <Routes>
                <Route
                    path={'/'}
                    element={() => {
                        return (
                            <>
                                {AuthRenderRoutes().map((item) =>
                                    renderRoute(item)
                                )}
                            </>
                        )
                    }}
                />
            </Routes>
        </BaseLayout>
    )
}

export default RouterView
