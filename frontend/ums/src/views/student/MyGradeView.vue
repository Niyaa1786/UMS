<!-- src/views/student/MyGradeView.vue -->
<template>
  <div class="space-y-5">
    <div>
      <h1 class="text-xl font-bold text-gray-900">Điểm số của tôi</h1>
      <p class="text-sm text-gray-500 mt-0.5">Xem điểm chi tiết theo từng lớp đã học</p>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="flex justify-center py-12">
      <UIcon name="i-heroicons-arrow-path" class="w-6 h-6 animate-spin text-gray-400" />
    </div>

    <!-- Empty -->
    <div v-else-if="groups.length === 0" class="text-center py-12 text-gray-400">
      <UIcon name="i-heroicons-chart-bar" class="w-10 h-10 mx-auto mb-2" />
      <p class="text-sm">Chưa có điểm nào được ghi nhận</p>
    </div>

    <!-- Groups -->
    <div v-else class="space-y-4">
      <UCard v-for="group in groups" :key="group.enrollmentId">
        <template #header>
          <div class="flex items-center justify-between">
            <p class="text-sm font-semibold text-gray-900">
              {{ classCode(group) }}
            </p>
            <div v-if="group.weightedAverage !== null" class="flex items-center gap-2">
              <span class="text-xs text-gray-500">Điểm trung bình:</span>
              <UBadge color="error" variant="soft">{{ group.weightedAverage.toFixed(2) }}</UBadge>
            </div>
          </div>
        </template>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div v-for="g in group.grades" :key="g.id" class="rounded-lg border border-gray-100 p-3 flex flex-col gap-1">
            <span class="text-xs text-gray-500">{{ GradeTypeLabel[g.gradeType] }}</span>
            <span class="text-lg font-semibold text-gray-900">{{ g.score }}/{{ g.maxScore }}</span>
            <span class="text-xs text-gray-400">Trọng số: {{ g.weight }}</span>
            <span v-if="g.note" class="text-xs text-gray-500 italic">{{ g.note }}</span>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useMyGrade, type MyClassGradeGroup } from '@/composables/student/useMyGrade'

const { isLoading, groups, myClasses, GradeTypeLabel, fetchAll } = useMyGrade()

function classCode(group: MyClassGradeGroup): string {
  const idx = groups.value.indexOf(group)
  const cls = myClasses.value[idx]
  return cls ? `${cls.classCode} — ${cls.subjectName}` : `Lớp (${group.enrollmentId.slice(0, 8)})`
}

onMounted(fetchAll)
</script>
