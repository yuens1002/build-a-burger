import React from 'react'
import classes from './DrawerToggleButton.css'

const drawerToggleButton = (props) => {
  return (
    <div className={classes.openButton} onClick={props.clicked}>Menu</div>
  )
}

export default drawerToggleButton
