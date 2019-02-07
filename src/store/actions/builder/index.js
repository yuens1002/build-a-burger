import axiosInst from '../../../axios-order'
import * as common from '../common'
import {
  SET_INGREDIENTS,
  UPDATE_PRICE,
  ADD_TO_CART
} from '../../constants/action-types'

export function addToCart(payload) {
  return {type: ADD_TO_CART, payload}
}

export function setIngredients (payload) {
  return {
    type: SET_INGREDIENTS,
    payload
  }
}

export function updatePrice () {
  return {
    type: UPDATE_PRICE
  }
}

export function onUpdateIngredient (payload) {
  return dispatch => {
    dispatch(common.setProp({prop: 'ingredients', val: payload }))
    dispatch(updatePrice())
  }
}

export function onAddToCart (payload) {
  return (dispatch, getState) => {
    dispatch(common.updateStatus({state: true, spinner: 'added', msg: ''}))
    axiosInst.get('https://uinames.com/api/?amount=1?maxleng=15')
    .then(({data}) => {
      dispatch(common.setProp({prop: 'customBurgerName', val: data.name}))
      return axiosInst.get('/ingredients.json')
    })
    .then(({data}) => {
      dispatch(addToCart(payload))
      dispatch(common.updateTotal(getState().cart))
      dispatch(common.setProp({prop: 'ingredients', val: data}))
      dispatch(updatePrice())
      setTimeout(() => {
        dispatch(common.updateStatus({state: false}))
      }, 600)
    })
    .catch((error) => {
      dispatch(common.updateStatus({
        state: true,
        spinner: 'error',
        msg: error.message
      }))
    })
  }
}

export function onInitIngredients() {
  return dispatch => {
    dispatch(common.updateStatus({
      state: true,
      msg: '',
      spinner: 'loading'
    }))
    axiosInst.get('/ingredients.json')
    .then(({data}) => {
      dispatch(setIngredients(data))
      return axiosInst.get('/prices.json')
    }).then(({data}) => {
      dispatch(common.setProp({prop: 'prices', val: data}))
      return axiosInst.get('/basePrice.json')
    })
    .then(({data}) => {
      dispatch(common.setProp({prop: 'basePrice', val: data}))
      dispatch(common.setProp({prop: 'price', val: data}))
      dispatch(updatePrice())
      dispatch(common.updateStatus({state: false}))
    })
    .catch((error) => {
      dispatch(common.updateStatus({
        state: true,
        spinner: 'error',
        msg: error.message}))
    })
  }
}
