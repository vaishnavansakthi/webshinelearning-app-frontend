import axios from "axios"
import { decryptData } from "./security"

const baseUrl: string = `https://webshinelearning-app-backend.vercel.app`

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const myToken: any = decryptData("userData", "object")
    const token = myToken?.access_token

    const apiKey = `${import.meta.env.VITE_X_API_Key}`

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    if (apiKey) {
      config.headers["x-api-key"] = `${apiKey}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default axiosInstance
