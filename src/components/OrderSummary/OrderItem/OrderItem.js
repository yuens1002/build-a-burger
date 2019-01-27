import React from 'react'
import Button from '../../UI/Button/Button'
import { item, qty, desc, controls, price, deleteItem, unitPrice } from '../OrderSummary.css'

const orderItem = (props) => {
  return (
    <article className={item}>
      <div className={desc}><h3>{props.order.title}</h3>{props.order.desc}</div>
      <div className={unitPrice}>${props.order.price.toFixed(2)}</div>
      <div className={qty}>
        <Button noMargin type='smaller' disabled>{props.order.qty}</Button>
        <Button type='smaller' clicked={props.toAddQty} disabled={props.order.qty >= 9}>+</Button>
        <Button noMargin type='smaller' clicked={props.toDecreseQty} disabled={props.order.qty <= 1}>-</Button>
      </div>
      <div className={deleteItem}>
        <Button noMargin type='del' clicked={props.toDeleteItem}>x</Button>
      </div>
    </article>
  )
}

export default orderItem
