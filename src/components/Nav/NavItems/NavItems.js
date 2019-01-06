import React from 'react';
import NavItem from './NavItem/NavItem'
import classes from './NavItems.css'

const navItems = (props) => {
  return (
    <nav className={classes.navItems}>
      <NavItem>Store Menu</NavItem>
      <NavItem isActive>Burger Builder</NavItem>
      <NavItem>About Us</NavItem>
    </nav>
  )
}

export default navItems;
