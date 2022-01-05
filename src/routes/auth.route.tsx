import { TOKEN_KEY } from '@/constants'
import React from 'react'
import { Route, useNavigate } from 'react-router-dom'

const AuthRoute: React.FC<{
    component: () => React.ReactNode
}> = (props) => {
    const { component, ...rest } = props
    const navigate = useNavigate()
    const token = localStorage.getItem(TOKEN_KEY) as string

    if (!token) {
        navigate('/login')
    }

    return <Route {...rest} element={component} />
}

export default AuthRoute
