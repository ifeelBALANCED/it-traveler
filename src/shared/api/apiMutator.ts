import axios, { type AxiosRequestConfig } from 'axios'

export const apiMutator = async <T = unknown>(config: AxiosRequestConfig): Promise<T> => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers = { ...(config.headers || {}), Authorization: `Bearer ${token}` }
  }
  const response = await axios.request(config)
  return response.data
}
