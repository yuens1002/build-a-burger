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
import * as actions from '../../store/actions'

const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...actions
}, dispatch)

const mapStateToProps = ({
  hasPageError,
  prices,
  ingredients,
  customBurgerName,
  price,
  isLoading
}) => ({
  hasPageError,
  prices,
  ingredients,
  customBurgerName,
  price,
  isLoading
})



class BurgerBuilder extends Component {

  componentDidMount () {
    console.log('[component did mount]: BurgerBuilder')
    !this.props.ingredients && this.props.initIngredients()
  }

  addToCartHandler = () => {
    axiosInst.get('https://uinames.com/api/?amount=1?maxleng=15')
    .then(({data}) => {
      this.setState({customBurgerName: data.name})
      return axiosInst.get('/ingredients.json')
    })
    .then(({data}) => {
      this.setState({isAddedToCart: {...this.state.isAddedToCart, state: true}})
      this.props.addToCart(this.customBurger)
      setTimeout(() => {
        this.setState({ingredients: data})
        this.updatePrice()
        this.setState({isAddedToCart: {...this.state.isAddedToCart, state: false}})
      }, 900)
    })
    .catch((error) => {
      // this.setState({hasPageError: {...this.state.hasPageError, state: true}})
    })
  }

  updateIngredientHandler = (igName, changeType) => {
    const _ig = {...this.props.ingredients}
    changeType ? ++_ig[igName] : --_ig[igName]
    this.props.setProp({prop: 'ingredients', val: _ig})
    this.props.updatePrice()
  }

  toggleOverFlowClass = () => {
    document.body.classList.toggle(overFlowHidden)
  }

  get customBurgerDesc () {
    let str = 'Ingredient(s): '
    const i = {...this.props.ingredients}
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
      title: `${this.state.customBurgerName} Custom Burger`,
      desc: this.customBurgerDesc,
      ingredients: this.props.ingredients,
      price: this.props.price,
      qty: 1
    })
  }

  get spinnerType () {
    return [this.props.isLoading,
      this.props.hasPageError.state,
      this.state.isAddedToCart
    ].filter(process => !!process.state)[0].spinner
  }

  state = {
    controls: [
       'Bacon', 'Cheese', 'Meat', 'Veg'
    ],
    // prices: null,
    // basePrice: null,
    // price: null,
    // isModalOpen: false,
    // isLoading: {
    //   state: true,
    //   spinner: 'loading'
    // },
    // hasPageError: {
    //   state: false,
    //   spinner: 'error'
    // },
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
          this.props.isLoading.state || this.state.isAddedToCart.state || this.props.hasPageError.state ?
            <Spinner
              type={this.spinnerType}
            /> :
          <React.Fragment>
            <div className={classes.content}>
              <Burger ingredients={this.props.ingredients} />
              <div className={classes.controls}>
                <Controls
                  updateIngredient={this.updateIngredientHandler}
                  controls={this.state.controls}
                  ingredients={this.props.ingredients}
                  price={this.props.price}
                  toggleModal={this.toggleModalHandler} />
              </div>
            </div>
            <Order
              toAddToCart={this.addToCartHandler}
              price={this.props.price}
            />
          </React.Fragment>
        }
      </React.Fragment>
    )
  }
}

export default errorWrapper(connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder), axiosInst)
