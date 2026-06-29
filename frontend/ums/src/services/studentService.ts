// src/services/studentService.ts
import axiosClient from '@/api/axiosClient'
import type { ApiResponse } from '@/types/staff'
import type { CreateStudentRequest, UpdateStudentRequest, StudentResponse } from '@/types/student'
import type { StudentClassResponse, EnrollmentResponse } from '@/types/enrollment'
import type { ClassResponse } from '@/types/class'

const BASE = '/api/UserManagement'
const STUDENT_BASE = '/api/student'

export const studentService = {
  async getAllStudents(): Promise<StudentResponse[]> {
    const res = await axiosClient.get<ApiResponse<StudentResponse[]>>(`${BASE}/Students`)
    if (!res.data.isSuccess) throw new Error(res.data.message)
    return res.data.data!
  },

  async getStudent(id: string): Promise<StudentResponse> {
    const res = await axiosClient.get<ApiResponse<StudentResponse>>(`${BASE}/Student/${id}`)
    if (!res.data.isSuccess) throw new Error(res.data.message)
    return res.data.data!
  },

  async createStudent(request: CreateStudentRequest): Promise<StudentResponse> {
    const res = await axiosClient.post<ApiResponse<StudentResponse>>(`${BASE}/Student`, request)
    if (!res.data.isSuccess) throw new Error(res.data.message)
    return res.data.data!
  },

  async updateStudent(id: string, request: UpdateStudentRequest): Promise<StudentResponse> {
    const res = await axiosClient.put<ApiResponse<StudentResponse>>(`${BASE}/Student/${id}`, request)
    if (!res.data.isSuccess) throw new Error(res.data.message)
    return res.data.data!
  },

  async removeStudent(id: string): Promise<void> {
    const res = await axiosClient.delete<ApiResponse<null>>(`${BASE}/Student/${id}`)
    if (!res.data.isSuccess) throw new Error(res.data.message)
  },

  async toggleStudentStatus(studentCode: string, isActive: boolean): Promise<void> {
    const res = await axiosClient.post<ApiResponse<null>>(`${BASE}/Account/${studentCode}/Status`, null, {
      params: { isActive },
    })
    if (!res.data.isSuccess) throw new Error(res.data.message)
  },

  async getMyClasses(): Promise<StudentClassResponse[]> {
    const res = await axiosClient.get<ApiResponse<StudentClassResponse[]>>(`${STUDENT_BASE}/me/classes`)
    if (!res.data.isSuccess) throw new Error(res.data.message)
    return res.data.data!
  },

  async registerClass(classId: string): Promise<EnrollmentResponse> {
    const res = await axiosClient.post<ApiResponse<EnrollmentResponse>>(`${STUDENT_BASE}/me/classes/${classId}/register`)
    if (!res.data.isSuccess) throw new Error(res.data.message)
    return res.data.data!
  },

  async dropClass(classId: string): Promise<void> {
    const res = await axiosClient.delete<ApiResponse<null>>(`${STUDENT_BASE}/me/classes/${classId}/drop`)
    if (!res.data.isSuccess) throw new Error(res.data.message)
  },

  async getAvailableClasses(): Promise<ClassResponse[]> {
    const res = await axiosClient.get<ApiResponse<ClassResponse[]>>(`${STUDENT_BASE}/classes/available`)
    if (!res.data.isSuccess) throw new Error(res.data.message)
    return res.data.data!
  },
}
