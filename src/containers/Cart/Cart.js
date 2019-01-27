import React, { Component } from 'react'
import OrderSummary from '../../components/OrderSummary/OrderSummary'
import Button from '../../components/UI/Button/Button'
import { heading } from '../../index.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import classes from './Cart.css'
import { incItemQty, decItemQty, delItem, updateTotal } from '../../store/actions'
import { Link } from 'react-router-dom'

const mapStateToProps = ({orders, total}) => ({
  orders,
  total
})

const mapDispatchToProps = dispatch => bindActionCreators({
  incItemQty,
  decItemQty,
  delItem,
  updateTotal
}, dispatch)

class Cart extends Component {

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
          toDecreseQty={this.decreaseQtyHandler}
          toDeleteItem={this.deleteItemHandler}
          total={this.props.total}
        />
        {
          this.props.orders.length ?
            <section className={classes.checkout}>
              <Button type="primary" noMargin>CHECKOUT</Button>
            </section> :
          <section className={classes.empty}>Order is empty.
            Try adding a Burger in <Link to="/builder">Burger Builder</Link></section>
        }
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
