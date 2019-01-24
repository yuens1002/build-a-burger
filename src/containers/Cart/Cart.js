import React, { Component } from 'react'
import OrderSummary from '../../components/OrderSummary/OrderSummary'
import { heading } from '../../index.css'
import classes from './Cart.css'
import { connect } from 'react-redux'
const mapStateToProps = ({orders}) => ({orders})

class Cart extends Component {

  componentDidMount () {
    const query = new URLSearchParams(this.props.location.search)
    const ingredients = {}
    for (let param of query.entries()) {
      ingredients[param[0]] = +param[1]
    }

    this.setState(state => {
      const orders = [...state.orders]
      orders.push({
        ...ingredients,
        name: 'Custom Burger',
        qty: 1,
        price: '4.50'
      })
      return {orders}
    })
  }

  state = {
    ingredients: {
      bacon: 0,
      cheese: 0,
      meat: 0,
      veg: 0
    },
    orders: []
  }

  addQtyHandler = () => {}

  decreaseQtyHandler = () => {}

  deleteItemHandler = () => {}



  render () {
    return (
      <React.Fragment>
        <div className={heading}>Shopping Bag</div>
        <OrderSummary
          orders={this.props.orders}
          toAddQty={this.addQtyHandler}
          toDeleteItem={this.decreaseQtyHandler}
          toDecreseQty={this.deleteItemHandler}
        />
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps)(Cart)
