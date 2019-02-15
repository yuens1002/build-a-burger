import React from 'react'
import NavItem from './NavItem/NavItem'
import classes from './NavItems.css'
import Image from '../../Image/Image'


const navItems = (props) => {

  return (
    <nav className={classes.navItems}>
      <NavItem linkTo="/menu" linkToExact clicked={props.toCloseDrawer}>Store Menu</NavItem>
      <NavItem linkTo="/" linkToExact clicked={props.toCloseDrawer}>Burger Builder</NavItem>
      <NavItem linkTo="/bag" linkToExact clicked={props.toCloseDrawer}><Image src='shoppingBag' alt='paper bag' /></NavItem>
    </nav>
  )
}

export default navItems
