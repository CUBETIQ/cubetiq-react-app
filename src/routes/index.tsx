import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { routes } from './routes'

const RouterView = () => {
    return (
        <Router>
            <Switch>
                {routes.map((route) => {
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
                })}
            </Switch>
        </Router>
    )
}

export default RouterView
