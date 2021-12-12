import React, { useContext, useState, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'

export const NotificationContext = new React.createContext()

const createNotification =({
  message = 'Ann error occurred',
  duration = 3000,
  type = 'success'
} = {}) => ({ message, duration, type })


export const useNotification = () => {
  const notificationContext = useContext(NotificationContext)

  if (!notificationContext) {
    throw new Error('useNotification used outside provider')
  }

  return notificationContext
}


export const NotificationProvider = ({ children }) => {
  const [notification, _setNotification] = useState()

  const setSuccessNotification = useCallback(
    (message, duration) => _setNotification(createNotification({ message, duration, type: 'success' }))
  )

  const setErrorNotification = useCallback(
    (message, duration) => _setNotification(createNotification({ message, duration, type: 'error' }))
  )

  const clearNotification = useCallback(
    () => _setNotification(undefined)
  )

  const value = useMemo(
    () => (
      { notification, setSuccessNotification, setErrorNotification, clearNotification }),
    [notification, setSuccessNotification, clearNotification, setErrorNotification]
  )

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>)
}

NotificationProvider.propTypes = {
  children: PropTypes.element
}