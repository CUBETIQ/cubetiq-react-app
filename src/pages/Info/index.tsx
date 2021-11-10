import {
    APP_BUILD_DATE,
    APP_BUILD_NUMBER,
    APP_COMMIT_ID,
    APP_NAME,
    APP_VERSION,
} from '@/app.config'
import { RouteTypes } from '@/routes/types'
import './index.less'

export default function Info() {
    return (
        <div>
            <h1>App Info</h1>
            <p>App name: {APP_NAME}</p>
            <p>App version: {APP_VERSION}</p>
            <p>App build number: {APP_BUILD_NUMBER}</p>
            <p>App build date: {APP_BUILD_DATE}</p>
            <p> App commit id: {APP_COMMIT_ID}</p>

            <br />
            <a href={RouteTypes.RESET}>Reset</a>
        </div>
    )
}
