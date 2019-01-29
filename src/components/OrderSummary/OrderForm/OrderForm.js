import React from 'react'
import classes from './OrderForm.css'
import { heading } from '../../../index.css'
import { primary, button, noMargin } from '../../UI/Button/Button.css'



const orderForm = (props) => {
  return (
    <form className={classes.formControl}>
      <header className={heading}>Your Info</header>
      <div className={classes.row}>
        <div>
          <label id="name">Name</label>
          <input name="name" type="text" placeholder="ex. John Smith" required={true} />
        </div>
        <div>
          <label id="phone">Phone</label>
          <input name="phone" type="text" placeholder="(###)###-####" required={true} />
        </div>
      </div>
      <div>
        <label id="address">Address</label>
        <input name="address" type="text" placeholder="ex. 999 Melrose Pl." required={true}  />
      </div>
      <div className={classes.row}>
        <div>
          <label id="city">City</label>
          <input name="city" type="text" placeholder="Seattle" required={true} />
        </div>
        <div>
          <label id="state">State</label>
          <input name="state" type="text" placeholder="WA" required={true} />
        </div>
        <div>
          <label id="zipcode">Zip Code</label>
          <input name="zipcode" type="text" placeholder="#####" required={true} />
        </div>
      </div>
    </form>
  )
}

export default orderForm
