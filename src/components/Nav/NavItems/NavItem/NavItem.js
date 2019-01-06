import React from 'react';
import classes from './NavItem.css'

const getClasses = (isActive) => {
  return isActive ? [classes.navItem, classes.active].join(' ') : classes.navItem
}

const navItem = (props) => {
  return (
    <div className={getClasses(props.isActive)}>{props.children}</div>
  )
}

export default navItem;
