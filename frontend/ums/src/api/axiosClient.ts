import axios from 'axios'

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

axiosClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken')
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

axiosClient.interceptors.response.use(
  (config) => {
    return config.data
  },
  async (error) => {
    const originalRequest = error.config

    if (error.response.status === 401 && !originalRequest._isRetry) {
      originalRequest._isRetry = true
      try {
        const refreshToken = localStorage.getItem('refreshToken')
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/Auth/RefreshToken`, {
          refreshToken,
        })

        if (res.data.isSuccess) {
          const { accessToken, refreshToken: newRefreshToken } = res.data.data
          localStorage.setItem('accessToken', accessToken)
          localStorage.setItem('refreshToken', newRefreshToken)
          originalRequest.headers.Authorization = `Bearer ${accessToken}`
          return axiosClient(originalRequest)
        } else {
          localStorage.clear()
          window.location.href = '/login'
          return Promise.reject(error)
        }
      } catch (refreshError) {
        localStorage.clear()
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }
  },
)

export default axiosClient
