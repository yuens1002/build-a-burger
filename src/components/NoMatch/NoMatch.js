import React, { Component } from 'react'

class NoMatch extends Component {

  componentDidMount () {
    this.iCounter = setInterval(() => {
      this.setTime()
    }, 1000)
    setTimeout(() => {
      this.props.history.push('/')
    }, 5000)
  }

  componentWillUnmount () {
    clearInterval(this.iCounter)
  }

  state = {
    time: 5
  }

  setTime = () => {
    this.setState((state) => {
      return {time: this.state.time - 1}
    })
  }

  render() {
    return (
      <section>
        <h2>Page not Found</h2>
        {this.props.location.pathname}
        <p>redirect in {this.state.time}s...</p>
      </section>
    )
  }
}
export default NoMatch
