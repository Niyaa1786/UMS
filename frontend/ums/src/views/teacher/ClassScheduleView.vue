<template>
  <div class="space-y-5">
    <!-- ── Page Header ────────────────────────────────────────────────────── -->
    <div>
      <h1 class="text-xl font-bold text-gray-900">Thời khóa biểu</h1>
      <p class="text-sm text-gray-500 mt-0.5">Lịch dạy của bạn trong tuần</p>
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
      <UBadge v-if="selectedClassId && scheduleList.length" color="success" variant="soft">
        {{ scheduleList.length }} buổi học / tuần
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

    <!-- ── Schedule Weekly Grid ───────────────────────────────────────────── -->
    <div v-else class="space-y-3">
      <div
        v-for="day in scheduledDays"
        :key="day"
        class="flex gap-4 items-start"
      >
        <!-- Day label -->
        <div class="w-20 shrink-0 text-right">
          <span class="text-sm font-semibold text-gray-700">
            {{ DAY_OF_WEEK_LABELS[day as DayOfWeek] }}
          </span>
        </div>

        <!-- Sessions -->
        <div class="flex-1 flex flex-col gap-2">
          <UCard
            v-for="s in getSessionsByDay(day)"
            :key="s.id"
            class="border-l-4 border-red-500 bg-red-50/40"
            :ui="{ body: 'py-2 px-3' }"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <UIcon name="i-heroicons-clock" class="w-4 h-4 text-red-500" />
                <span class="font-mono text-sm font-medium text-gray-800">
                  {{ s.startTime.substring(0, 5) }} – {{ s.endTime.substring(0, 5) }}
                </span>
              </div>
              <div class="flex items-center gap-1.5 text-sm text-gray-600">
                <UIcon name="i-heroicons-building-office-2" class="w-4 h-4 text-gray-400" />
                <span>{{ s.room }}</span>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { classManagementService } from '@/services/classManagementService'
import { useClassScheduleManagement } from '@/composables/classManagement/useClasssSheduleManagement'
import { useAuthStore } from '@/stores/useAuthStore'
import { DAY_OF_WEEK_LABELS } from '@/types/classSchedule'
import type { DayOfWeek, ClassScheduleResponse } from '@/types/classSchedule'
import type { ClassResponse } from '@/types/class'

const authStore = useAuthStore()

const teacherClasses = ref<ClassResponse[]>([])
const selectedClassId = ref<string | undefined>(undefined)

const { scheduleList, isLoading, fetchByClass } = useClassScheduleManagement()

// ── Derived ───────────────────────────────────────────────────────────────
const classOptions = computed(() =>
  teacherClasses.value.map((c) => ({
    label: `${c.code} — ${c.subjectName}`,
    value: c.id,
  })),
)

const scheduledDays = computed(() => {
  const days = [...new Set(scheduleList.value.map((s) => s.dayOfWeek))]
  return days.sort((a, b) => a - b)
})

function getSessionsByDay(day: number): ClassScheduleResponse[] {
  return scheduleList.value
    .filter((s) => s.dayOfWeek === day)
    .sort((a, b) => a.startTime.localeCompare(b.startTime))
}

async function onClassChange() {
  if (selectedClassId.value) {
    await fetchByClass(selectedClassId.value)
  }
}

// ── Lifecycle ──────────────────────────────────────────────────────────────
onMounted(async () => {
  const teacherId = authStore.user?.id
  if (!teacherId) return
  try {
    teacherClasses.value = await classManagementService.getClassesByTeacher(teacherId)
    const firstClass = teacherClasses.value[0]
    if (firstClass?.id) {
      selectedClassId.value = firstClass.id
      await fetchByClass(selectedClassId.value)
    }
  } catch {
  }
})
</script>