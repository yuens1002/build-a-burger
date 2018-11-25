import React from 'react'
import classes from './Control.css'

let isDisabled = (label, ingredients) => Boolean(!ingredients[label.toLowerCase()])

const control = (props) => (
  <div className={classes.container}>
    <div>{`${props.label} x ${props.ingredients[props.label.toLowerCase()]}`}</div>
    <div><button className={classes.button} onClick={() => props.updateIngredient(props.label.toLowerCase(), 1)}>+</button></div>
    <div>
      <button
        onClick={() => props.updateIngredient(props.label.toLowerCase(), 0)}
        className={classes.button}
        disabled={isDisabled(props.label, props.ingredients)}>
        -
      </button>
    </div>
  </div>
)

export default control
