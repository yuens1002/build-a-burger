import React, { Component } from 'react'
import Backdrop from '../UI/Backdrop/Backdrop'
import Aux from '../../hoc/Aux'
import classes from './Modal.css'

class Model extends Component {
  shouldComponentUpdate (newProps, newState) {
    return (newProps.isModalOpen !== this.props.isModalOpen || newProps.children !== this.props.children)
  }

  render () {
    return (
      <Aux>
        {this.props.isModalOpen ?
        <Backdrop
          toHideLayerOnTop={this.props.toCloseModal}
        /> : ''}
        <div className={
          `${classes.offCanvas} ${this.props.isModalOpen ? classes.onCanvas : ''} ${this.props.isLoading ? classes.turnColor : ''}`
        }>
          {this.props.children}
        </div>
      </Aux>
    )
  }
}
export default Model
