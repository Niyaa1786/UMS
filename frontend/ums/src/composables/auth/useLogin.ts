import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'
import { authService } from '@/services/authService'
import { z } from 'zod'
import type { LoginRequest } from '@/types/auth'
import { getErrorMessage } from '@/utils/getErrorMessage'

const loginSchema = z.object({
  username: z.string().min(1, 'Tài khoản không được để trống'),
  password: z.string().min(1, 'Mật khẩu không được để trống'),
})

export function useLogin() {
  const router = useRouter()
  const authStore = useAuthStore()
  const toast = useToast()
  const isLoading = ref(false)

  const onSubmit = async (data: LoginRequest) => {
    isLoading.value = true
    try {
      const response = await authService.login(data)
      authStore.setAuth(response)

      toast.add({
        title: 'Thành công',
        description: 'Đăng nhập thành công!',
        color: 'success',
      })

      router.push('/dashboard')
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

  return {
    isLoading,
    onSubmit,
    loginSchema,
  }
}
