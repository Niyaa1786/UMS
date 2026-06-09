// composables/useChangePassword.ts
import { ref } from 'vue'
import { authService } from '@/services/authService'
import { z } from 'zod'
import type { ChangePasswordRequest } from '@/types/auth'

const changePasswordSchema = z.object({
  oldPassword: z.string().min(1, 'Mật khẩu cũ không được để trống'),
  newPassword: z.string().min(6, 'Mật khẩu mới tối thiểu 6 ký tự'),
})

export function useChangePassword() {
  const toast = useToast()
  const isLoading = ref(false)

  const onSubmit = async (data: ChangePasswordRequest) => {
    isLoading.value = true
    try {
      await authService.changePassword(data)

      toast.add({
        title: 'Thành công',
        description: 'Đổi mật khẩu thành công!',
        color: 'success',
      })
    } catch (err) {
      toast.add({
        title: 'Lỗi',
        description: (err as Error).message,
        color: 'error',
      })
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    onSubmit,
    changePasswordSchema,
  }
}
