export { GenderLabel } from '@/types/staff'
export type { Gender } from '@/types/staff'
import type { ApiResponse, Gender } from '@/types/staff'
export type { ApiResponse }

// ─────────────────────────────────────────────────────────────────────────────
// Faculty
// ─────────────────────────────────────────────────────────────────────────────
export type Faculty = 'Engineering' | 'Design' | 'Management' | 'Healthcare' | 'Languages'

export const FacultyLabel: Record<Faculty, string> = {
  Engineering: 'Khoa Kỹ thuật',
  Design: 'Khoa Thiết kế',
  Management: 'Khoa Quản trị',
  Healthcare: 'Khoa Điều dưỡng',
  Languages: 'Khoa Ngoại ngữ',
}

export const FACULTY_OPTIONS = Object.keys(FacultyLabel) as Faculty[]

// ─────────────────────────────────────────────────────────────────────────────
// Request DTOs
// ─────────────────────────────────────────────────────────────────────────────
export interface CreateTeacherRequest {
  fullName: string
  email: string
  phone: string
  address: string
  faculty: Faculty
  gender: Gender
  dateOfBirth: string
}

export interface UpdateTeacherRequest {
  fullName: string
  email: string
  phone: string
  address: string
  faculty: Faculty
  gender: Gender
  dateOfBirth: string
}

// ─────────────────────────────────────────────────────────────────────────────
// Response DTO
// ─────────────────────────────────────────────────────────────────────────────
export interface TeacherResponse {
  id: string
  fullName: string
  email: string
  phone: string
  address: string
  faculty: Faculty
  gender: Gender
  dateOfBirth: string
  teacherCode: string
  isActive: boolean
}
