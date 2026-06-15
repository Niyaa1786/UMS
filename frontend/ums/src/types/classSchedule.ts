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

export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6

export const DAY_OF_WEEK_LABELS: Record<DayOfWeek, string> = {
  0: 'Chủ nhật',
  1: 'Thứ 2',
  2: 'Thứ 3',
  3: 'Thứ 4',
  4: 'Thứ 5',
  5: 'Thứ 6',
  6: 'Thứ 7',
}

export const DAY_OF_WEEK_OPTIONS = (Object.entries(DAY_OF_WEEK_LABELS) as [string, string][]).map(
  ([val, label]) => ({ label, value: Number(val) as DayOfWeek })
)