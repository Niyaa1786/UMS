// ============================
// 1. Union Types
// ============================
export type Role = 'Admin' | 'Staff' | 'Teacher' | 'Student'

// ============================
// 2. Request Types
// ============================
export interface LoginRequest {
  username: string
  password: string
}

export interface ChangePasswordRequest {
  oldPassword: string
  newPassword: string
}

export interface AdminChangePasswordRequest {
  userId: string
  newPassword: string
}

// ============================
// 3. Response Types
// ============================
export interface UserDto {
  id: string
  username: string
  email: string
  role: Role
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  accessTokenExpiration: string
  refreshTokenExpiration: string
  user: UserDto
}

// ============================
// 4. ApiResponse Wrapper
// ============================
export interface ApiResponse<T> {
  isSuccess: boolean
  message: string
  data: T | null
  errors: unknown
  timeStamp: string
}

// ============================
// ApiResponse
// ============================
export type LoginResponse = ApiResponse<AuthResponse>
export type RefreshTokenResponse = ApiResponse<AuthResponse>
export type ChangePasswordResponse = ApiResponse<null>
