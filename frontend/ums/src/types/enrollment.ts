import type { ClassScheduleResponse } from './classSchedule'

export interface EnrollmentResponse {
  id: string
  classId: string
  studentId: string
  studentFullName: string
  studentCode: string
  studentEmail: string
  enrolledAt: string
  status: string // 'Active' | 'Dropped'
}

export interface StudentClassResponse {
  classId: string
  classCode: string
  subjectName: string
  teacherName: string
  schoolYear: string
  semester: number
  enrolledAt: string
  schedules: ClassScheduleResponse[]
}

export interface CreateEnrollmentRequest {
  classId: string
  studentId: string
}
