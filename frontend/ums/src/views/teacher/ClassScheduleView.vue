<template>
  <div class="space-y-5">
    <!-- ── Page Header ────────────────────────────────────────────────────── -->
    <div>
      <h1 class="text-xl font-bold text-gray-900">Thời khóa biểu</h1>
      <p class="text-sm text-gray-500 mt-0.5">Lịch dạy theo tháng</p>
    </div>

    <!-- ── Class Filter ───────────────────────────────────────────────────── -->
    <div class="flex flex-wrap gap-3 items-center">
      <USelect
        v-model="selectedClassId"
        :items="classOptions"
        placeholder="Chọn lớp để xem lịch..."
        class="w-72"
        @change="onClassChange"
      />
      <UBadge v-if="selectedClassId && totalSessionsInMonth" color="success" variant="soft">
        {{ totalSessionsInMonth }} buổi học trong tháng
      </UBadge>
    </div>

    <!-- ── Loading ────────────────────────────────────────────────────────── -->
    <div v-if="isLoading" class="flex justify-center py-12">
      <UIcon name="i-heroicons-arrow-path" class="w-6 h-6 animate-spin text-gray-400" />
    </div>

    <!-- ── Empty states ───────────────────────────────────────────────────── -->
    <div v-else-if="!selectedClassId" class="text-center py-16 text-gray-400">
      <UIcon name="i-heroicons-calendar-days" class="w-12 h-12 mx-auto mb-3" />
      <p class="text-sm">Vui lòng chọn lớp để xem thời khóa biểu</p>
    </div>

    <div v-else-if="scheduleList.length === 0" class="text-center py-12 text-gray-400">
      <UIcon name="i-heroicons-calendar-x-mark" class="w-10 h-10 mx-auto mb-2" />
      <p class="text-sm">Lớp này chưa có lịch học</p>
    </div>

    <!-- ── Calendar ───────────────────────────────────────────────────────── -->
    <template v-else>
      <!-- Navigation tháng -->
      <div class="flex items-center justify-between flex-wrap gap-2">
        <div class="flex items-center gap-1">
          <UButton icon="i-heroicons-chevron-left" color="neutral" variant="outline" size="sm" @click="prevMonth" />
          <span class="text-sm font-medium text-gray-700 w-36 text-center">{{ monthLabel }}</span>
          <UButton icon="i-heroicons-chevron-right" color="neutral" variant="outline" size="sm" @click="nextMonth" />
          <UButton color="neutral" variant="ghost" size="sm" @click="todayMonth">Hôm nay</UButton>
        </div>
      </div>

      <!-- Lưới lịch tháng -->
      <div class="bg-white rounded-xl border border-gray-200/80 overflow-hidden">
        <!-- Hàng tiêu đề T2 → CN -->
        <div class="grid grid-cols-7 bg-gray-50/70 border-b border-gray-200">
          <div
            v-for="day in dayLabels"
            :key="day"
            class="py-2 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider"
          >
            {{ day }}
          </div>
        </div>

        <!-- Các ô ngày -->
        <div class="grid grid-cols-7 auto-rows-fr">
          <div
            v-for="(day, idx) in monthDays"
            :key="idx"
            class="min-h-25 p-1.5 border-r border-b border-gray-100/80 transition-colors"
            :class="{
              'bg-gray-50/40': !day.isCurrentMonth,
              'bg-red-50/30': isToday(day.date),
              'border-r-0': (idx + 1) % 7 === 0,
              'border-b-0': idx >= 35,
            }"
          >
            <!-- Số ngày -->
            <div class="flex justify-end">
              <span
                class="text-xs font-medium inline-flex items-center justify-center w-6 h-6 rounded-full"
                :class="isToday(day.date) ? 'bg-red-500 text-white' : day.isCurrentMonth ? 'text-gray-700' : 'text-gray-300'"
              >
                {{ day.date.getDate() }}
              </span>
            </div>

            <!-- Danh sách buổi học trong ngày -->
            <div class="mt-0.5 space-y-0.5">
              <div
                v-for="sched in day.schedules"
                :key="sched.id"
                class="text-[11px] leading-tight bg-blue-50/90 border-l-2 border-blue-400 rounded px-1.5 py-0.5"
              >
                <div class="font-semibold text-blue-800 truncate">{{ sched.subjectName }}</div>
                <div class="flex justify-between text-[10px] text-gray-500">
                  <span class="font-mono">{{ sched.className }}</span>
                  <span class="font-mono">{{ sched.startTime }}–{{ sched.endTime }}</span>
                </div>
                <div class="text-[10px] text-gray-400 truncate">{{ sched.room }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { classManagementService } from '@/services/classManagementService'
import { useClassScheduleManagement } from '@/composables/classManagement/useClasssSheduleManagement'
import { useAuthStore } from '@/stores/useAuthStore'
import { DAY_OF_WEEK_LABELS } from '@/types/classSchedule'
import type { DayOfWeek } from '@/types/classSchedule'
import type { ClassResponse } from '@/types/class'
import { getErrorMessage } from '@/utils/getErrorMessage'

const authStore = useAuthStore()
const toast = useToast()

const teacherClasses = ref<ClassResponse[]>([])
const selectedClassId = ref<string | undefined>(undefined)

const { scheduleList, isLoading, fetchByClass } = useClassScheduleManagement()

// ── Computed ───────────────────────────────────────────────────────────────
const classOptions = computed(() =>
  teacherClasses.value.map((c) => ({
    label: `${c.code} — ${c.subjectName}`,
    value: c.id,
  })),
)

// Map classId -> thông tin lớp (startDate, endDate, subjectName, code)
const classInfoMap = computed(() => {
  const map: Record<string, { startDate: string; endDate: string; subjectName: string; code: string }> = {}
  teacherClasses.value.forEach((c) => {
    map[c.id] = {
      startDate: c.startDate.substring(0, 10),
      endDate: c.endDate.substring(0, 10),
      subjectName: c.subjectName,
      code: c.code,
    }
  })
  return map
})

// ── Tháng ────────────────────────────────────────────────────────────────
const selectedMonth = ref(new Date())

const monthStart = computed(() => {
  const d = new Date(selectedMonth.value.getFullYear(), selectedMonth.value.getMonth(), 1)
  d.setHours(0, 0, 0, 0)
  return d
})

const monthLabel = computed(() => selectedMonth.value.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' }))

// So sánh ngày dạng số YYYYMMDD
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

// ── Lấy schedules cho một ngày cụ thể ──────────────────────────────────
function getSchedulesForDate(date: Date) {
  if (!selectedClassId.value) return []
  const info = classInfoMap.value[selectedClassId.value]
  if (!info) return []

  const dayName = date.toLocaleString('en-US', { weekday: 'long' }) as DayOfWeek
  return scheduleList.value
    .filter((sched) => sched.dayOfWeek === dayName && inRange(date, info.startDate, info.endDate))
    .map((sched) => ({
      ...sched,
      startTime: sched.startTime.substring(0, 5),
      endTime: sched.endTime.substring(0, 5),
      className: info.code,
      subjectName: info.subjectName,
    }))
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

// Tổng số buổi học trong tháng hiện tại
const totalSessionsInMonth = computed(() => {
  return monthDays.value.reduce((acc, day) => acc + day.schedules.length, 0)
})

// ── Helpers ───────────────────────────────────────────────────────────────
function isToday(date: Date): boolean {
  const now = new Date()
  return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() === now.getDate()
}

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

// ── Điều hướng ─────────────────────────────────────────────────────────────
async function onClassChange() {
  if (selectedClassId.value) {
    await fetchByClass(selectedClassId.value)
  }
}

// ── Lifecycle ──────────────────────────────────────────────────────────────
onMounted(async () => {
  const teacherId = authStore.user?.id
  if (!teacherId) {
    toast.add({ title: 'Lỗi', description: 'Không tìm thấy thông tin giảng viên.', color: 'error' })
    return
  }
  try {
    teacherClasses.value = await classManagementService.getClassesByTeacher(teacherId)
    const firstClass = teacherClasses.value[0]
    if (firstClass?.id) {
      selectedClassId.value = firstClass.id
      await fetchByClass(selectedClassId.value)
    }
  } catch (err) {
    toast.add({ title: 'Lỗi tải danh sách lớp', description: getErrorMessage(err), color: 'error' })
  }
})

// ── Day labels ─────────────────────────────────────────────────────────────
const dayLabels = computed(() => {
  const order: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  return order.map((d) => DAY_OF_WEEK_LABELS[d])
})
</script>
