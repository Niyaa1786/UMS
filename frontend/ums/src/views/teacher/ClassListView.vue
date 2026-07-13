<!-- src/views/teacher/ClassListView.vue -->
<template>
  <div class="space-y-5">
    <div>
      <h1 class="text-xl font-bold text-gray-900">Lớp học của tôi</h1>
      <p class="text-sm text-gray-500 mt-0.5">
        Tổng cộng <span class="font-semibold text-gray-700">{{ classes.length }}</span> lớp đang giảng dạy
      </p>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="flex justify-center py-12">
      <UIcon name="i-heroicons-arrow-path" class="w-6 h-6 animate-spin text-gray-400" />
    </div>

    <!-- Empty -->
    <div v-else-if="classes.length === 0" class="text-center py-12 text-gray-400">
      <UIcon name="i-heroicons-academic-cap" class="w-10 h-10 mx-auto mb-2" />
      <p class="text-sm">Bạn chưa được phân công lớp nào</p>
    </div>

    <!-- List -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <UCard v-for="cls in classes" :key="cls.id" class="hover:shadow-md transition-shadow">
        <div class="space-y-3">
          <div>
            <div class="flex items-center gap-2 flex-wrap">
              <span class="font-mono text-sm font-semibold text-red-600">{{ cls.code }}</span>
              <UBadge :color="cls.status === 'Active' ? 'success' : 'neutral'" variant="subtle" size="xs">
                {{ cls.status === 'Active' ? 'Đang hoạt động' : 'Vô hiệu hóa' }}
              </UBadge>
            </div>
            <p class="text-sm font-medium text-gray-900 mt-1">{{ cls.subjectName }}</p>
            <p class="text-xs text-gray-400">Học kỳ {{ cls.semester }} – {{ cls.schoolYear }}</p>
          </div>

          <div class="flex gap-2 pt-2 border-t border-gray-100">
            <UButton
              size="sm"
              color="warning"
              variant="soft"
              icon="i-heroicons-chart-bar"
              class="flex-1"
              @click="goToGrades(cls)"
            >
              Bảng điểm
            </UButton>
            <UButton
              size="sm"
              color="warning"
              variant="soft"
              icon="i-heroicons-clipboard-document-check"
              class="flex-1"
              @click="goToAttendance(cls)"
            >
              Điểm danh
            </UButton>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { classManagementService } from '@/services/classManagementService'
import { useAuthStore } from '@/stores/useAuthStore'
import type { ClassResponse } from '@/types/class'
import { getErrorMessage } from '@/utils/getErrorMessage'

const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

const classes = ref<ClassResponse[]>([])
const isLoading = ref(false)

function goToGrades(cls: ClassResponse) {
  router.push({ name: 'TeacherClassGrades', params: { classId: cls.id }, query: { classCode: cls.code } })
}

function goToAttendance(cls: ClassResponse) {
  router.push({ name: 'TeacherClassAttendance', params: { classId: cls.id }, query: { classCode: cls.code } })
}

onMounted(async () => {
  const teacherId = authStore.user?.id
  if (!teacherId) return
  isLoading.value = true
  try {
    classes.value = await classManagementService.getClassesByTeacher(teacherId)
  } catch (err) {
    toast.add({ title: 'Lỗi tải danh sách lớp', description: getErrorMessage(err), color: 'error' })
  } finally {
    isLoading.value = false
  }
})
</script>
