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
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addToCart, updateTotal } from '../../store/actions'

const mapStateToProps = ({loaded}) => ({
  loaded
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  addToCart,
  updateTotal
}, dispatch)

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
        return axiosInst.get('/basePrice.json')
      }).then(({data}) => {
        this.setState({basePrice: data})
        this.setState({isLoading: false})
        this.updatePrice()
      }).catch((error) => {
        this.setState({hasPageError: true})
        this.setState({isLoading: false})
      })
  }

  addToCartHandler = () => {
    this.setState({isloading: true})
    axiosInst.get('https://uinames.com/api/?amount=1?maxleng=15')
    .then(({data}) => {
      this.setState({burgerName: data.name})
      this.props.addToCart(this.customBurger)
      this.props.updateTotal()
      return axiosInst.get('/ingredients.json')
    })
    .then(({data}) => {
      this.setState({isAddedToCart: true})
      setTimeout(() => {
        this.setState({ingredients: data})
        this.setState({isAddedToCart: false})
      }, 750)
      this.setState({isloading: false})
    })
    .catch((error) => {
      this.setState({hasPageError: true})
      this.setState({isloading: false})
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
    // axiosInst.post('/cart.json', order)
    // .then(response => {
    //   this.setState({isLoading: false})
    //   this.toggleModalHandler()
    // })
    const queryParams = []
    for (let key in this.state.ingredients) {
      if (this.state.ingredients[key]) {
        queryParams.push(
          `&${encodeURIComponent(key)}=${encodeURIComponent(this.state.ingredients[key])}`
        )
      }
    }
    this.props.history.push({
      pathname: '/bag',
      search: queryParams.join('')
    })
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
        }, state.basePrice)
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

  get customBurgerDesc () {
    let str = 'Ingredient(s): '
    const i = {...this.state.ingredients}
    const _addedIngredients = Object.keys(i).reduce((all, key) => {
      if (i[key]) { all[key] = i[key] }
      return all
    }, {})
    Object.keys(_addedIngredients).forEach((key, n) => {
      str = str.concat(`${key} x${i[key]}${n < Object.keys(_addedIngredients).length-1 ? ', ' : ''}`)
    })
    return str
  }

  get customBurger () {
    return ({
      title: `${this.state.burgerName} Custom Special`,
      desc: this.customBurgerDesc,
      ingredients: this.state.ingredients,
      price: this.state.price,
      qty: 1
    })
  }

  state = {
    ingredients: null,
    controls: [
       'Bacon', 'Cheese', 'Meat', 'Veg'
    ],
    burgerName: '',
    prices: null,
    basePrice: null,
    price: null,
    isModalOpen: false,
    isLoading: false,
    hasPageError: false,
    isAddedToCart: false,
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
          !this.state.ingredients ?
          <Spinner error={this.state.hasPageError} /> :
          !this.state.isAddedToCart ?
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
              toAddToCart={this.addToCartHandler}
              price={this.state.price}
            />
          </React.Fragment> :
          <Spinner
            error={this.state.hasPageError}
            isAdded={this.state.isAddedToCart}
          />
        }
      </React.Fragment>
    )
  }
}

export default errorWrapper(connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder), axiosInst)
