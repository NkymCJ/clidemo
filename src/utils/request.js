import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// Create an axios instance
const service = axios.create({
  // URL = Base URL + Request URL
  baseURL: process.env.VUE_APP_BASE_API,
  // Request timeout
  timeout: 5000
})

// Request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    // ...
    if (store.state.user.token) {
      config.headers['Admin-Token'] = getToken()
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// Response interceptor
service.interceptors.response.use(
  response => response,
  error => {
    console.log('error: ' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
