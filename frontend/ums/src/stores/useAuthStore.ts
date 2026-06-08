// src/stores/authStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService } from '@/services/authService'
import type { AuthResponse, UserDto } from '@/types/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<UserDto | null>(null)
  const accessToken = ref<string | null>(null)
  const refreshToken = ref<string | null>(null)

  const isAuthenticated = computed(() => !!accessToken.value)

  function setAuth(data: AuthResponse) {
    accessToken.value = data.accessToken
    refreshToken.value = data.refreshToken
    user.value = data.user
    localStorage.setItem('accessToken', data.accessToken)
    localStorage.setItem('refreshToken', data.refreshToken)
    localStorage.setItem('user', JSON.stringify(user.value))
  }

  function clearAuth() {
    accessToken.value = null
    refreshToken.value = null
    user.value = null
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
  }

  async function login(credentials: { username: string; password: string }) {
    const response = await authService.login(credentials)
    setAuth(response)
    return response
  }

  async function logout() {
    try {
      await authService.logout()
    } finally {
      clearAuth()
    }
  }

  async function refreshTokenFlow() {
    const token = localStorage.getItem('refreshToken')
    if (!token) throw new Error('No refresh token')
    const response = await authService.refreshToken(token)
    setAuth(response)
    return response
  }

  async function restoreAndRefresh() {
    const token = localStorage.getItem('accessToken')
    const storedRefreshToken = localStorage.getItem('refreshToken')
    if (token && storedRefreshToken) {
      try {
        await refreshTokenFlow()
        return true
      } catch {
        clearAuth()
        return false
      }
    }
    return false
  }

  return {
    user,
    accessToken,
    refreshToken,
    isAuthenticated,
    login,
    logout,
    refreshTokenFlow,
    restoreAndRefresh,
    setAuth,
    clearAuth,
  }
})
