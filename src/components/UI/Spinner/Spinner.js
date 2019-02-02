import React from 'react'
import classes from './Spinner.css'

const messages = {
  error: 'Error: Process can not contintue',
  loading: 'Page is loading...',
  added: 'Burger Added',
  success: 'Thank you for your order. Page rests in 5s'
}

const getText = (type) => {
  return messages[type]
}

const spinner = (props) => {
  return (
    <div className={`${classes.spinner} ${props.type === 'error' ? classes.error : ''}`}>
      {getText(props.type)}
    </div>
  )
}

export default spinner
