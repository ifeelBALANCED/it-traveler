import axios, { type AxiosRequestConfig, isAxiosError } from 'axios'
import { ROUTES } from '../types'

export async function apiMutator<T = unknown>(config: AxiosRequestConfig): Promise<T> {
  const token = sessionStorage.getItem('token')
  if (token) {
    config.headers = {
      ...(config.headers ?? {}),
      Authorization: `Bearer ${token}`,
    }
  }

  try {
    const res = await axios.request(config)
    return res.data
  } catch (err) {
    if (isAxiosError(err) && err.response) {
      const status = err.response.status
      if ([401, 403].includes(status)) {
        history.pushState(null, '', ROUTES.GREETING)
      }
    }
    throw err
  }
}
