import React from 'react'
import Button from '../../UI/Button/Button'
import Aux from '../../../hoc/Aux'
import classes from './ErrorMsg.css'

const errorMsg = (props) => {
  return (
    <Aux>
      <div className={classes.button}>
        <Button
          type="close"
          noMargin
          clicked={props.toCloseModal}
        >x
        </Button>
      </div>
      <div className={classes.error}>
        {props.children}
      </div>
    </Aux>
  )
}

export default errorMsg
