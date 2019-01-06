import React from 'react'
import classes from './Modal.css'

const modal = (props) => {
  return (
    <div className={`${classes.offCanvas} ${props.isModalOpen ? classes.onCanvas : ''}`}>{props.children}</div>
  )
}

export default modal
