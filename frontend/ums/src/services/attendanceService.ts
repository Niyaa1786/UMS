// services/attendanceService.ts
import axiosClient from '@/api/axiosClient'
import type { ApiResponse } from '@/types/staff'
import type {
  AttendanceResponse,
  AttendanceSummaryResponse,
  CreateAttendanceRequest,
  UpdateAttendanceRequest,
} from '@/types/attendance'

const BASE = 'api/Attendance'

export const attendanceService = {
  // ─── Attendance ───
  async createAttendance(data: CreateAttendanceRequest) {
    const res = await axiosClient.post<ApiResponse<AttendanceResponse>>(BASE, data)
    if (!res.data.isSuccess) throw new Error(res.data.message)
    return res.data.data as AttendanceResponse
  },

  async updateAttendance(id: string, data: UpdateAttendanceRequest) {
    const res = await axiosClient.put<ApiResponse<AttendanceResponse>>(`${BASE}/${id}`, data)
    if (!res.data.isSuccess) throw new Error(res.data.message)
    return res.data.data as AttendanceResponse
  },

  async deleteAttendance(id: string) {
    const res = await axiosClient.delete<ApiResponse<null>>(`${BASE}/${id}`)
    if (!res.data.isSuccess) throw new Error(res.data.message)
  },

  /** Danh sách điểm danh của 1 lớp theo ngày */
  async getClassAttendanceByDate(classId: string, checkDate: string) {
    const res = await axiosClient.get<ApiResponse<AttendanceResponse[]>>(`${BASE}/Classes/${classId}`, {
      params: { checkDate },
    })
    if (!res.data.isSuccess) throw new Error(res.data.message)
    return res.data.data ?? []
  },

  /** Lịch sử điểm danh của 1 sinh viên trong 1 lớp (dùng cho Student hoặc xem chi tiết) */
  async getStudentAttendanceInClass(studentId: string, classId: string) {
    const res = await axiosClient.get<ApiResponse<AttendanceResponse[]>>(`${BASE}/Students/${studentId}/Classes/${classId}`)
    if (!res.data.isSuccess) throw new Error(res.data.message)
    return res.data.data ?? []
  },

  /** Thống kê điểm danh toàn lớp theo từng sinh viên */
  async getClassAttendanceSummary(classId: string) {
    const res = await axiosClient.get<ApiResponse<AttendanceSummaryResponse[]>>(`${BASE}/Classes/${classId}/Summary`)
    if (!res.data.isSuccess) throw new Error(res.data.message)
    return res.data.data ?? []
  },
}
