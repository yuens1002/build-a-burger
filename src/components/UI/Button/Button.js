import React from 'react';
import classes from './Button.css'
const getButtonClass = (type) => {
  return ({
    [undefined]: () => classes.button,
    close: () => [classes.button, classes.close].join(' '),
    larger: () => [classes.button, classes.larger].join(' '),
    smaller: () => [classes.button, classes.smaller].join(' '),
    primary: () => [classes.button, classes.primary].join(' '),
    del: () => [classes.button, classes.del].join(' ')
  })[type]()
}
const button = (props) => {
  return (
    <button
      className={`${getButtonClass(props.type)} ${props.noMargin ? classes.noMargin : ''}`}
      onClick={props.clicked}
      disabled={props.disabled || false}
      >
      {props.children}
    </button>
  )
}

export default button
