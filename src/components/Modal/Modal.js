import React, { Component } from 'react'
import classes from './Modal.css'

class Model extends Component {
  shouldComponentUpdate (newProps, newState) {
    return (newProps.isModalOpen !== this.props.isModalOpen || newProps.children !== this.props.children)
  }

  render () {
    return (
      <div className={
        `${classes.offCanvas} ${this.props.isModalOpen ? classes.onCanvas : ''} ${this.props.isLoading ? classes.turnColor : ''}`
      }>{this.props.children}</div>
    )
  }
}
export default Model
