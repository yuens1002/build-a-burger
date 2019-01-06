import React, { Component } from 'react'
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import { container } from './index.css'

class App extends Component {
  render() {
    return (
      <div className={container}>
        <Layout>
          <BurgerBuilder></BurgerBuilder>
        </Layout>
      </div>
    )
  }
}

export default App
