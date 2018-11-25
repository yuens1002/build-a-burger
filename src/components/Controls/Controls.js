import React from 'react'
import Control from './Control/Control'
import classes from './Controls.css'

const controls = (props) => (
  <div>
    <div className={classes.heading}>Customize Ingredients</div>
    {
      props.controls.map(control => {
        return <Control label={control} key={control} ingredients={props.ingredients} />
      })
    }
  </div>
)

export default controls
