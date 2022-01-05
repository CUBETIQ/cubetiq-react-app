import { BrowserRouter as Router } from 'react-router-dom'
import RouterView from '@/routes'
import { AuthProvider, LayoutProvider } from '@/context'
import './app.less'

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <LayoutProvider>
                    <RouterView />
                </LayoutProvider>
            </AuthProvider>
        </Router>
    )
}

export default App
