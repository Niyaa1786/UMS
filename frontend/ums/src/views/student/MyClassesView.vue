<!-- src/views/student/MyClassesView.vue -->
<template>
  <div class="space-y-5">
    <div>
      <h1 class="text-xl font-bold text-gray-900">Lớp học của tôi</h1>
      <p class="text-sm text-gray-500 mt-0.5">Danh sách các lớp bạn đã đăng ký</p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <UCard>
        <div class="text-center">
          <p class="text-2xl font-bold text-red-600">{{ myClasses.length }}</p>
          <p class="text-xs text-gray-500 mt-1">Tổng số lớp</p>
        </div>
      </UCard>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="flex justify-center py-12">
      <UIcon name="i-heroicons-arrow-path" class="w-6 h-6 animate-spin text-gray-400" />
    </div>

    <!-- Empty -->
    <div v-else-if="myClasses.length === 0" class="text-center py-12 text-gray-400">
      <UIcon name="i-heroicons-academic-cap" class="w-10 h-10 mx-auto mb-2" />
      <p class="text-sm">Bạn chưa đăng ký lớp nào</p>
      <UButton color="error" variant="ghost" class="mt-2" @click="router.push('/student/available-classes')">
        Tìm lớp để đăng ký
      </UButton>
    </div>

    <!-- List -->
    <div v-else class="space-y-4">
      <UCard v-for="cls in myClasses" :key="cls.classId" class="hover:shadow-sm transition-shadow">
        <div class="flex flex-col sm:flex-row sm:items-center gap-3">
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="font-mono text-sm font-semibold text-red-600">{{ cls.classCode }}</span>
              <span class="text-sm font-medium text-gray-900">{{ cls.subjectName }}</span>
            </div>
            <p class="text-sm text-gray-600">Giảng viên: {{ cls.teacherName }}</p>
            <p class="text-xs text-gray-400">Học kỳ {{ cls.semester }} – {{ cls.schoolYear }}</p>
            <div class="mt-1 flex flex-wrap gap-1">
              <UBadge v-for="sched in cls.schedules" :key="sched.id" color="info" variant="soft" size="xs">
                {{ DAY_OF_WEEK_LABELS[sched.dayOfWeek as DayOfWeek] }} {{ sched.startTime.substring(0, 5) }}–{{
                  sched.endTime.substring(0, 5)
                }}
                ({{ sched.room }})
              </UBadge>
            </div>
          </div>
          <UButton
            color="error"
            variant="outline"
            size="sm"
            :loading="isActionLoading"
            @click="openDropConfirm(cls.classId)"
          >
            Hủy đăng ký
          </UButton>
        </div>
      </UCard>
    </div>

    <!-- Modal xác nhận hủy đăng ký -->
    <UModal v-model:open="isConfirmOpen" :title="confirmModal.title.value" @close="closeConfirm">
      <template #body>
        <div class="space-y-4">
          <p class="text-sm text-gray-700">{{ confirmModal.message.value }}</p>
          <div class="flex justify-end gap-2 pt-2 border-t border-gray-100">
            <UButton color="neutral" variant="outline" @click="closeConfirm"> Hủy </UButton>
            <UButton color="error" :loading="isActionLoading" @click="confirmModal.confirm">
              {{ confirmModal.confirmButtonText.value }}
            </UButton>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStudentEnrollment } from '@/composables/student/useStudentEnrollment'
import { useConfirmModal } from '@/composables/useConfirmModal'
import { DAY_OF_WEEK_LABELS } from '@/types/classSchedule'
import type { DayOfWeek } from '@/types/classSchedule'

const router = useRouter()
const { myClasses, isLoading, isActionLoading, dropClass, fetchMyClasses } = useStudentEnrollment()
const confirmModal = useConfirmModal()

// Bridge giữa v-model:open và confirmModal.isOpen
const isConfirmOpen = computed({
  get: () => confirmModal.isOpen.value,
  set: (val) => {
    if (!val) confirmModal.close()
  },
})

function closeConfirm() {
  confirmModal.close()
}

function openDropConfirm(classId: string) {
  confirmModal.open({
    title: 'Xác nhận hủy đăng ký',
    message: 'Bạn có chắc muốn hủy đăng ký lớp này không? Hành động này không thể hoàn tác.',
    confirmButtonText: 'Hủy đăng ký',
    confirmButtonColor: 'error',
    onConfirm: async () => {
      await dropClass(classId)
    },
  })
}

onMounted(fetchMyClasses)
</script>
