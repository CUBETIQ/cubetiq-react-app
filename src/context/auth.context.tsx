import React, { useContext, useCallback, useReducer, useEffect } from 'react'
import { ROUTE, TOKEN_KEY } from '@/constants'
import { useNavigate, useLocation } from 'react-router-dom'
import { handleError } from '@/helpers'

interface AuthContextState {
    login: (args: {
        username: string
        password: string
    }) => Promise<UserAuth | null>
    state: {
        user: UserAuth | null
    }
    getToken: () => string | undefined | null
    logout: () => void
}

export interface UserAuth {
    username: string
    id: string
    email: string
    phone: string
    getToken: () => string | null
    roles: string[]
    profile: any
    authorities: string[]
}

enum AuthActionType {
    'LOGIN' = 'LOGIN',
    'LOGOUT' = 'LOGOUT',
}

const AuthReducer: (
    state: AuthContextState['state'],
    action: {
        type: AuthActionType
        payload?: any
    }
) => AuthContextState['state'] = (state, action) => {
    switch (action.type) {
        case AuthActionType.LOGIN:
            return {
                ...state,
                user: action.payload,
            }
        case AuthActionType.LOGOUT:
            return {
                ...state,
                user: null,
            }
        default:
            return state
    }
}

const AuthContext = React.createContext<AuthContextState>({
    login: async () => null,
    state: {
        user: null,
    },
    getToken: () => {
        return undefined
    },
    logout: () => {},
})

const AuthProvider: React.FC = (props) => {
    const [state, dispatch] = useReducer(AuthReducer, {
        user: null,
    })

    const login = async (args: { username: string; password: string }) => {
        let userAuthInfo: UserAuth | null = null
        try {
            localStorage.setItem(TOKEN_KEY, '')
            userAuthInfo = await verify()
            dispatch({
                type: AuthActionType.LOGIN,
                payload: userAuthInfo,
            })
        } catch (e) {
            handleError(e)
        }
        return userAuthInfo
    }

    const navigate = useNavigate()
    const location = useLocation()
    
    useEffect(() => {
        const doVerify = async () => {
            const userAuthInfo = await verify()
            if (userAuthInfo === null && location.pathname !== '/login') {
                await navigate(ROUTE.LOGIN)
            } else if (
                userAuthInfo !== null &&
                location.pathname === '/login'
            ) {
                await navigate(ROUTE.ROOT)
            }
        }

        doVerify()
    }, [])

    const verify = async () => {
        const token = localStorage.getItem(TOKEN_KEY) as string
        let userAuthInfo: UserAuth | null = null
        try {
            dispatch({
                type: AuthActionType.LOGIN,
                payload: userAuthInfo,
            })
        } catch (e) {
            console.error(e)
        }
        return userAuthInfo
    }

    const logout = useCallback(async () => {
        localStorage.setItem(TOKEN_KEY, '')
        dispatch({
            type: AuthActionType.LOGOUT,
        })
        navigate(ROUTE.LOGIN)
    }, [state])

    return (
        <AuthContext.Provider
            value={{
                login,
                state,
                logout,
                getToken: () => {
                    return localStorage.getItem(TOKEN_KEY)
                },
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    return useContext(AuthContext)
}

export default AuthProvider
