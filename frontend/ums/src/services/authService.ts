import axiosClient from '@/api/axiosClient'
import type {
  LoginRequest,
  ChangePasswordRequest,
  AdminChangePasswordRequest,
  AuthResponse,
  ApiResponse,
} from '@/types/auth'

const BASE_URL = '/api/Auth'

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const res = await axiosClient.post<ApiResponse<AuthResponse>>(`${BASE_URL}/Login`, credentials)
    if (!res.data.isSuccess) throw new Error(res.data.message)
    return res.data.data!
  },

  async logout(): Promise<void> {
    const res = await axiosClient.post<ApiResponse<null>>(`${BASE_URL}/Logout`)
    if (!res.data.isSuccess) throw new Error(res.data.message)
  },

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const res = await axiosClient.post<ApiResponse<AuthResponse>>(`${BASE_URL}/RefreshToken`, { refreshToken })
    if (!res.data.isSuccess) throw new Error(res.data.message)
    return res.data.data!
  },

  async changePassword(request: ChangePasswordRequest): Promise<void> {
    const res = await axiosClient.post<ApiResponse<null>>(`${BASE_URL}/ChangePassword`, request)
    if (!res.data.isSuccess) throw new Error(res.data.message)
  },

  async adminChangePassword({ userId, newPassword }: AdminChangePasswordRequest): Promise<void> {
    const res = await axiosClient.post<ApiResponse<null>>(`${BASE_URL}/Admin/ChangePassword`, null, {
      params: { userId, newPassword },
    })
    if (!res.data.isSuccess) throw new Error(res.data.message)
  },
}
