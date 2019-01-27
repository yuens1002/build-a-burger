import React from 'react'
import OrderItem from './OrderItem/OrderItem'
import classes from './OrderSummary.css'

const orderSummary = (props) => {
  return (
    <React.Fragment>
      <article className={[classes.item, classes.header].join(' ')}>
        <div className={classes.desc}>Description</div>
        <div className={classes.unitPrice}>Price</div>
        <div className={classes.qty}>Qty. / Change Qty.</div>
        <div className={classes.deleteItem}>Delete</div>
      </article>
      {
        props.orders.map((order, n) => {
        return (
          <OrderItem
          key={n}
          order={order}
          toAddQty={() => props.toAddQty(n)}
          toDeleteItem={() => props.toDeleteItem(n)}
          toDecreseQty={() => props.toDecreseQty(n)} />
        )
      })
      }
      {
        props.total ? <article className={classes.total}>
        <span className={classes.totalText}>Total $ </span>
        {props.total.toFixed(2)}</article> : ''
      }
    </React.Fragment>
  )
}

export default orderSummary
