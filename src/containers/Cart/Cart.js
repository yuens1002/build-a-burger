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
import axiosInst from '../../axios-order'
import errorWrapper from '../../hoc/errorWrapper/errorWrapper'

const mapStateToProps = ( {cart, total, isCheckingOut} ) => ({
  cart,
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

  placeOrderHandler = () => {
    this.setState({isLoading: true})
    Promise.all([
      axiosInst.get('/prices.json'),
      axiosInst.get('./basePrice.json')
    ]).then(([prices, basePrice]) => {
      const _total = this.props.cart.reduce((total, item) => {
        return ((Object.keys(prices.data).reduce((subTotal, ingKey) => {
          return subTotal += (item.ingredients[ingKey] * prices.data[ingKey])
        }, 0) + basePrice.data) * item.qty) + total
      }, 0)
      const _order = {
        customer: this.state.customer,
        price: _total,
        order: this.props.cart
      }
      /*****firebase *****************
      xxx.json for firebase only
      xxx.json, path/to/record
      ********************************/
      axiosInst.post('/orders.json', _order)
    }).then(response => {
        this.setState({isLoading: false})
      }).catch((pricesError, basePriceError) => {
        this.setState({hasPageError: true})
        this.setState({isLoading: false})
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
    hasPageError: false
  }

  render () {
    return (
      <React.Fragment>
        <header className={heading}>Your Order</header>
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

export default errorWrapper(connect(mapStateToProps, mapDispatchToProps)(Cart), axiosInst)
