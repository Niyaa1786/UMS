import type { ClassStatus } from './classSchedule'

export interface ClassResponse {
  id: string
  code: string
  subjectId: string
  subjectName: string
  teacherId: string
  teacherName: string
  schoolYear: string  
  semester: number    
  startDate: string
  endDate: string
  maxStudents: number
  status: ClassStatus
}

export interface CreateClassRequest {
  code: string
  subjectId: string
  teacherId: string
  schoolYear: string
  semester: number
  startDate: string
  endDate: string
  maxStudents: number
}

export interface UpdateClassRequest {
  code: string
  subjectId: string
  teacherId: string
  schoolYear: string
  semester: number
  startDate: string
  endDate: string
  maxStudents: number
}