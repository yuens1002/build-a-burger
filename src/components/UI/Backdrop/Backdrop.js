import React from 'react'
import classes from './Backdrop.css'

const backdrop = (props) => (
  <div className={classes.background} onClick={props.toHideLayerOnTop} />
)
export default backdrop
