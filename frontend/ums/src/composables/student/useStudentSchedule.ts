// src/composables/student/useStudentSchedule.ts
import { ref, computed } from 'vue'
import { studentService } from '@/services/studentService'
import type { StudentClassResponse } from '@/types/enrollment'
import type { ClassScheduleResponse } from '@/types/classSchedule'
import { getErrorMessage } from '@/utils/getErrorMessage'
import type { DayOfWeek } from '@/types/classSchedule'

// So sánh ngày dạng số YYYYMMDD — tránh lệch timezone khi dùng new Date(string)
function dateToInt(date: Date): number {
  return date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate()
}

function dateStrToInt(dateStr: string): number {
  const [y = 0, m = 0, d = 0] = dateStr.substring(0, 10).split('-').map(Number)
  return y * 10000 + m * 100 + d
}

function inRange(date: Date, startStr: string, endStr: string): boolean {
  const val = dateToInt(date)
  return val >= dateStrToInt(startStr) && val <= dateStrToInt(endStr)
}

export function useStudentSchedule() {
  const toast = useToast()
  const isLoading = ref(false)

  const myClasses = ref<StudentClassResponse[]>([])

  // classId → { startDate, endDate } — lấy từ getAvailableClasses (= getAllClasses admin)
  const classDateMap = ref<Record<string, { startDate: string; endDate: string }>>({})

  // ── Tháng ────────────────────────────────────────────────────────────────
  const selectedMonth = ref(new Date())

  const monthStart = computed(() => {
    const d = new Date(selectedMonth.value.getFullYear(), selectedMonth.value.getMonth(), 1)
    d.setHours(0, 0, 0, 0)
    return d
  })

  // ── Tuần ─────────────────────────────────────────────────────────────────
  const selectedWeek = ref(new Date())

  const weekStart = computed(() => {
    const date = new Date(selectedWeek.value)
    const day = date.getDay()
    const diff = day === 0 ? 6 : day - 1
    date.setDate(date.getDate() - diff)
    date.setHours(0, 0, 0, 0)
    return date
  })

  const weekEnd = computed(() => {
    const date = new Date(weekStart.value)
    date.setDate(date.getDate() + 6)
    date.setHours(23, 59, 59, 999)
    return date
  })

  const weekDays = computed(() => {
    const days: { dayOfWeek: DayOfWeek; date: Date; dateString: string }[] = []
    const start = new Date(weekStart.value)
    const dayMap: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    for (let i = 0; i < 7; i++) {
      const d = new Date(start)
      d.setDate(d.getDate() + i)
      days.push({
        dayOfWeek: dayMap[i] as DayOfWeek,
        date: d,
        dateString: d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      })
    }
    return days
  })

  // ── Flatten tất cả schedule, gắn startDate/endDate vào mỗi item ──────────
  const allSchedules = computed(() => {
    const list: (ClassScheduleResponse & {
      className: string
      subjectName: string
      teacherName: string
      semester: number
      schoolYear: string
      startDate: string
      endDate: string
    })[] = []

    myClasses.value.forEach((cls) => {
      const dates = classDateMap.value[cls.classId]
      if (!dates) return // chưa có ngày → bỏ qua

      cls.schedules.forEach((sched) => {
        list.push({
          ...sched,
          startTime: sched.startTime?.substring(0, 5) ?? '--:--',
          endTime: sched.endTime?.substring(0, 5) ?? '--:--',
          className: cls.classCode,
          subjectName: cls.subjectName,
          teacherName: cls.teacherName,
          semester: cls.semester,
          schoolYear: cls.schoolYear,
          startDate: dates.startDate,
          endDate: dates.endDate,
        })
      })
    })

    return list
  })

  // ── Lấy schedule thực sự diễn ra vào ngày date ───────────────────────────
  // Đúng thứ trong tuần VÀ ngày nằm trong [startDate, endDate] của lớp
  function getSchedulesForDate(date: Date) {
    const dayName = date.toLocaleString('en-US', { weekday: 'long' }) as DayOfWeek
    return allSchedules.value.filter((sched) => sched.dayOfWeek === dayName && inRange(date, sched.startDate, sched.endDate))
  }

  // ── 42 ô lịch tháng (T2 → CN) ────────────────────────────────────────────
  const monthDays = computed(() => {
    const start = monthStart.value
    const firstDayOfWeek = start.getDay() // 0 = CN
    const offset = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1
    const gridStart = new Date(start)
    gridStart.setDate(start.getDate() - offset)

    return Array.from({ length: 42 }, (_, i) => {
      const d = new Date(gridStart)
      d.setDate(gridStart.getDate() + i)
      return {
        date: d,
        isCurrentMonth: d.getMonth() === start.getMonth() && d.getFullYear() === start.getFullYear(),
        schedules: getSchedulesForDate(d),
      }
    })
  })

  // ── Helpers ───────────────────────────────────────────────────────────────
  function isToday(date: Date): boolean {
    const now = new Date()
    return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() === now.getDate()
  }

  // ── Điều hướng tháng ──────────────────────────────────────────────────────
  function prevMonth() {
    const d = new Date(selectedMonth.value)
    d.setMonth(d.getMonth() - 1)
    selectedMonth.value = d
  }
  function nextMonth() {
    const d = new Date(selectedMonth.value)
    d.setMonth(d.getMonth() + 1)
    selectedMonth.value = d
  }
  function todayMonth() {
    selectedMonth.value = new Date()
  }

  // ── Điều hướng tuần ───────────────────────────────────────────────────────
  function prevWeek() {
    const d = new Date(selectedWeek.value)
    d.setDate(d.getDate() - 7)
    selectedWeek.value = d
  }
  function nextWeek() {
    const d = new Date(selectedWeek.value)
    d.setDate(d.getDate() + 7)
    selectedWeek.value = d
  }
  function today() {
    selectedWeek.value = new Date()
  }

  // ── Fetch ─────────────────────────────────────────────────────────────────
  async function fetchMyClasses() {
    isLoading.value = true
    try {
      // Gọi song song: lớp đã đăng ký (có schedules) + tất cả lớp (có startDate/endDate)
      const [enrolled, allClasses] = await Promise.all([
        studentService.getMyClasses(),
        studentService.getAvailableClasses(), // = getAllClasses phía admin
      ])

      myClasses.value = enrolled

      // Build map classId → { startDate, endDate } từ danh sách tất cả lớp
      const map: Record<string, { startDate: string; endDate: string }> = {}
      allClasses.forEach((cls) => {
        map[cls.id] = {
          startDate: cls.startDate.substring(0, 10),
          endDate: cls.endDate.substring(0, 10),
        }
      })
      classDateMap.value = map
    } catch (err) {
      toast.add({
        title: 'Lỗi tải thời khóa biểu',
        description: getErrorMessage(err),
        color: 'error',
      })
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    myClasses,
    allSchedules,
    classDateMap,
    selectedWeek,
    selectedMonth,
    weekStart,
    weekEnd,
    weekDays,
    monthDays,
    prevWeek,
    nextWeek,
    today,
    prevMonth,
    nextMonth,
    todayMonth,
    isToday,
    fetchMyClasses,
  }
}
