<template>
  <div class="max-w-6xl mx-auto space-y-4">
    <!-- Header + Điều hướng tháng -->
    <div class="flex items-center justify-between flex-wrap gap-2">
      <div>
        <h1 class="text-xl font-bold text-gray-900">Thời khóa biểu</h1>
        <p class="text-sm text-gray-500 mt-0.5">
          {{ myClasses.length }} lớp đã đăng ký · {{ allSchedules.length }} buổi / tuần
        </p>
      </div>
      <div class="flex items-center gap-1">
        <UButton icon="i-heroicons-chevron-left" color="neutral" variant="outline" size="sm" @click="prevMonth" />
        <span class="text-sm font-medium text-gray-700 w-36 text-center">{{ monthLabel }}</span>
        <UButton icon="i-heroicons-chevron-right" color="neutral" variant="outline" size="sm" @click="nextMonth" />
        <UButton color="neutral" variant="ghost" size="sm" @click="todayMonth">Hôm nay</UButton>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="flex justify-center py-12">
      <UIcon name="i-heroicons-arrow-path" class="w-6 h-6 animate-spin text-gray-400" />
    </div>

    <!-- Không có lớp nào -->
    <div v-else-if="myClasses.length === 0" class="text-center py-16 text-gray-400">
      <UIcon name="i-heroicons-calendar-days" class="w-12 h-12 mx-auto mb-3 opacity-60" />
      <p class="text-sm">Bạn chưa đăng ký lớp học nào</p>
    </div>

    <!-- Lịch tháng -->
    <template v-else>
      <!-- Chú thích lớp học -->
      <div class="flex flex-wrap gap-2">
        <div
          v-for="cls in myClasses"
          :key="cls.classId"
          class="flex items-center gap-1.5 text-xs text-gray-600 bg-blue-50 border border-blue-100 rounded-full px-2.5 py-1"
        >
          <span class="w-2 h-2 rounded-full bg-blue-400 shrink-0"></span>
          <span class="font-mono font-semibold text-blue-700">{{ cls.classCode }}</span>
          <span class="text-gray-500">{{ cls.subjectName }}</span>
          <UBadge v-if="cls.schedules.length === 0" color="warning" variant="soft" size="xs">Chưa có lịch</UBadge>
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

      <!-- Trạng thái tháng rỗng (có lớp nhưng không có lịch) -->
      <div v-if="allSchedules.length === 0" class="text-center py-10 text-gray-400">
        <UIcon name="i-heroicons-calendar-x-mark" class="w-10 h-10 mx-auto mb-2 opacity-60" />
        <p class="text-sm">Các lớp đã đăng ký chưa được xếp lịch</p>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useStudentSchedule } from '@/composables/student/useStudentSchedule'
import { DAY_OF_WEEK_LABELS } from '@/types/classSchedule'
import type { DayOfWeek } from '@/types/classSchedule'

const {
  isLoading,
  myClasses,
  allSchedules,
  selectedMonth,
  monthDays,
  fetchMyClasses,
  prevMonth,
  nextMonth,
  todayMonth,
  isToday,
} = useStudentSchedule()

const dayLabels = computed(() => {
  const order: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  return order.map((d) => DAY_OF_WEEK_LABELS[d])
})

const monthLabel = computed(() => selectedMonth.value.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' }))

onMounted(fetchMyClasses)
</script>
