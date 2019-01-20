import React from 'react'
import shoppingBag from '../../assets/img/shoppingBag'

const getSrc = (srcName) => {
  return ({
    'shoppingBag': () => shoppingBag
  })[srcName]()
}

const image = ({width = '4rem', altText, src}) => {
  return (
    <div style={{width}}><img src={getSrc(src)} alt={altText} style={{width: '50%'}}/></div>
  )
}

export default image
