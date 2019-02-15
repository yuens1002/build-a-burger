import React from 'react'
import classes from './NavItem.css'
import { NavLink, withRouter } from 'react-router-dom'

const navItem = (props) => {

  const clickHandler = () => {
    props.location.pathname !== props.linkTo && props.clicked && props.clicked()
  }

  return (
    <div onClick={clickHandler} className={classes.shell}>
      <NavLink
        exact={props.linkToExact}
        to={props.linkTo}
        activeClassName={classes.active}
        className={classes.navItem}
      >
        {props.children}
      </NavLink>
    </div>
  )
}

export default withRouter(navItem)
