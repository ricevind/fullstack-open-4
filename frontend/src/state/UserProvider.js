import React, { useContext, useState, useMemo } from 'react'
import PropTypes from 'prop-types'

export const UserContext = new React.createContext()


export const useUser = () => {
  const userContext = useContext(UserContext)

  if (!userContext) {
    throw new Error('useUser used outside provider')
  }

  return userContext
}


export const UserProvider = ({ children }) => {
  const [user, setUser] = useState()

  const value = useMemo(() => ({ user, setUser }), [user, setUser])

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>)
}

UserProvider.propTypes = {
  children: PropTypes.element
}