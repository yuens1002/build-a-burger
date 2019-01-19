import React, { Component } from 'react'
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import { container } from './index.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
      <div className={container}>
        <Layout>
          <Route exact path="/" render={() => (<h1>Menu</h1>)}/>
          <Route path="/builder" component={BurgerBuilder}/>
        </Layout>
      </div>
      </Router>
    )
  }
}

export default App
