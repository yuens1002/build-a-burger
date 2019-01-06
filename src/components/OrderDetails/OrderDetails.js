import React from 'react'
import classes from './OrderDetails.css'
import Button from '../UI/Button/Button'

const orderDetails = (props) => {
  const items = Object.keys(props.ingredients).map(igKey => {
    return (
      <div key={igKey} className={classes.row}>
        <div className={classes.desc}>{`${igKey} @ $${props.prices[igKey]}`}</div>
        <div className={classes.qty}>{props.ingredients[igKey]}</div>
        <div className={classes.subtotal}>{`$${props.prices[igKey] * props.ingredients[igKey]}`}</div>
      </div>
    )
  })
  return (
    <div>
      <div className={classes.close}><Button noMargin clicked={props.toggleModal} type="close">x</Button></div>
      <div className={classes.heading}>Order Details</div>
      <div className={`${classes.row} ${classes.headerRow}`}>
        <div className={classes.desc}>Ingredients</div>
        <div className={classes.qty}>Qty</div>
        <div className={classes.subtotal}>Total</div>
      </div>
      {items}
      <div className={classes.row}>
        <div className={classes.desc}>Base @ $4</div>
        <div className={classes.qty}>1</div>
        <div className={classes.subtotal}>$4</div>
      </div>
      <div className={classes.row}>
        <div className={classes.grandTotal}>Grand Total</div>
        <div className={classes.totalPrice}>${props.price}</div>
      </div>
      <div className={classes.confirmation}>
        <p>Continue to Order?</p>
        <Button clicked={props.toggleModal}>NO</Button>
        <Button clicked={() => alert('continued clicked')}>YES</Button>
      </div>

    </div>
  )
}
export default orderDetails
