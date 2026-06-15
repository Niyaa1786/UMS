export type Gender = 'Unknown' | 'Male' | 'Female' | 'Other'

export type Department = 'HumanResources' | 'TestingAndAssessment' | 'AcademicAffairs' | 'StudentServices'

export const GenderLabel: Record<Gender, string> = {
  Unknown: 'Không xác định',
  Male: 'Nam',
  Female: 'Nữ',
  Other: 'Khác',
}

export const DepartmentLabel: Record<Department, string> = {
  HumanResources: 'Phòng Nhân sự',
  TestingAndAssessment: 'Phòng Khảo thí',
  AcademicAffairs: 'Phòng Đào tạo',
  StudentServices: 'Phòng Công tác SV',
}

export interface CreateStaffRequest {
  fullName: string
  email: string
  phone: string
  address: string
  department: Department
  gender: Gender
  dateOfBirth: string
}

export interface UpdateStaffRequest {
  fullName: string
  email: string
  phone: string
  address: string
  department: Department
  gender: Gender
  dateOfBirth: string
}

export interface StaffResponse {
  id: string
  fullName: string
  email: string
  phone: string
  address: string
  department: Department
  gender: Gender
  dateOfBirth: string
  staffCode: string
  isActive: boolean
}

export interface ApiResponse<T> {
  isSuccess: boolean
  message: string
  data: T | null
  errors: unknown
  timeStamp: string
}
