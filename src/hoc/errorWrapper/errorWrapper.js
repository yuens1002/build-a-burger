import React, { Component } from 'react'
import ErrorMsg from '../../components/Modal/ErrorMsg/ErrorMsg'
import Modal from '../../components/Modal/Modal'
import Aux from '../Aux'

const errorWrapper = (WrappedComponent, AxiosInst) => {
  return class extends Component {

    state = {
      isOpened: false,
      error: ''
    }
    componentWillUnmount () {
      //should cancel all subscriptions and async tasks... here also
      AxiosInst.interceptors.response.eject(this.resInterceptor)
      AxiosInst.interceptors.request.eject(this.reqInterceptor)
    }

    componentWillMount () {
      this.reqInterceptor = AxiosInst.interceptors.request.use(req => {
        this.setState({error: null, isOpened: false})
        console.log(req)

        return req
      })
      this.resInterceptor = AxiosInst.interceptors.response.use(res => {
        console.log(res)
        return res
      }, error => {

        this.setState({error: error.message, isOpened: true})
      })
    }
    closeModalHandler = () => {
      this.setState({error: null, isOpened: false})
    }
    render () {
      return (
        <Aux>
          <Modal
            isModalOpen={this.state.isOpened}
            toCloseModal={this.closeModalHandler}
          >
            <ErrorMsg toCloseModal={this.closeModalHandler}>
              {this.state.error}
            </ErrorMsg>
          </Modal>
          <WrappedComponent { ...this.props } />
        </Aux>
      )
    }
  }
}

export default errorWrapper
