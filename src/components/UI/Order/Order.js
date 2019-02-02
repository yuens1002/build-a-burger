import React from 'react'
import classes from './Order.css'
import Button from '../../UI/Button/Button'

const order = (props) => (
  <div className={classes.container}>
    <div className={classes.price}>{`$${props.price}`}</div>
    <Button type="primary" noMargin clicked={props.toAddToCart}>ADD TO ORDER</Button>
  </div>
)

export default order
