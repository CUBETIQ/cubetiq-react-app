import AppProvider from '@/provider/AppProvider'
import RouterView from '../routes'
import './App.less'

const App = () => {
  return (
    <AppProvider><RouterView /></AppProvider>
  )
}

export default App
