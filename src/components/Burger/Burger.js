import React from 'react'
import classes from './Burger.css'
import Ingredient from './Ingredient/Ingredient'

const burger = (props) => {

  const ingredients =
  Object.keys(props.ingredients)
  .map(igName => {
    return [...Array(props.ingredients[igName])]
    .map((ig, i) => {
      return <Ingredient type={igName} key={igName + i} />
    })
  })
  return (
    <div className={classes.burger}>
      <Ingredient type="bunTop" />
      {ingredients.every(arr => !arr.length) ? 'No Burger Ingredients Added' : ingredients }
      <Ingredient type="bunBtm" />
    </div>
  )
}
export default burger
