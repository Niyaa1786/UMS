// src/types/classSchedule.ts
export type DayOfWeek = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday'

export const DAY_OF_WEEK_LABELS: Record<DayOfWeek, string> = {
  Sunday: 'Chủ nhật',
  Monday: 'Thứ 2',
  Tuesday: 'Thứ 3',
  Wednesday: 'Thứ 4',
  Thursday: 'Thứ 5',
  Friday: 'Thứ 6',
  Saturday: 'Thứ 7',
}

export const DAY_OF_WEEK_OPTIONS = [
  { label: 'Thứ 2', value: 1 },
  { label: 'Thứ 3', value: 2 },
  { label: 'Thứ 4', value: 3 },
  { label: 'Thứ 5', value: 4 },
  { label: 'Thứ 6', value: 5 },
  { label: 'Thứ 7', value: 6 },
  { label: 'Chủ nhật', value: 0 },
]

export interface ClassScheduleResponse {
  id: string
  classId: string
  dayOfWeek: DayOfWeek
  startTime: string
  endTime: string
  room: string
}

export interface CreateClassScheduleRequest {
  classId: string
  dayOfWeek: DayOfWeek
  startTime: string
  endTime: string
  room: string
}

export interface UpdateClassScheduleRequest {
  dayOfWeek: DayOfWeek
  startTime: string
  endTime: string
  room: string
}

export type ClassStatus = 'Active' | 'Inactive'
