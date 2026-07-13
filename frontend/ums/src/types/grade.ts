// types/grade.ts

export enum GradeType {
  Attendance = 0,
  Midterm = 1,
  Final = 2,
  Assignment = 3,
}

export const GradeTypeLabel: Record<GradeType, string> = {
  [GradeType.Attendance]: 'Chuyên cần',
  [GradeType.Midterm]: 'Giữa kỳ',
  [GradeType.Final]: 'Cuối kỳ',
  [GradeType.Assignment]: 'Bài tập',
}

// Loại điểm được phép nhập tay (Attendance chỉ tự sinh qua Sync, không nhập tay)
export const manualGradeTypeOptions = [
  { label: GradeTypeLabel[GradeType.Assignment], value: GradeType.Assignment },
  { label: GradeTypeLabel[GradeType.Midterm], value: GradeType.Midterm },
  { label: GradeTypeLabel[GradeType.Final], value: GradeType.Final },
]

// ─── Response DTO ───
export interface GradeResponse {
  id: string
  enrollmentId: string
  studentId: string
  studentFullName: string
  gradeType: GradeType
  score: number
  maxScore: number
  weight: number
  gradedAt: string
  note?: string | null
}

export interface FinalGradeResponse {
  enrollmentId: string
  studentId: string
  studentFullName: string
  finalScore: number
  gradeLetter: string
}

// ─── Request DTO ───
export interface CreateGradeRequest {
  enrollmentId: string
  gradeType: GradeType
  score: number
  maxScore?: number
  weight?: number
  note?: string
}

export interface UpdateGradeRequest {
  score: number
  note?: string
}
