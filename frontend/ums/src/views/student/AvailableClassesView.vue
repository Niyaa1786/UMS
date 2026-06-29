<!-- src/views/student/AvailableClassesView.vue -->
<template>
  <div class="space-y-5">
    <div>
      <h1 class="text-xl font-bold text-gray-900">Đăng ký lớp học</h1>
      <p class="text-sm text-gray-500 mt-0.5">Chọn lớp để đăng ký học phần</p>
    </div>

    <!-- Filters -->
    <div class="flex flex-wrap gap-3">
      <UInput
        v-model="searchQuery"
        icon="i-heroicons-magnifying-glass"
        placeholder="Tìm theo mã, tên môn..."
        class="w-64"
      />
      <USelect
        v-model="filterSemester"
        :items="semesterOptions"
        placeholder="Tất cả học kỳ"
        class="w-44"
      />
      <UButton
        v-if="searchQuery || filterSemester !== null"
        color="neutral"
        variant="ghost"
        icon="i-heroicons-x-mark"
        @click="clearFilters"
      >
        Xóa bộ lọc
      </UButton>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="flex justify-center py-12">
      <UIcon name="i-heroicons-arrow-path" class="w-6 h-6 animate-spin text-gray-400" />
    </div>

    <!-- Empty -->
    <div v-else-if="filteredAvailable.length === 0" class="text-center py-12 text-gray-400">
      <UIcon name="i-heroicons-academic-cap" class="w-10 h-10 mx-auto mb-2" />
      <p class="text-sm">Không có lớp nào đang mở đăng ký</p>
    </div>

    <!-- List -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <UCard v-for="cls in filteredAvailable" :key="cls.id" class="hover:shadow-md transition-shadow">
        <div class="space-y-2">
          <div class="flex items-start justify-between">
            <div>
              <span class="font-mono text-sm font-semibold text-red-600">{{ cls.code }}</span>
              <p class="font-medium text-gray-900">{{ cls.subjectName }}</p>
            </div>
            <UBadge :color="isRegistered(cls.id) ? 'success' : 'neutral'" variant="soft">
              {{ isRegistered(cls.id) ? 'Đã đăng ký' : 'Chưa đăng ký' }}
            </UBadge>
          </div>
          <p class="text-sm text-gray-600">Giảng viên: {{ cls.teacherName }}</p>
          <p class="text-xs text-gray-400">Học kỳ {{ cls.semester }} – {{ cls.schoolYear }}</p>
          <p class="text-xs text-gray-500">Sĩ số: {{ cls.maxStudents }} sinh viên</p>
          <div class="flex justify-end mt-2">
            <UButton
              color="error"
              size="sm"
              :disabled="isRegistered(cls.id)"
              :loading="isActionLoading"
              @click="handleRegister(cls.id)"
            >
              {{ isRegistered(cls.id) ? 'Đã đăng ký' : 'Đăng ký' }}
            </UButton>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useStudentEnrollment } from '@/composables/student/useStudentEnrollment'

const {
  isLoading,
  isActionLoading,
  searchQuery,
  filterSemester,
  filteredAvailable,
  isRegistered,
  registerForClass,
  init,
} = useStudentEnrollment()

const semesterOptions = [
  { label: 'Tất cả học kỳ', value: null },
  { label: 'Học kỳ 1', value: 1 },
  { label: 'Học kỳ 2', value: 2 },
  { label: 'Học kỳ 3', value: 3 },
]

function clearFilters() {
  searchQuery.value = ''
  filterSemester.value = null
}

async function handleRegister(classId: string) {
  await registerForClass(classId)
}

onMounted(init)
</script>