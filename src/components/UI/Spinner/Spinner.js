import React from 'react'
import classes from './Spinner.css'

const messages = {
  error: 'Error: ',
  loading: 'Page is loading...',
  added: 'Burger Added',
  success: 'Thank you for your order. Page will reset in 5s'
}

const getText = (type) => {
  return messages[type]
}

const spinner = (props) => {
  return (
    <div className={`${classes.spinner} ${props.type === 'error' ? classes.error : ''}`}>
      {getText(props.type)}{props.children}
    </div>
  )
}

export default spinner
