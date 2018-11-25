import React from 'react'
import classes from './Control.css'

let isDisabled = (label, ingredients) => Boolean(!ingredients[label.toLowerCase()])

const control = (props) => (
  <div className={classes.container}>
    <div>{props.label}</div>
    <div><button className={classes.button}>+</button></div>
    <div>
      <button
        className={classes.button}
        disabled={isDisabled(props.label, props.ingredients)}>
        -
      </button>
    </div>
  </div>
)

export default control
