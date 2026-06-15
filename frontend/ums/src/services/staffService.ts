import axiosClient from '@/api/axiosClient'
import type { ApiResponse, CreateStaffRequest, UpdateStaffRequest, StaffResponse } from '@/types/staff'

const BASE = '/api/UserManagement'

export const staffService = {
  async getAllStaffs(): Promise<StaffResponse[]> {
    const res = await axiosClient.get<ApiResponse<StaffResponse[]>>(`${BASE}/Staffs`)
    if (!res.data.isSuccess) throw new Error(res.data.message)
    return res.data.data!
  },

  async getStaff(id: string): Promise<StaffResponse> {
    const res = await axiosClient.get<ApiResponse<StaffResponse>>(`${BASE}/Staff/${id}`)
    if (!res.data.isSuccess) throw new Error(res.data.message)
    return res.data.data!
  },

  async createStaff(request: CreateStaffRequest): Promise<StaffResponse> {
    const res = await axiosClient.post<ApiResponse<StaffResponse>>(`${BASE}/Staff`, request)
    if (!res.data.isSuccess) throw new Error(res.data.message)
    return res.data.data!
  },

  async updateStaff(id: string, request: UpdateStaffRequest): Promise<StaffResponse> {
    const res = await axiosClient.put<ApiResponse<StaffResponse>>(`${BASE}/Staff/${id}`, request)
    if (!res.data.isSuccess) throw new Error(res.data.message)
    return res.data.data!
  },

  async removeStaff(id: string): Promise<void> {
    const res = await axiosClient.delete<ApiResponse<null>>(`${BASE}/Staff/${id}`)
    if (!res.data.isSuccess) throw new Error(res.data.message)
  },

  async toggleStaffStatus(userCode: string, isActive: boolean): Promise<void> {
    const res = await axiosClient.post<ApiResponse<null>>(`${BASE}/Account/${userCode}/Status`, null, {
      params: { isActive },
    })
    if (!res.data.isSuccess) throw new Error(res.data.message)
  },
}
