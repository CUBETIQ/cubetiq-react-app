import { RouteTypes } from '@/routes/types'
import { clearStorage } from '@/utils/ls_util'
import { useEffect } from 'react'
import { Redirect } from 'react-router'

const Reset = () => {
    const clearAllCaches = () => {
        caches.keys().then((cacheNames) => {
            cacheNames.forEach((cacheName) => {
                caches.delete(cacheName).then((r) => console.log('Caches cleared', r))
            })
        })
    }
    useEffect(() => {
        clearStorage()
        sessionStorage.clear()
        clearAllCaches()
    }, [])

    return <Redirect to={RouteTypes.HOME} />
}

export default Reset
