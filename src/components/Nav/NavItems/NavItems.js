import React from 'react'
import NavItem from './NavItem/NavItem'
import classes from './NavItems.css'
import Image from '../../Image/Image'


const navItems = () => {
  return (
    <nav className={classes.navItems}>
      <NavItem linkTo="/menu" linkToExact>Store Menu</NavItem>
      <NavItem linkTo="/" linkToExact>Burger Builder</NavItem>
      <NavItem linkTo="/bag" linkToExact><Image src='shoppingBag' alt='paper bag' /></NavItem>
    </nav>
  )
}

export default navItems
