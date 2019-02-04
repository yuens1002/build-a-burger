import React, { Component } from 'react'
import OrderSummary from '../../components/OrderSummary/OrderSummary'
import Button from '../../components/UI/Button/Button'
import OrderForm from '../../components/OrderSummary/OrderForm/OrderForm'
import { heading } from '../../index.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import classes from './Cart.css'

import { Link } from 'react-router-dom'
import axiosInst from '../../axios-order'
import errorWrapper from '../../hoc/errorWrapper/errorWrapper'
import Spinner from '../../components/UI/Spinner/Spinner'

import actions from '../../store/actions/'

const mapStateToProps = ({
  cart,
  total,
  isCheckingOut,
  status
}) => ({
  cart,
  total,
  isCheckingOut,
  status
})

const mapDispatchToProps = dispatch => bindActionCreators({
  ...actions
}, dispatch)

class Cart extends Component {

  componentDidMount () {
    this.props.status.state
      && this.props.updateStatus({
      state: false,
    })
  }

  placeOrderHandler = () => {
    this.props.updateStatus({
      state: true,
      spinner: 'success'
    })
    window.scrollTo(0,0)
    this.props.onPlaceOrder({
      cart: this.props.cart,
      customer: this.state.customer,
      history: this.props.history
    })
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

  resetCartHandler = () => {
    console.log('resetCartHandler called')
    this.props.resetCart()
    this.props.updateTotal()
  }

  inputHandler = ({value, name}) => {
    let _customer = {...this.state.customer}
    _customer[name] = value
    this.setState({customer: _customer})
  }

  state = {
    customer: {
      name: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipcode: '',
      email: ''
    },
    isLoading: false,
    hasPageError: false,
  }

  render () {
    return (
      <React.Fragment>
        <header className={heading}>Your Order</header>
        {this.props.status.state ?
          <Spinner
            type={this.props.status.spinner}
          >{this.props.status.msg || ''}</Spinner> : ''
        }
        <OrderSummary
          cart={this.props.cart}
          toAddQty={this.addQtyHandler}
          toDecreaseQty={this.decreaseQtyHandler}
          toDeleteItem={this.deleteItemHandler}
          total={this.props.total}
          isCheckingOut={this.props.isCheckingOut}
          toCheckout={this.checkoutHandler}
          toEditOrder={this.backToCartHandler}
        />
        { this.props.isCheckingOut && <OrderForm toCaptureInput={this.inputHandler}/> }
        {
          this.props.cart.length ?
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
