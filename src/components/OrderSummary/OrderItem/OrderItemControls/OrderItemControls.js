import React from 'react'
import Button from '../../../UI/Button/Button'

const orderItemControls = (props) => {
  return (
    <React.Fragment>
      <Button type='smaller' clicked={props.toAddQty} disabled={props.orderQty >= 9}>+</Button>
      <Button noMargin type='smaller' clicked={props.toDecreaseQty} disabled={props.orderQty <= 1}>-</Button>
    </React.Fragment>
  )
}

export default orderItemControls
