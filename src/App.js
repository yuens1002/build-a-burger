import React, { Component } from 'react'
import Layout from './components/Layout/Layout'
import Cart from './containers/Cart/Cart'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import { container } from './index.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
      <div className={container}>
        <Layout>
          <Route path="/builder" component={BurgerBuilder}/>
          <Route exact path="/bag" component={Cart}/>
          <Route exact path="/" render={() => (<h1>Menu</h1>)}/>
        </Layout>
      </div>
      </Router>
    )
  }
}

export default App
