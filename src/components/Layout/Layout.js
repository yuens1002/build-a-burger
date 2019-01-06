import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import classes from './Layout.css'
import { overFlowHidden }from '../../index.css'
import Toolbar from '../Nav/Toolbar/Toolbar'
import SideDrawer from '../SideDrawer/SideDrawer'
import Backdrop from '../UI/Backdrop/Backdrop'

class Layout extends Component {

  state = {
    isDrawerOpen: false
  }

  toggleOverFlowClass = () => {
    document.body.classList.toggle(overFlowHidden)
  }

  closeDrawerHandler = () => {
    this.setState({isDrawerOpen : false})
    this.toggleOverFlowClass()
  }

  openDrawerHandler = () => {
    this.setState({isDrawerOpen : true})
    this.toggleOverFlowClass()
  }

  render () {
    return (
      <Aux>
        {this.state.isDrawerOpen ?
          <Backdrop toHideLayerOnTop={this.closeDrawerHandler} /> : null}
        {this.state.isDrawerOpen ?
          <SideDrawer
            toCloseDrawer={this.closeDrawerHandler}
            isDrawerOpen={this.state.isDrawerOpen} /> : null}
        <Toolbar toOpenDrawer={this.openDrawerHandler} />
        <main className={classes.content}>{this.props.children}</main>
      </Aux>
    )
  }
}

export default Layout
