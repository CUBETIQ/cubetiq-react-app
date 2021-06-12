import { useAuthContext } from '@/context/AuthContext'
import AccessDenied from '@/pages/Error/403'
import { Route } from 'react-router-dom'

const AuthRoute = (props: any) => {
    const { component, ...rest } = props
    const { isLogin } = useAuthContext()

    if (!isLogin()) {
      return (<AccessDenied />)
    }

    return (
        <Route
            {...rest}
            render={component}
        />
    )
}

export default AuthRoute
