import React, { useEffect } from 'react'

import { useNotification } from '../state/NotificationProvider'

const notificationColorMap = {
  success: {
    border: 'darkGreen',
    background: 'green'
  },
  error: {
    border: 'dargRed',
    background: 'red'
  }
}

const Notification = () => {
  const { notification, clearNotification } = useNotification()

  useEffect(() => {
    if (notification) {
      const timeOutId = setTimeout(() => {
        clearNotification(undefined)
      }, notification.duration)

      return () => clearTimeout(timeOutId)
    }

  }, [notification])

  return notification ?(
    <div style={{
      display: 'inline-block',
      position: 'fixed',
      top: '0',
      right: '0',
      textAlign: 'right',
      padding: '10px',
      border: `2px solid ${notificationColorMap[notification.type]?.border}`,
      background: `${notificationColorMap[notification.type]?.background}`

    }}>
      {notification.message}
    </div>
  ) : null

}


export default Notification