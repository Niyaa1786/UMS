import { ref } from 'vue'
import { authService } from '@/services/authService'
import { z } from 'zod'
import type { AdminChangePasswordRequest } from '@/types/auth'
import { getErrorMessage } from '@/utils/getErrorMessage'

const adminChangePasswordSchema = z.object({
  userId: z.string().uuid('userId không hợp lệ'),
  newPassword: z.string().min(6, 'Mật khẩu mới tối thiểu 6 ký tự'),
})

export function useAdminChangePassword() {
  const toast = useToast()
  const isLoading = ref(false)

  const onSubmit = async (data: AdminChangePasswordRequest) => {
    isLoading.value = true
    try {
      await authService.adminChangePassword(data)

      toast.add({
        title: 'Thành công',
        description: 'Đổi mật khẩu người dùng thành công!',
        color: 'success',
      })
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
    adminChangePasswordSchema,
  }
}
