import React from 'react'
import classes from './Footer.css'

const footer = (props) => {
  return (
    <footer className={classes.footer}>{props.children}</footer>
  )
}

export default footer
