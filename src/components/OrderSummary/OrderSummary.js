import React from 'react'
import OrderItem from './OrderItem/OrderItem'
import Button from '../UI/Button/Button'
import classes from './OrderSummary.css'

const orderSummary = (props) => {

  return (
    <React.Fragment>
      <article className={[classes.item, classes.header].join(' ')}>
        <div className={classes.desc}>Description</div>
        <div className={classes.unitPrice}>Price</div>
        <div className={classes.qty}>{`Qty. ${props.isCheckingOut ? '' : '/ Change Qty.'}`}</div>
        <div className={classes.deleteItemOrTotal}>{props.isCheckingOut ? 'Total' : 'Delete'}</div>
      </article>
      {
        props.cart.map((order, n) => {
          return (
            <OrderItem
            key={n}
            order={order}
            toAddQty={() => props.toAddQty(n)}
            toDeleteItem={() => props.toDeleteItem(n)}
            toDecreaseQty={() => props.toDecreaseQty(n)} />
          )
        })
      }
      {
        props.cart.length ? <article className={classes.total}>
        <span className={classes.totalText}>{`${props.isCheckingOut ? 'Grand ' : ''}Total $ `}</span>
        {props.total.toFixed(2)}</article> : ''
      }
      {
        props.cart.length ?
          props.isCheckingOut ? <article className={classes.action}><Button noMargin clicked={props.toEditOrder}>EDIT ORDER</Button></article> :
        <article className={classes.action}><Button type="primary" noMargin clicked={props.toCheckout}>CHECKOUT</Button></article> : ''
      }
    </React.Fragment>
  )
}

export default orderSummary
