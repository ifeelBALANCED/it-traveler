import axios, { type AxiosRequestConfig, type AxiosResponse, isAxiosError } from 'axios'
import { toast } from 'vue-sonner'
import { ROUTES } from '../types'

type ApiErrorResponse = {
  errors?: Record<string, string | string[]>
  message?: string
}

export async function apiMutator<T = unknown>(config: AxiosRequestConfig): Promise<T> {
  const token = sessionStorage.getItem('token')
  const headers = token ? { ...config.headers, Authorization: `Bearer ${token}` } : config.headers

  const updatedConfig: AxiosRequestConfig = {
    ...config,
    headers,
  }

  try {
    const res: AxiosResponse<T> = await axios.request(updatedConfig)
    return res.data
  } catch (err: unknown) {
    if (isAxiosError<ApiErrorResponse>(err) && err.response) {
      const { status, data } = err.response

      if (status === 401 || status === 403) {
        history.pushState(null, '', ROUTES.GREETING)
        toast.error('Unauthorized')
      }

      if (data.errors) {
        const errorMessages = Object.values(data.errors).flat()
        errorMessages.forEach((error) => toast.error(error))
      } else if (data.message) {
        toast.error(data.message)
      }
    } else if (err instanceof Error) {
      toast.error(err.message)
    } else {
      toast.error('An unknown error occurred')
    }

    throw err
  }
}
