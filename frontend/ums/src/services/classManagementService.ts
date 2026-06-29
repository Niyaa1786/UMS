import axiosClient from '@/api/axiosClient'
import type { ApiResponse } from '@/types/staff'
import type { SubjectResponse, CreateSubjectRequest, UpdateSubjectRequest } from '@/types/subject'
import type { ClassResponse, CreateClassRequest, UpdateClassRequest } from '@/types/class'
import type { ClassScheduleResponse, CreateClassScheduleRequest, UpdateClassScheduleRequest } from '@/types/classSchedule'
import type { CreateEnrollmentRequest, EnrollmentResponse } from '@/types/enrollment'

const BASE = '/api/ClassManagement'

export const classManagementService = {
  // ─── Subject ───────────────────────────────────────────────────────────────
  async getAllSubjects(): Promise<SubjectResponse[]> {
    const res = await axiosClient.get<ApiResponse<SubjectResponse[]>>(`${BASE}/Subjects`)
    if (!res.data.isSuccess) throw new Error(res.data.message)
    return res.data.data!
  },

  async getSubject(id: string): Promise<SubjectResponse> {
    const res = await axiosClient.get<ApiResponse<SubjectResponse>>(`${BASE}/Subject/${id}`)
    if (!res.data.isSuccess) throw new Error(res.data.message)
    return res.data.data!
  },

  async createSubject(data: CreateSubjectRequest): Promise<SubjectResponse> {
    const res = await axiosClient.post<ApiResponse<SubjectResponse>>(`${BASE}/Subject`, data)
    if (!res.data.isSuccess) throw new Error(res.data.message)
    return res.data.data!
  },

  async updateSubject(id: string, data: UpdateSubjectRequest): Promise<SubjectResponse> {
    const res = await axiosClient.put<ApiResponse<SubjectResponse>>(`${BASE}/Subject/${id}`, data)
    if (!res.data.isSuccess) throw new Error(res.data.message)
    return res.data.data!
  },

  async deleteSubject(id: string): Promise<void> {
    const res = await axiosClient.delete<ApiResponse<null>>(`${BASE}/Subject/${id}`)
    if (!res.data.isSuccess) throw new Error(res.data.message)
  },

  // ─── Class ─────────────────────────────────────────────────────────────────
  async getAllClasses(): Promise<ClassResponse[]> {
    const res = await axiosClient.get<ApiResponse<ClassResponse[]>>(`${BASE}/Classes`)
    if (!res.data.isSuccess) throw new Error(res.data.message)
    return res.data.data!
  },

  async getClass(id: string): Promise<ClassResponse> {
    const res = await axiosClient.get<ApiResponse<ClassResponse>>(`${BASE}/Class/${id}`)
    if (!res.data.isSuccess) throw new Error(res.data.message)
    return res.data.data!
  },

  async getClassesByTeacher(teacherId: string): Promise<ClassResponse[]> {
    const res = await axiosClient.get<ApiResponse<ClassResponse[]>>(`${BASE}/Classes/Teacher/${teacherId}`)
    if (!res.data.isSuccess) throw new Error(res.data.message)
    return res.data.data!
  },

  async getClassesBySubject(subjectId: string): Promise<ClassResponse[]> {
    const res = await axiosClient.get<ApiResponse<ClassResponse[]>>(`${BASE}/Classes/Subject/${subjectId}`)
    if (!res.data.isSuccess) throw new Error(res.data.message)
    return res.data.data!
  },

  async createClass(data: CreateClassRequest): Promise<ClassResponse> {
    const res = await axiosClient.post<ApiResponse<ClassResponse>>(`${BASE}/Class`, data)
    if (!res.data.isSuccess) throw new Error(res.data.message)
    return res.data.data!
  },

  async updateClass(id: string, data: UpdateClassRequest): Promise<ClassResponse> {
    const res = await axiosClient.put<ApiResponse<ClassResponse>>(`${BASE}/Class/${id}`, data)
    if (!res.data.isSuccess) throw new Error(res.data.message)
    return res.data.data!
  },

  async deleteClass(id: string): Promise<void> {
    const res = await axiosClient.delete<ApiResponse<null>>(`${BASE}/Class/${id}`)
    if (!res.data.isSuccess) throw new Error(res.data.message)
  },

  async toggleClassStatus(id: string, isActive: boolean): Promise<void> {
    const res = await axiosClient.put<ApiResponse<null>>(`${BASE}/Class/${id}/Status`, null, {
      params: { isActive },
    })
    if (!res.data.isSuccess) throw new Error(res.data.message)
  },

  // ─── Schedule ──────────────────────────────────────────────────────────────
  async getSchedulesByClass(classId: string): Promise<ClassScheduleResponse[]> {
    const res = await axiosClient.get<ApiResponse<ClassScheduleResponse[]>>(`${BASE}/Schedules/Class/${classId}`)
    if (!res.data.isSuccess) throw new Error(res.data.message)
    return res.data.data!
  },

  async createSchedule(data: CreateClassScheduleRequest): Promise<ClassScheduleResponse> {
    const res = await axiosClient.post<ApiResponse<ClassScheduleResponse>>(`${BASE}/Schedule`, data)
    if (!res.data.isSuccess) throw new Error(res.data.message)
    return res.data.data!
  },

  async updateSchedule(scheduleId: string, data: UpdateClassScheduleRequest): Promise<ClassScheduleResponse> {
    const res = await axiosClient.put<ApiResponse<ClassScheduleResponse>>(`${BASE}/Schedule/${scheduleId}`, data)
    if (!res.data.isSuccess) throw new Error(res.data.message)
    return res.data.data!
  },

  async deleteSchedule(scheduleId: string): Promise<void> {
    const res = await axiosClient.delete<ApiResponse<null>>(`${BASE}/Schedule/${scheduleId}`)
    if (!res.data.isSuccess) throw new Error(res.data.message)
  },async createEnrollment(data: CreateEnrollmentRequest): Promise<EnrollmentResponse> {
    const res = await axiosClient.post<ApiResponse<EnrollmentResponse>>(`${BASE}/Enrollment`, data)
    if (!res.data.isSuccess) throw new Error(res.data.message)
    return res.data.data!
  },

  async deleteEnrollment(enrollmentId: string): Promise<void> {
    const res = await axiosClient.delete<ApiResponse<null>>(`${BASE}/Enrollment/${enrollmentId}`)
    if (!res.data.isSuccess) throw new Error(res.data.message)
  },

  async getEnrollmentsByClass(classId: string): Promise<EnrollmentResponse[]> {
    const res = await axiosClient.get<ApiResponse<EnrollmentResponse[]>>(
      `${BASE}/Classes/${classId}/Enrollments`
    )
    if (!res.data.isSuccess) throw new Error(res.data.message)
    return res.data.data!
  },

}