import React, { Component } from 'react'
import classes from './Ingredient.css'
import propTypes from 'prop-types'

class Ingredient extends Component {

  handlerNull () {
    console.log(`No ingredient type "${this.props.type}" found`)
    return null
  }

  typeCheck () {
    return [
      'bunBtm',
      'bunTop',
      'cheese',
      'meat',
      'veg',
      'bacon'].find(
        type => this.props.type === type
      )
  }

  render () {
    return this.typeCheck() ? ({
      bunTop: () => {
        return (
          <div className={classes.breadTop}>
            <div className={classes.seeds1}></div>
            <div className={classes.seeds2}></div>
          </div>
        )
      },
      bunBtm: () => {
        return (
          <div className={classes.breadBottom}></div>
        )
      },
      meat: () => {
        return (
          <div className={classes.meat}></div>
        )
      },
      cheese: () => {
        return (
          <div className={classes.cheese}></div>
        )
      },
      veg: () => {
        return (
          <div className={classes.veg}></div>
        )
      },
      bacon: () => {
        return (
          <div className={classes.bacon}></div>
        )
      }
    })[this.props.type]() : this.handlerNull()
  }
}

Ingredient.propTypes = {
  type: propTypes.string.isRequired
}

export default Ingredient
