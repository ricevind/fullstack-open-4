import PropTypes from 'prop-types'
import React, { forwardRef, useImperativeHandle, useState } from 'react'

const togglable = ({ action, children }, ref) => {
  const [visible, setVisible] = useState(false)
  useImperativeHandle(ref, () => ({
    close: () => setVisible(false)
  }))


  const toggle = () => setVisible(state => !state)


  const content = visible ? children : null

  return (
    <div>
      {content}
      <button onClick={toggle}>
        { visible ? 'cancel' : action}
      </button>
    </div>
  )
}

const Togglable = forwardRef(togglable, 'Togglable')

Togglable.propTypes = {
  children:  PropTypes.element,
  action: PropTypes.string
}

export default Togglable