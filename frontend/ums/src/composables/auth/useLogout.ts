import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'
import { authService } from '@/services/authService'
import { getErrorMessage } from '@/utils/getErrorMessage'

export function useLogout() {
  const router = useRouter()
  const authStore = useAuthStore()
  const toast = useToast()
  const isLoading = ref(false)

  const logout = async () => {
    isLoading.value = true
    try {
      await authService.logout()
      authStore.clearAuth()

      toast.add({
        title: 'Thành công',
        description: 'Đăng xuất thành công!',
        color: 'success',
      })

      router.push('/login')
    } catch (err) {
      toast.add({
        title: 'Lỗi',
        description: getErrorMessage(err),
        color: 'error',
      })
    } finally {
      isLoading.value = false
    }
  }

  return { isLoading, logout }
}
