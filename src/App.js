import React, { Component } from 'react'
import Layout from './components/Layout/Layout'
import Cart from './containers/Cart/Cart'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import NoMatch from './components/NoMatch/NoMatch'
import { container } from './index.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
      <div className={container}>
        <Layout>
          <Switch>
            <Route exact path="/menu" render={() => (<h1>Menu</h1>)}/>
            <Route exact path="/bag" component={Cart}/>
            <Route exact path="/" component={BurgerBuilder}/>
            <Route component={NoMatch} />
          </Switch>
        </Layout>

      </div>
      </Router>
    )
  }
}

export default App
