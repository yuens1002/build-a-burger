import React from 'react'
import Control from './Control/Control'
import classes from './Controls.css'

const controls = (props) => (
  <div className={classes.controls}>
    {
      props.controls.map(control => {
        return <Control
          updateIngredient={props.updateIngredient}
          label={control}
          key={control}
          ingredients={props.ingredients} />
      })
    }
  </div>
)

export default controls
