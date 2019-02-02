import React, { Component } from 'react'
import classes from './BurgerBuilder.css'
import { overFlowHidden, heading } from '../../index.css'
import Burger from '../../components/Burger/Burger'
import Controls from '../../components/Controls/Controls'
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
      // this.setState({isLoading: {...this.state.isLoading, state: true}})
      axiosInst.get('/ingredients.json')
      .then(({data}) => {
        this.setState({ingredients: data})
        return axiosInst.get('/prices.json')
      }).then(({data}) => {
        this.setState({prices: data})
        return axiosInst.get('/basePrice.json')
      }).then(({data}) => {
        this.setState({basePrice: data})
        this.updatePrice()
        setTimeout(() => {
          this.setState({isLoading: {...this.state.isLoading, state: false}})
        }, 500)
      }).catch((error) => {
        this.setState({hasPageError: {...this.state.hasPageError, state: true}})
      })
  }

  addToCartHandler = () => {
    axiosInst.get('https://uinames.com/api/?amount=1?maxleng=15')
    .then(({data}) => {
      this.setState({burgerName: data.name})
      return axiosInst.get('/ingredients.json')
    })
    .then(({data}) => {
      this.setState({isAddedToCart: {...this.state.isAddedToCart, state: true}})
      this.props.addToCart(this.customBurger)
      this.props.updateTotal()
      setTimeout(() => {
        this.setState({ingredients: data})
        this.setState({isAddedToCart: {...this.state.isAddedToCart, state: false}})
      }, 900)
    })
    .catch((error) => {
      this.setState({hasPageError: {...this.state.hasPageError, state: true}})
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
      title: `${this.state.burgerName} Custom Burger`,
      desc: this.customBurgerDesc,
      ingredients: this.state.ingredients,
      price: this.state.price,
      qty: 1
    })
  }

  get spinnerType () {
    return [this.state.isLoading, this.state.hasPageError, this.state.isAddedToCart].filter(process => !!process.state)[0].spinner
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
    isLoading: {
      state: true,
      spinner: 'loading'
    },
    hasPageError: {
      state: false,
      spinner: 'error'
    },
    isAddedToCart: {
      state: false,
      spinner: 'added'
    }
  }
  //Modal is no
  render () {
    return (
      <React.Fragment>
        <div className={heading}>Build a Custom Burger</div>
        {
          this.state.isLoading.state || this.state.isAddedToCart.state || this.state.hasPageError.state ?
            <Spinner
              type={this.spinnerType}
            /> :
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
          </React.Fragment>
        }
      </React.Fragment>
    )
  }
}

export default errorWrapper(connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder), axiosInst)
