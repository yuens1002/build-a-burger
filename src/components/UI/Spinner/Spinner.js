import React from 'react'
import classes from './Spinner.css'

const error = 'Error: Page Can Not Load'
const update = 'Page is loading...'
const added = 'Burger Added'

const spinner = (props) => {
  return (
    <div className={`${classes.spinner} ${props.error ? classes.error : ''}`}>
      {props.error ? error : props.isAdded ? added : update}
    </div>
  )
}

export default spinner
