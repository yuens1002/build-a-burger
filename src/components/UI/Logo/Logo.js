import React from 'react';
import classes from './Logo.css'
import logoImg from '../../../assets/img/burger-logo.png'

const logo = ({width = '4rem'}) => {
  return (
    <div className={classes.logo} style={{width}}><img src={logoImg} alt="logo" /></div>
  )
}

export default logo
