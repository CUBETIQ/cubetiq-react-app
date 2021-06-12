import { AppConfig } from '@/config'
import { printError, printInfo } from '@/utils/log_util'
import { getStorage, setStorage } from '@/utils/ls_util'
import React, { useContext, useCallback, useReducer, useEffect } from 'react'

interface AuthContextState {
    login: (args: { username: string; password: string }) => Promise<void>
    state: {
        user: {
            username: string
            userId: string
        } | null
    }
    getToken: () => string | undefined | null
    logout: () => void
    isLogin: () => boolean
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
    login: async () => {},
    state: {
        user: null,
    },
    getToken: () => {
        return undefined
    },
    logout: () => {},
    isLogin: () => { return false },
})

const AuthProvider: React.FC = (props) => {
    const [state, dispatch] = useReducer(AuthReducer, {
        user: null,
    })

    const login = async (args: { username: string; password: string }) => {
        const res = {
            data: {
                token: 'DEMO_HAH',
            },
        }

        setStorage(AppConfig.CLIENT_TOKEN_KEY, res.data.token)
        await verify()
        dispatch({
            type: AuthActionType.LOGIN,
            payload: args,
        })

        return
    }

    useEffect(() => {
        const doVerify = async () => {
            const token = getStorage(AppConfig.CLIENT_TOKEN_KEY)
            const userAuthInfo = {}

            printInfo("User details =>", token, userAuthInfo)
        }

        doVerify()
    }, [])

    const verify = async () => {
        const token = getStorage(AppConfig.CLIENT_TOKEN_KEY)
        printError('Verify not implemented with token: ', token)
        const userAuthInfo = {}
        return userAuthInfo
    }

    const logout = useCallback(() => {
        setStorage(AppConfig.CLIENT_TOKEN_KEY, undefined)
        dispatch({
            type: AuthActionType.LOGOUT,
        })
    }, [])

    const getToken = () => getStorage(AppConfig.CLIENT_TOKEN_KEY)

    const isLogin = (): boolean => {
        return getToken() != null   
    }

    return (
        <AuthContext.Provider
            value={{
                login,
                state,
                logout,
                isLogin,
                getToken,
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
