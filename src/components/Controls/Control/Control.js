import React from 'react'
import classes from './Control.css'
import Button from '../../UI/Button/Button'

let isDisabled = (label, ingredients) => Boolean(!ingredients[label.toLowerCase()])

const control = (props) => (
  <div className={classes.container}>
    <div>{`${props.label} x${props.ingredients[props.label.toLowerCase()]}`}</div>
    <div>
      <Button
        type="larger"
        clicked={() => props.updateIngredient(props.label.toLowerCase(), 1)}
      >+</Button>
    </div>
    <div>
      <Button
        type="larger"
        clicked={() => props.updateIngredient(props.label.toLowerCase(), 0)}
        disabled={isDisabled(props.label, props.ingredients)}
      >-</Button>
    </div>
  </div>
)

export default control
