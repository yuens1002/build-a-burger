import React from 'react'
import classes from './Spinner.css'

const error = 'Error: Page Can Not Load'
const update = 'Page is loading...'

const spinner = (props) => {
  return (
    <div className={`${classes.spinner} ${props.error ? classes.error : ''}`}>
      {props.error ? error : update}
    </div>
  )
}

export default spinner
