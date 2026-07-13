// services/gradeService.ts
import axiosClient from '@/api/axiosClient'
import type { ApiResponse } from '@/types/staff'
import type {
  GradeResponse,
  FinalGradeResponse,
  CreateGradeRequest,
  UpdateGradeRequest,
} from '@/types/grade'

const BASE = '/Grade'

export const gradeService = {
  // ─── Grade ───
  async createGrade(data: CreateGradeRequest) {
    const res = await axiosClient.post<ApiResponse<GradeResponse>>(BASE, data)
    if (!res.data.isSuccess) throw new Error(res.data.message)
    return res.data.data as GradeResponse
  },

  async updateGrade(id: string, data: UpdateGradeRequest) {
    const res = await axiosClient.put<ApiResponse<GradeResponse>>(`${BASE}/${id}`, data)
    if (!res.data.isSuccess) throw new Error(res.data.message)
    return res.data.data as GradeResponse
  },

  async deleteGrade(id: string) {
    const res = await axiosClient.delete<ApiResponse<null>>(`${BASE}/${id}`)
    if (!res.data.isSuccess) throw new Error(res.data.message)
  },

  /** Toàn bộ điểm của các sinh viên trong 1 lớp */
  async getClassGrades(classId: string) {
    const res = await axiosClient.get<ApiResponse<GradeResponse[]>>(`${BASE}/Classes/${classId}`)
    if (!res.data.isSuccess) throw new Error(res.data.message)
    return res.data.data ?? []
  },

  /** Toàn bộ điểm của 1 sinh viên (mọi lớp) — dùng cho trang bảng điểm cá nhân */
  async getStudentGrades(studentId: string) {
    const res = await axiosClient.get<ApiResponse<GradeResponse[]>>(`${BASE}/Students/${studentId}`)
    if (!res.data.isSuccess) throw new Error(res.data.message)
    return res.data.data ?? []
  },

  /** Điểm tổng kết + xếp loại chữ của cả lớp */
  async getClassFinalGrades(classId: string) {
    const res = await axiosClient.get<ApiResponse<FinalGradeResponse[]>>(
      `${BASE}/Classes/${classId}/Final`,
    )
    if (!res.data.isSuccess) throw new Error(res.data.message)
    return res.data.data ?? []
  },

  /** Đồng bộ điểm chuyên cần (GradeType.Attendance) từ dữ liệu điểm danh */
  async syncFromAttendance(enrollmentId: string) {
    const res = await axiosClient.post<ApiResponse<GradeResponse>>(
      `${BASE}/Enrollments/${enrollmentId}/SyncFromAttendance`,
    )
    if (!res.data.isSuccess) throw new Error(res.data.message)
    return res.data.data as GradeResponse
  },
}
