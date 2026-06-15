export { GenderLabel } from '@/types/staff'
export type { Gender } from '@/types/staff'
import type { ApiResponse, Gender } from '@/types/staff'
export type { ApiResponse }

// ─────────────────────────────────────────────────────────────────────────────
// Major
// ─────────────────────────────────────────────────────────────────────────────
export const MAJOR_OPTIONS = [
  'Công nghệ thông tin',
  'Kế toán',
  'Quản trị kinh doanh',
  'Thiết kế đồ họa',
  'Điện - Điện tử',
  'Cơ khí',
  'Du lịch',
  'Điều dưỡng',
  'Ngôn ngữ Anh',
  'Tài chính - Ngân hàng',
] as const

// ─────────────────────────────────────────────────────────────────────────────
// Request DTOs
// ─────────────────────────────────────────────────────────────────────────────
export interface CreateStudentRequest {
  fullName: string
  email: string
  phone: string
  address: string
  major: string
  gender: string
  dateOfBirth: string
}

export interface UpdateStudentRequest {
  fullName: string
  email: string
  phone: string
  address: string
  major: string
  gender: Gender
  dateOfBirth: string
}

// ─────────────────────────────────────────────────────────────────────────────
// Response DTO
// ─────────────────────────────────────────────────────────────────────────────
export interface StudentResponse {
  id: string
  fullName: string
  email: string
  phone: string
  address: string
  major: string
  gender: Gender
  dateOfBirth: string
  studentCode: string
  isActive: boolean
}
