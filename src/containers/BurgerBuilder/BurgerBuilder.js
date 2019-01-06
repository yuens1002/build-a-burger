import React, { Component } from 'react'
import classes from './BurgerBuilder.css'
import { overFlowHidden }from '../../index.css'
import Burger from '../../components/Burger/Burger'
import Controls from '../../components/Controls/Controls'
import Modal from '../../components/Modal/Modal'
import OrderDetails from '../../components/OrderDetails/OrderDetails'
import Backdrop from '../../components/UI/Backdrop/Backdrop'
import Order from '../../components/UI/Order/Order'
import Aux from '../../hoc/Aux'

class BurgerBuilder extends Component {

  updateIngredientHandler = (igName, changeType) => {
    this.setState(state => {
      const _ig = {...state.ingredients}
      changeType ? ++_ig[igName] : --_ig[igName]
      return state.ingredients = _ig
    })
    this.updatePrice()
  }

  updatePrice = () => {
    this.setState(state => {
      return state.price =
        Object.keys(state.prices).reduce((price, key) => {
          return price += (state.prices[key] * state.ingredients[key])
        }, this.state.basePrice)
    })
  }

  toggleOverFlowClass = () => {
    document.body.classList.toggle(overFlowHidden)
  }

  toggleModalHandler = () => {
    this.toggleOverFlowClass()
    const _modalOpen = this.state.isModalOpen
    return this.setState({isModalOpen : !_modalOpen})
  }

  state = {
    ingredients: {
      bacon: 0,
      cheese: 0,
      meat: 0,
      veg: 0,
    },
    controls: [
       'Bacon', 'Cheese', 'Meat', 'Veg'
    ],
    prices: {
      bacon: 2,
      cheese: 1,
      meat: 3,
      veg: 1.5
    },
    price: 4,
    basePrice: 4,
    isModalOpen: false
  }

  render () {
    return (
      <Aux>
        {this.state.isModalOpen ? <Backdrop toHideLayerOnTop={this.toggleModalHandler} /> : null}
        <Modal isModalOpen={this.state.isModalOpen}>
          <OrderDetails
            toggleModal={this.toggleModalHandler}
            prices={this.state.prices}
            price={this.state.price}
            ingredients={this.state.ingredients}/>
        </Modal>
        <div className={classes.heading}>Build a Custom Burger</div>
        <div className={classes.content}>
          <div className={classes.controls}>
            <Controls
              updateIngredient={this.updateIngredientHandler}
              controls={this.state.controls}
              ingredients={this.state.ingredients}
              price={this.state.price}
              toggleModal={this.toggleModalHandler} />
          </div>
          <Burger ingredients={this.state.ingredients} />
        </div>
        <Order
          toggleModal={this.toggleModalHandler}
          price={this.state.price}
        />
      </Aux>
    )
  }
}
export default BurgerBuilder
