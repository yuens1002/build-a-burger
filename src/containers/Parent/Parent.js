import React from 'react'
import App from '../../App.js'
import { Route } from 'react-router-dom'

const parent = () => {
  return (
    <React.Fragment>
      <Route path="/" exact component={App}/>
      <Route path="/login" render={() => (<h1>login</h1>)} />
    </React.Fragment>
  )
}

export default parent
