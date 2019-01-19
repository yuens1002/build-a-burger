import Axios from 'axios'

const instance = Axios.create({
  baseURL: 'https://burger-builder-c7629.firebaseio.com'
})

export default instance
