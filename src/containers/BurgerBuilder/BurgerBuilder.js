import React, { Component } from 'react'
import classes from './BurgerBuilder.css'
import { overFlowHidden, heading } from '../../index.css'
import Burger from '../../components/Burger/Burger'
import Controls from '../../components/Controls/Controls'
import Modal from '../../components/Modal/Modal'
import OrderDetails from '../../components/OrderDetails/OrderDetails'
import Order from '../../components/UI/Order/Order'
import axiosInst from '../../axios-order'
import Spinner from '../../components/UI/Spinner/Spinner'
import errorWrapper from '../../hoc/errorWrapper/errorWrapper'

class BurgerBuilder extends Component {

  componentDidMount () {

    console.log('[component did mount]: BurgerBuilder')
    // if (this.state.ingredients || this.state.prices) return
    this.setState({isLoading: true})
    axiosInst.get('/ingredients.json')
    .then(({data}) => {
      this.setState({ingredients: data})
      return axiosInst.get('/prices.json')
    }).then(({data}) => {
      this.setState({prices: data})
      this.setState({isLoading: false})
      this.updatePrice()
    }).catch((error) => {
      this.setState({hasPageError: true})
      this.setState({isLoading: false})
    })
  }

  orderHandler = () => {
    // this.setState({isLoading: true})
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: 'Sunny Yuen',
    //     address: 'Test Address',
    //     zipcode: 11122,
    //     country: 'US'
    //   },
    //   email: 'test@gmail.com',
    //   delivery: 'fastest'
    // }
    // /*****firebase *****************
    // xxx.json for firebase only
    // xxx.json, path/to/record
    // ********************************/
    // axiosInst.post('/orders.json', order)
    // .then(response => {
    //   this.setState({isLoading: false})
    //   this.toggleModalHandler()
    // })
    this.props.history.push('/bag')
  }
  updateIngredientHandler = (igName, changeType) => {
    this.setState(state => {
      const _ig = {...state.ingredients}
      changeType ? ++_ig[igName] : --_ig[igName]
      return ({ingredients: _ig})
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
    ingredients: null,
    controls: [
       'Bacon', 'Cheese', 'Meat', 'Veg'
    ],
    prices: null,
    price: null,
    basePrice: 4,
    isModalOpen: false,
    isLoading: false,
    hasPageError: false
  }

  render () {
    return (
      <React.Fragment>
        <Modal
          toCloseModal={this.toggleModalHandler}
          isModalOpen={this.state.isModalOpen}
          isLoading={this.state.isLoading}
        >
          {
            this.state.isLoading ?
            <Spinner error={this.state.hasPageError} /> :
            !this.state.ingredients || !this.state.prices ? '' :
            <OrderDetails
              toggleModal={this.toggleModalHandler}
              prices={this.state.prices}
              price={this.state.price}
              ingredients={this.state.ingredients}
              toPlaceOrder={this.orderHandler}
            />
          }
        </Modal>
        <div className={heading}>Build a Custom Burger</div>
        {
          !this.state.ingredients || !this.state.prices ?
          <Spinner error={this.state.hasPageError} /> :
          <React.Fragment>
            <div className={classes.content}>
              <Burger ingredients={this.state.ingredients} />
              <div className={classes.controls}>
                <Controls
                  updateIngredient={this.updateIngredientHandler}
                  controls={this.state.controls}
                  ingredients={this.state.ingredients}
                  price={this.state.price}
                  toggleModal={this.toggleModalHandler} />
              </div>
            </div>
            <Order
              toggleModal={this.toggleModalHandler}
              price={this.state.price}
            />
          </React.Fragment>
        }
      </React.Fragment>
    )
  }
}
export default errorWrapper(BurgerBuilder, axiosInst)
