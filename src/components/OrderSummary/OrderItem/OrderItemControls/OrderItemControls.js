import React from 'react'
import Button from '../../../UI/Button/Button'

const orderItemControls = (props) => {
  return (
    <React.Fragment>
      <Button noMargin type='smaller' clicked={props.toAddItem}>+</Button>
      <Button type='smaller' clicked={props.toDecrementItem}>-</Button>
    </React.Fragment>
  )
}

export default orderItemControls
