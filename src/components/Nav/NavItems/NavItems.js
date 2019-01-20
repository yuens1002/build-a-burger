import React from 'react'
import NavItem from './NavItem/NavItem'
import classes from './NavItems.css'
import Image from '../../Image/Image'


const navItems = () => {
  return (
    <nav className={classes.navItems}>
      <NavItem linkTo="/" linkToExact>Store Menu</NavItem>
      <NavItem linkTo="/builder">Burger Builder</NavItem>
      <NavItem linkTo="/bag"><Image src='shoppingBag' alt='paper bag' /></NavItem>
    </nav>
  )
}

export default navItems
