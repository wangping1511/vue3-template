import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: -1,
})

request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config
  }, (error) => {
    return Promise.reject(error)
  },
)

request.interceptors.response.use((res: AxiosResponse) => {
  const config = res.config
  if (!config.headers)
    throw new Error('config headers is undefined')
  return res.data
})

export default request
