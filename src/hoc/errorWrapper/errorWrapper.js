import React, { Component } from 'react'
import ErrorMsg from '../../components/Modal/ErrorMsg/ErrorMsg'
import Modal from '../../components/Modal/Modal'
import Aux from '../Aux'

const errorWrapper = (WrappedComponent, AxiosInst) => {
  return class extends Component {

    state = {
      error: null
    }

    componentWillUnmount () {
      console.log('[component Will UnMount]: errorWrapper')
      AxiosInst.interceptors.response.eject(this.resInterceptor)
      AxiosInst.interceptors.request.eject(this.reqInterceptor)
    }

    componentWillMount () {
      console.log('[component Will Mount]: errorWrapper')
      this.reqInterceptor = AxiosInst.interceptors.request.use(req => {
        this.setState({error: null})
        return req
      })
      this.resInterceptor = AxiosInst.interceptors.response.use(res => {
        return res
      }, error => {
        this.setState({error: error.message})
      })
    }

    closeModalHandler = () => {
      this.setState({error: null})
    }

    render () {
      return (
        <Aux>
          <Modal
            isModalOpen={this.state.error}
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
