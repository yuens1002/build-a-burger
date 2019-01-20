import React from 'react'
import classes from './Footer.css'

const footer = (props) => {
  return (
    <footer className={classes.footer}>
      {props.children}
      <span> Icons made by <a href="https://www.freepik.com/"
          title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/"
          title="Flaticon">www.flaticon.com</a> is licensed by <a
          href="http://creativecommons.org/licenses/by/3.0/"
          title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a>
      </span>
    </footer>
  )
}

export default footer
