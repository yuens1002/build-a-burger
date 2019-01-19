import React from 'react'
import NavItem from './NavItem/NavItem'
import classes from './NavItems.css'

const navItems = () => {
  return (
    <nav className={classes.navItems}>
      <NavItem linkTo="/" linkToExact>Store Menu</NavItem>
      <NavItem linkTo="/builder">Burger Builder</NavItem>
      <NavItem linkTo="/about">About Us</NavItem>
    </nav>
  )
}

export default navItems
