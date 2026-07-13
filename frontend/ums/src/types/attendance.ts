// types/attendance.ts

export enum AttendanceStatus {
  Present = 0,
  Absent = 1,
  Late = 2,
}

export const AttendanceStatusLabel: Record<AttendanceStatus, string> = {
  [AttendanceStatus.Present]: 'Có mặt',
  [AttendanceStatus.Absent]: 'Vắng mặt',
  [AttendanceStatus.Late]: 'Đi trễ',
}

export const AttendanceStatusColor: Record<AttendanceStatus, 'success' | 'error' | 'warning'> = {
  [AttendanceStatus.Present]: 'success',
  [AttendanceStatus.Absent]: 'error',
  [AttendanceStatus.Late]: 'warning',
}

export const attendanceStatusOptions = [
  { label: AttendanceStatusLabel[AttendanceStatus.Present], value: AttendanceStatus.Present },
  { label: AttendanceStatusLabel[AttendanceStatus.Absent], value: AttendanceStatus.Absent },
  { label: AttendanceStatusLabel[AttendanceStatus.Late], value: AttendanceStatus.Late },
]

// ─── Response DTO ───
export interface AttendanceResponse {
  id: string
  enrollmentId: string
  studentId: string
  studentFullName: string
  checkDate: string // yyyy-MM-dd
  status: AttendanceStatus
  remark?: string | null
}

export interface AttendanceSummaryResponse {
  enrollmentId: string
  studentId: string
  studentFullName: string
  total: number
  present: number
  absent: number
  late: number
  attendanceRate: number // 0..1
}

// ─── Request DTO ───
export interface CreateAttendanceRequest {
  enrollmentId: string
  checkDate: string
  status: AttendanceStatus
  remark?: string
}

export interface UpdateAttendanceRequest {
  status: AttendanceStatus
  remark?: string
}
