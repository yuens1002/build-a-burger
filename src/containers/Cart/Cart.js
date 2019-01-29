import React, { Component } from 'react'
import OrderSummary from '../../components/OrderSummary/OrderSummary'
import Button from '../../components/UI/Button/Button'
import OrderForm from '../../components/OrderSummary/OrderForm/OrderForm'
import { heading } from '../../index.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import classes from './Cart.css'
import { incItemQty, decItemQty, delItem, updateTotal, updateCheckout } from '../../store/actions'
import { Link } from 'react-router-dom'

const mapStateToProps = ( {orders, total, isCheckingOut} ) => ({
  orders,
  total,
  isCheckingOut
})

const mapDispatchToProps = dispatch => bindActionCreators({
  incItemQty,
  decItemQty,
  delItem,
  updateTotal,
  updateCheckout
}, dispatch)

class Cart extends Component {

  placeOrderHandler = (e) => {
    console.log('form submitted')
  }

  checkoutHandler = () => {
    this.props.updateCheckout(true)
  }

  backToCartHandler = () => {
    this.props.updateCheckout(false)
  }

  addQtyHandler = index => {
    this.props.incItemQty(index)
    this.props.updateTotal()
  }

  decreaseQtyHandler = index => {
    this.props.decItemQty(index)
    this.props.updateTotal()
  }

  deleteItemHandler = index => {
    this.props.delItem(index)
    this.props.updateTotal()
  }

  render () {
    return (
      <React.Fragment>
        <header className={heading}>Your Order</header>
        <OrderSummary
          orders={this.props.orders}
          toAddQty={this.addQtyHandler}
          toDecreaseQty={this.decreaseQtyHandler}
          toDeleteItem={this.deleteItemHandler}
          total={this.props.total}
          isCheckingOut={this.props.isCheckingOut}
          toCheckout={this.checkoutHandler}
          toEditOrder={this.backToCartHandler}
        />
        { this.props.isCheckingOut && <OrderForm /> }
        {
          this.props.orders.length ?
            <section className={classes.checkout}>
              {
                this.props.isCheckingOut &&
                <Button type="primary" noMargin clicked={this.placeOrderHandler}>ORDER NOW</Button>
              }
            </section> :
          <section className={classes.empty}>Order is empty.
            Try adding a Burger in <Link to="/builder">Burger Builder</Link></section>
        }
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
