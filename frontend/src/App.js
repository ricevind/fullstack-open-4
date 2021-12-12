import React from 'react'
import BlogsPage from './pages/BlogsPage'
import Login from './components/Login'
import { useUser, UserProvider } from './state/UserProvider'
import { NotificationProvider } from './state/NotificationProvider'

import Notification from './components/Notification'


const App = () => {
  const userContext = useUser()

  return (
    <div>
      <Notification></Notification>
      {
        // eslint-disable-next-line eqeqeq
        userContext.user == null ?
          <div>
            <Login></Login>
          </div>
          :
          <BlogsPage></BlogsPage>
      }
    </div>
  )
}

const AppWithProviders = () => (
  <UserProvider>
    <NotificationProvider>
      <App></App>
    </NotificationProvider>
  </UserProvider>)

export default AppWithProviders