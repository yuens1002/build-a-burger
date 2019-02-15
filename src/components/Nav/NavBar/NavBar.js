import React from 'react'
import classes from './NavBar.css'
import { container } from '../../../index.css'
import Logo from '../../UI/Logo/Logo'
import NavItems from '../NavItems/NavItems'
import DrawerToggleButton from '../../UI/DrawerToggleButton/DrawerToggleButton'

const navBar = (props) => {
  return (
    <header className={classes.toolbar}>
      <div className={[container, classes.toolbarContainer].join(' ')}>
        <div className={classes.menu}><DrawerToggleButton clicked={props.toOpenDrawer} /></div>
        <div className={classes.logo}><Logo /></div>
        <div className={classes.navItems}>
          <NavItems />
        </div>
      </div>
    </header>
  )
}

export default navBar
