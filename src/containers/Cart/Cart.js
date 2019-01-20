import React, { Component } from 'react'
import { heading } from '../../index.css'
import classes from './Cart.css'

class Cart extends Component {

  state = {
    ingredients: {
      bacon: 0,
      cheese: 0,
      meat: 0,
      veg: 0
    }
  }
  
  render () {
    return (
      <React.Fragment>
        <div className={heading}>Shopping Bag</div>
      </React.Fragment>
    )
  }
}

export default Cart
