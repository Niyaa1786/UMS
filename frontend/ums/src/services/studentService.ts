// src/services/studentService.ts
import axiosClient from '@/api/axiosClient'
import type { ApiResponse } from '@/types/staff'
import type { CreateStudentRequest, UpdateStudentRequest, StudentResponse } from '@/types/student'

const BASE = '/api/UserManagement'

export const studentService = {
  async getAll(): Promise<StudentResponse[]> {
    const res = await axiosClient.get<ApiResponse<StudentResponse[]>>(`${BASE}/Students`)
    if (!res.data.isSuccess) throw new Error(res.data.message)
    return res.data.data!
  },

  async getById(id: string): Promise<StudentResponse> {
    const res = await axiosClient.get<ApiResponse<StudentResponse>>(`${BASE}/Student/${id}`)
    if (!res.data.isSuccess) throw new Error(res.data.message)
    return res.data.data!
  },

  async create(request: CreateStudentRequest): Promise<StudentResponse> {
    const res = await axiosClient.post<ApiResponse<StudentResponse>>(`${BASE}/Student`, request)
    if (!res.data.isSuccess) throw new Error(res.data.message)
    return res.data.data!
  },

  async update(id: string, request: UpdateStudentRequest): Promise<StudentResponse> {
    const res = await axiosClient.put<ApiResponse<StudentResponse>>(`${BASE}/Student/${id}`, request)
    if (!res.data.isSuccess) throw new Error(res.data.message)
    return res.data.data!
  },

  async remove(id: string): Promise<void> {
    const res = await axiosClient.delete<ApiResponse<null>>(`${BASE}/Student/${id}`)
    if (!res.data.isSuccess) throw new Error(res.data.message)
  },

  async toggleStatus(studentCode: string, isActive: boolean): Promise<void> {
    const res = await axiosClient.post<ApiResponse<null>>(`${BASE}/Account/${studentCode}/Status`, null, {
      params: { isActive },
    })
    if (!res.data.isSuccess) throw new Error(res.data.message)
  },
}
