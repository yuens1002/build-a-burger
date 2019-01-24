import React from 'react'
import Button from '../../UI/Button/Button'
import { item, qty, desc, controls, price, deleteItem, unitPrice } from '../OrderSummary.css'

const orderItem = (props) => {
  return (
    <article className={item}>
      <div className={desc}><h3>{props.order.title}</h3>{props.order.desc}</div>
      <div className={unitPrice}>${props.order.price}</div>
      <div className={qty}>
        <Button noMargin type='smaller' disabled>{props.order.qty}</Button>
        <Button type='smaller' clicked={props.toAddQty}>+</Button>
        <Button noMargin type='smaller' clicked={props.toDecreaseQty}>-</Button>
      </div>
      <div className={deleteItem}>
        <Button noMargin type='del' clicked={props.toDeleteItem}>x</Button>
      </div>
    </article>
  )
}

export default orderItem
