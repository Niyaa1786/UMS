<!-- src/views/admin/ClassEnrollmentManagementView.vue -->
<template>
  <div class="space-y-5">
    <div class="flex items-center gap-3">
      <UButton color="neutral" variant="ghost" icon="i-heroicons-arrow-left" @click="router.back()" />
      <div class="flex-1">
        <h1 class="text-xl font-bold text-gray-900">Danh sách sinh viên – {{ classCode }}</h1>
        <p class="text-sm text-gray-500 mt-0.5">Quản lý đăng ký của lớp</p>
      </div>
      <UButton color="error" icon="i-heroicons-plus" @click="openAddModal"> Thêm sinh viên </UButton>
    </div>

    <UCard :ui="{ body: 'p-0' }">
      <UTable
        :data="enrollments"
        :columns="columns"
        :loading="isLoading"
        :empty-state="{ icon: 'i-heroicons-user-group', label: 'Chưa có sinh viên nào đăng ký' }"
      >
        <template #studentCode-cell="{ row }">
          <span class="font-mono text-sm font-semibold text-red-600">
            {{ row.original.studentCode }}
          </span>
        </template>
        <template #studentFullName-cell="{ row }">
          <div class="flex items-center gap-2">
            <UAvatar :alt="row.original.studentFullName" size="sm" />
            <div>
              <p class="font-medium text-gray-900">{{ row.original.studentFullName }}</p>
              <p class="text-xs text-gray-400">{{ row.original.studentEmail }}</p>
            </div>
          </div>
        </template>
        <template #enrolledAt-cell="{ row }">
          <span class="text-sm text-gray-600">{{ formatDate(row.original.enrolledAt) }}</span>
        </template>
        <template #status-cell="{ row }">
          <UBadge :color="row.original.status === 'Active' ? 'success' : 'neutral'" variant="subtle">
            {{ row.original.status === 'Active' ? 'Đang học' : 'Đã hủy' }}
          </UBadge>
        </template>
        <template #actions-cell="{ row }">
          <UButton
            icon="i-heroicons-trash"
            color="error"
            variant="ghost"
            size="sm"
            @click="openConfirmDeleteModal(row.original.id)"
          />
        </template>
      </UTable>
    </UCard>

    <!-- Modal thêm sinh viên -->
    <UModal v-model:open="isAddModalOpen" title="Thêm sinh viên vào lớp" @close="closeAddModal">
      <template #body>
        <UForm class="space-y-4" @submit="addEnrollmentByStudentCode">
          <UFormField label="Mã sinh viên" name="studentCode" required>
            <UInput v-model="studentCode" placeholder="Nhập mã sinh viên (VD: SV24010001)" class="w-full" />
          </UFormField>

          <div class="flex justify-end gap-2 pt-2 border-t border-gray-100">
            <UButton color="neutral" variant="outline" @click="closeAddModal"> Hủy </UButton>
            <UButton type="submit" color="error" :loading="isSubmitting"> Thêm sinh viên </UButton>
          </div>
        </UForm>
      </template>
    </UModal>

    <!-- Modal xác nhận xóa -->
    <UModal v-model:open="isConfirmDeleteOpen" title="Xác nhận xóa" @close="closeConfirmDeleteModal">
      <template #body>
        <div class="space-y-4">
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
              <UIcon name="i-heroicons-exclamation-triangle" class="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p class="text-sm text-gray-700">Bạn có chắc muốn hủy đăng ký của sinh viên này không?</p>
              <p class="text-xs text-gray-500 mt-1">Hành động này không thể hoàn tác.</p>
            </div>
          </div>

          <div class="flex justify-end gap-2 pt-2 border-t border-gray-100">
            <UButton color="neutral" variant="outline" @click="closeConfirmDeleteModal"> Hủy </UButton>
            <UButton color="error" :loading="isSubmitting" icon="i-heroicons-trash" @click="confirmDeleteEnrollment">
              Xóa
            </UButton>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useClassEnrollmentManagement } from '@/composables/classManagement/useClassEnrollmentManagement'
import type { TableColumn } from '@nuxt/ui'
import type { EnrollmentResponse } from '@/types/enrollment'

const route = useRoute()
const router = useRouter()

const classId = computed(() => route.params.classId as string)
const classCode = computed(() => (route.query.classCode as string) || classId.value)

const {
  enrollments,
  isLoading,
  isSubmitting,
  isAddModalOpen,
  isConfirmDeleteOpen,
  studentCode,
  addEnrollmentByStudentCode,
  confirmDeleteEnrollment,
  openConfirmDeleteModal,
  closeConfirmDeleteModal,
  openAddModal,
  closeAddModal,
  init,
} = useClassEnrollmentManagement()

const columns: TableColumn<EnrollmentResponse>[] = [
  { accessorKey: 'studentCode', header: 'Mã SV' },
  { accessorKey: 'studentFullName', header: 'Họ tên' },
  { accessorKey: 'studentEmail', header: 'Email' },
  { accessorKey: 'enrolledAt', header: 'Ngày đăng ký' },
  { accessorKey: 'status', header: 'Trạng thái' },
  { id: 'actions', header: 'Thao tác' },
]

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('vi-VN')
}

onMounted(() => init(classId.value))
</script>
