import React from 'react'
import Button from '../../UI/Button/Button'
import OrderItemControls from './OrderItemControls/OrderItemControls'
import { item, qty, desc, deleteItemOrTotal, unitPrice, mobileGroup } from '../OrderSummary.css'
import { connect } from 'react-redux'

const mapStateToProps = ({isCheckingOut}) => ({
  isCheckingOut
})

const orderItem = (props) => {
  return (
    <article className={item}>
      <div className={desc}><h3>{props.order.title}</h3>{props.order.desc}</div>
      <div className={mobileGroup}>
        <div className={qty}>
          <Button noMargin type='smaller' disabled>{props.order.qty}</Button>
          {
            !props.isCheckingOut && <OrderItemControls
              toAddQty={props.toAddQty}
              orderQty={props.order.qty}
              toDecreaseQty={props.toDecreaseQty}
            />
          }
        </div>
        <div className={deleteItemOrTotal}>
          {
            props.isCheckingOut ?
              `$${(props.order.qty * props.order.price).toFixed(2)}` :
            <Button type='del' clicked={props.toDeleteItem}>x</Button>
          }
        </div>
        <div className={unitPrice}>${props.order.price.toFixed(2)}</div>
      </div>
    </article>
  )
}

export default connect(mapStateToProps)(orderItem)
