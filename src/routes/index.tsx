import AuthProvider from '@/context/AuthContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AuthRoute from './AuthRoute'
import { routes } from './routes'

const RouterView = () => {
    return (
        <Router>
            <Switch>
                {routes.map((route) => {
                    const { withAuthority } = route
                    if (withAuthority) {
                        return (
                            <AuthProvider key={route.key}>
                                <AuthRoute {...route} />
                            </AuthProvider>
                        )
                    } else {
                        return (
                            <Route
                                key={route.key}
                                exact={route.exact}
                                component={route.component}
                                children={route.children}
                                location={route.location}
                                path={route.path}
                            />
                        )
                    }
                })}
            </Switch>
        </Router>
    )
}

export default RouterView
