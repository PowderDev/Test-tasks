import axios, { AxiosRequestConfig } from "axios"

export const API_URL = `http://135.181.35.61:2112`

const $api = axios.create({
  baseURL: API_URL,
})

$api.interceptors.request.use((config: AxiosRequestConfig) => {
  //@ts-expect-error
  config.headers.Authorization = localStorage.getItem("token")
  return config
})

$api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && error.config && !error.config._isRetry) {
      try {
        originalRequest._isRetry = true

        const res = await axios.get(`${API_URL}/auth?user=Powder`)
        localStorage.setItem("token", res.headers.authorization)

        return $api.request(originalRequest)
      } catch (err) {
        console.log(err)
      }
    }

    throw error
  }
)

export default $api
