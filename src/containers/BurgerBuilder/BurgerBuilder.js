import React, { Component } from 'react'
import classes from './BurgerBuilder.css'
import Burger from '../../components/Burger/Burger'
import Controls from '../../components/Controls/Controls'

class BurgerBuilder extends Component {

  state = {
    ingredients: {
      bacon: 0,
      cheese: 0,
      meat: 0,
      veg: 0,
    },
    controls: [
       'Bacon', 'Cheese', 'Meat', 'Veg'
    ]
  }

  render () {
    return (
      <div className={classes.content}>
        <div className={classes.burger}><Burger ingredients={this.state.ingredients} /></div>
        <div className={classes.controls}><Controls controls={this.state.controls} ingredients={this.state.ingredients} /></div>
      </div>
    )
  }
}
export default BurgerBuilder
