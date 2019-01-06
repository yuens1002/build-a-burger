import React from 'react'
import NavItems from '../Nav/NavItems/NavItems'
import Logo from '../UI/Logo/Logo'
import Button from '../UI/Button/Button'
import classes from './SideDrawer.css'

// const getClasses = (state) => {
//   state ?
//     [classes.sideDrawer, classes.open].join(' ') :
//     [classes.sideDrawer, classes.closed].join(' ')
// }

const sideDrawer = (props) => {
  return (

    // <div className={getClasses(props.isDrawerOpen)}>
    <div className={classes.sideDrawer}>
      <div className={classes.close}><Button type="close" clicked={props.toCloseDrawer}>x</Button></div>
      <div className={classes.logo}><Logo width="3rem"/></div>
      <NavItems />
    </div>
  )
}

export default sideDrawer
