import React from 'react'
import classes from './NavItem.css'
import { NavLink } from 'react-router-dom'

const navItem = (props) => {
  return (
    <NavLink
      exact={props.linkToExact}
      to={props.linkTo}
      activeClassName={classes.active}
      className={classes.navItem}
    >
      {props.children}
    </NavLink>
  )
}

export default navItem
