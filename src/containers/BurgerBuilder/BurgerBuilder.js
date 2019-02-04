import React, { Component } from 'react'
import classes from './BurgerBuilder.css'
import { overFlowHidden, heading } from '../../index.css'
import Burger from '../../components/Burger/Burger'
import Controls from '../../components/Controls/Controls'
import Order from '../../components/UI/Order/Order'
import axiosInst from '../../axios-order'
import Spinner from '../../components/UI/Spinner/Spinner'
// import errorWrapper from '../../hoc/errorWrapper/errorWrapper'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import actions from '../../store/actions'

const mapDispatchToProps =
  dispatch => bindActionCreators({ ...actions }, dispatch)

const mapStateToProps = ({
  hasPageError,
  prices,
  ingredients,
  customBurgerName,
  price,
  status
}) => ({
  hasPageError,
  prices,
  ingredients,
  customBurgerName,
  price,
  status
})

class BurgerBuilder extends Component {

  componentDidMount () {
    console.log('[component did mount]: BurgerBuilder')
    this.props.status.state && !this.props.updateStatus({
      state: false,
      spinner: 'loading',
      msg: ''
    })
    !this.props.ingredients && this.props.onInitIngredients()
  }

  addToCartHandler = () => {
    this.props.onAddToCart(this.customBurger)
  }

  updateIngredientHandler = (igName, changeType) => {
    const _ig = {...this.props.ingredients}
    changeType ? ++_ig[igName] : --_ig[igName]
    this.props.onUpdateIngredient(_ig)
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

  customBurger = () => {
    return ({
      title: `${this.props.customBurgerName} Custom Burger`,
      desc: this.customBurgerDesc,
      ingredients: this.props.ingredients,
      price: this.props.price,
      qty: 1
    })
  }

  get spinnerType () {
    const progress = [this.props.isLoading,
      this.props.hasPageError,
      this.props.isAddedToCart
    ].filter(process => !!process.state)
    return progress[progress.length-1].spinner
  }

  // get isProgressStatusNeeded () {
  //   return this.props.isLoading.state || this.props.isAddedToCart.state || this.props.hasPageError.state
  // }

  state = {
    controls: [
       'Bacon', 'Cheese', 'Meat', 'Veg'
    ],
  }
  //Modal is no
  render () {
    return (
      <React.Fragment>
        <div className={heading}>Build a Custom Burger</div>
        {
          this.props.status.state ?
            <Spinner
              type={this.props.status.spinner}
            >{this.props.status.msg || ''}</Spinner> :
          this.props.ingredients ? <React.Fragment>
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
          </React.Fragment> : ''
        }
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder)
