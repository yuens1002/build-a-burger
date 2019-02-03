import Axios from 'axios'

const instance = Axios.create({
  baseURL: 'https://burger-builder-c7629.firebaseio.com'
})

// instance.interceptors.request.use(req => {
//   console.log(req)
//   return req
// })
// instance.interceptors.response.use(res => {
//   console.log(res)
//   return res
// }, error => {
// console.log(error.message)
//
// })

export default instance
