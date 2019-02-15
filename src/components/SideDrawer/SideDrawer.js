import React from 'react'
import NavItems from '../Nav/NavItems/NavItems'
import Logo from '../UI/Logo/Logo'
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

      <div className={classes.logo}><Logo width="3rem"/></div>
      <NavItems
        currentPath={props.currentPath}
        toCloseDrawer={props.toCloseDrawer} />
    </div>
  )
}

export default sideDrawer
