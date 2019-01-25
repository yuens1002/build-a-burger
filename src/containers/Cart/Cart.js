import React, { Component } from 'react'
import OrderSummary from '../../components/OrderSummary/OrderSummary'
import { heading } from '../../index.css'
import classes from './Cart.css'
import { connect } from 'react-redux'

import { incItemQty, decItemQty, delItem } from '../../store/actions'

function mapStateToProps (state) {
  return {
    orders: state.orders
  }
}

function mapDispatchToProps (dispatch) {
  return ({
    incItemQty: index => dispatch(incItemQty(index)),
    decItemQty: index => dispatch(decItemQty(index)),
    delItem: index => dispatch(delItem(index))
  })
}

class Cart extends Component {

  // componentDidMount () {
  //   const query = new URLSearchParams(this.props.location.search)
  //   const ingredients = {}
  //   for (let param of query.entries()) {
  //     ingredients[param[0]] = +param[1]
  //   }
  //
  //   this.setState(state => {
  //     const orders = [...state.orders]
  //     orders.push({
  //       ...ingredients,
  //       name: 'Custom Burger',
  //       qty: 1,
  //       price: '4.50'
  //     })
  //     return {orders}
  //   })
  // }

  // state = {
  //   customIngredients: {
  //     bacon: 0,
  //     cheese: 0,
  //     meat: 0,
  //     veg: 0
  //   },
  //   orders: []
  // }

  addQtyHandler = (index) => {
    this.props.incItemQty(index)
  }

  decreaseQtyHandler = (index) => {
    this.props.decItemQty(index)
  }

  deleteItemHandler = (index) => {
    this.props.delItem(index)
  }



  render () {
    return (
      <React.Fragment>
        <div className={heading}>Shopping Bag</div>
        <OrderSummary
          orders={this.props.orders}
          toAddQty={this.addQtyHandler}
          toDecreseQty={this.decreaseQtyHandler}
          toDeleteItem={this.deleteItemHandler}
        />
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
