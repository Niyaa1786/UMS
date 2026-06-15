import axiosClient from '@/api/axiosClient'
import type { ApiResponse } from '@/types/staff'
import type { CreateTeacherRequest, UpdateTeacherRequest, TeacherResponse } from '@/types/teacher'

const BASE = '/api/UserManagement'

export const teacherService = {
  async getAllTeachers(): Promise<TeacherResponse[]> {
    const res = await axiosClient.get<ApiResponse<TeacherResponse[]>>(`${BASE}/Teachers`)
    if (!res.data.isSuccess) throw new Error(res.data.message)
    return res.data.data!
  },

  async getTeacher(id: string): Promise<TeacherResponse> {
    const res = await axiosClient.get<ApiResponse<TeacherResponse>>(`${BASE}/Teacher/${id}`)
    if (!res.data.isSuccess) throw new Error(res.data.message)
    return res.data.data!
  },

  async createTeacher(request: CreateTeacherRequest): Promise<TeacherResponse> {
    const res = await axiosClient.post<ApiResponse<TeacherResponse>>(`${BASE}/Teacher`, request)
    if (!res.data.isSuccess) throw new Error(res.data.message)
    return res.data.data!
  },

  async updateTeacher(id: string, request: UpdateTeacherRequest): Promise<TeacherResponse> {
    const res = await axiosClient.put<ApiResponse<TeacherResponse>>(`${BASE}/Teacher/${id}`, request)
    if (!res.data.isSuccess) throw new Error(res.data.message)
    return res.data.data!
  },

  async removeTeacher(id: string): Promise<void> {
    const res = await axiosClient.delete<ApiResponse<null>>(`${BASE}/Teacher/${id}`)
    if (!res.data.isSuccess) throw new Error(res.data.message)
  },

  async toggleTeacherStatus(teacherCode: string, isActive: boolean): Promise<void> {
    const res = await axiosClient.post<ApiResponse<null>>(`${BASE}/Account/${teacherCode}/Status`, null, {
      params: { isActive },
    })
    if (!res.data.isSuccess) throw new Error(res.data.message)
  },
}
