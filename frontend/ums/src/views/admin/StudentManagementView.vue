<!-- src/views/admin/StudentManagementView.vue -->
<template>
  <div class="space-y-5">
    <!-- ── Page Header ────────────────────────────────────────────────────── -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-xl font-bold text-gray-900">Quản lý Sinh viên</h1>
        <p class="text-sm text-gray-500 mt-0.5">
          Tổng cộng <span class="font-semibold text-gray-700">{{ filteredList.length }}</span> sinh viên
        </p>
      </div>
      <UButton color="error" icon="i-heroicons-plus" @click="openCreate"> Thêm sinh viên </UButton>
    </div>

    <!-- ── Filters ─────────────────────────────────────────────────────────── -->
    <div class="flex flex-wrap gap-3">
      <UInput
        v-model="searchQuery"
        icon="i-heroicons-magnifying-glass"
        placeholder="Tìm theo tên, mã SV, email, ngành..."
        class="w-72"
      />

      <USelect v-model="filterMajor" :items="majorFilterOptions" placeholder="Tất cả chuyên ngành" class="w-52" />

      <USelect v-model="filterStatus" :items="statusOptions" placeholder="Tất cả trạng thái" class="w-44" />

      <UButton
        v-if="searchQuery || filterMajor || filterStatus !== null"
        color="neutral"
        variant="ghost"
        icon="i-heroicons-x-mark"
        @click="clearFilters"
      >
        Xóa bộ lọc
      </UButton>
    </div>

    <!-- ── Table ──────────────────────────────────────────────────────────── -->
    <UCard :ui="{ body: 'p-0' }">
      <UTable
        :data="filteredList"
        :columns="columns"
        :loading="isLoading"
        :empty-state="{ icon: 'i-heroicons-users', label: 'Không có sinh viên nào' }"
      >
        <!-- Student Code -->
        <template #studentCode-cell="{ row }">
          <span class="font-mono text-sm font-semibold text-red-600">
            {{ row.original.studentCode }}
          </span>
        </template>

        <!-- Full Name + email -->
        <template #fullName-cell="{ row }">
          <div class="flex items-center gap-2">
            <UAvatar :alt="row.original.fullName" size="sm" />
            <div>
              <p class="font-medium text-gray-900 text-sm">{{ row.original.fullName }}</p>
              <p class="text-xs text-gray-400">{{ row.original.email }}</p>
            </div>
          </div>
        </template>

        <!-- Major -->
        <template #major-cell="{ row }">
          <UBadge color="secondary" variant="subtle" size="sm">
            {{ row.original.major }}
          </UBadge>
        </template>

        <!-- Gender -->
        <template #gender-cell="{ row }">
          <span class="text-sm text-gray-600">{{ GenderLabel[row.original.gender as Gender] }}</span>
        </template>

        <!-- Date of Birth -->
        <template #dateOfBirth-cell="{ row }">
          <span class="text-sm text-gray-600">{{ formatDate(row.original.dateOfBirth) }}</span>
        </template>

        <!-- Status -->
        <template #isActive-cell="{ row }">
          <UBadge :color="row.original.isActive ? 'success' : 'neutral'" variant="subtle" size="sm">
            {{ row.original.isActive ? 'Đang học' : 'Vô hiệu hóa' }}
          </UBadge>
        </template>

        <!-- Actions -->
        <template #actions-cell="{ row }">
          <div class="flex items-center gap-1">
            <UButton
              icon="i-heroicons-pencil-square"
              color="neutral"
              variant="ghost"
              size="sm"
              @click="openEdit(row.original)"
            />
            <UButton
              :icon="row.original.isActive ? 'i-heroicons-lock-closed' : 'i-heroicons-lock-open'"
              color="neutral"
              variant="ghost"
              size="sm"
              @click="toggleStatus(row.original)"
            />
            <UButton icon="i-heroicons-trash" color="error" variant="ghost" size="sm" @click="openDelete(row.original)" />
          </div>
        </template>
      </UTable>
    </UCard>

    <!-- ── Create / Edit Modal ─────────────────────────────────────────────── -->
    <UModal
      v-model:open="isModalOpen"
      :title="isEditing ? 'Chỉnh sửa sinh viên' : 'Thêm sinh viên mới'"
      :ui="{ body: 'max-w-2xl' }"
      @close="closeModal"
    >
      <template #body>
        <UForm :schema="studentSchema" :state="formData" class="space-y-4" @submit="submitForm">
          <!-- Row 1: FullName + Email -->
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Họ và tên" name="fullName" required>
              <UInput v-model="formData.fullName" placeholder="Nguyễn Văn A" class="w-full" />
            </UFormField>
            <UFormField label="Email" name="email" required>
              <UInput v-model="formData.email" type="email" placeholder="example@vietmy.edu.vn" class="w-full" />
            </UFormField>
          </div>

          <!-- Row 2: Phone + DateOfBirth -->
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Số điện thoại" name="phone" required>
              <UInput v-model="formData.phone" placeholder="0912345678" class="w-full" />
            </UFormField>
            <UFormField label="Ngày sinh" name="dateOfBirth" required>
              <UInput v-model="formData.dateOfBirth" type="date" class="w-full" />
            </UFormField>
          </div>

          <!-- Row 3: Major + Gender -->
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Chuyên ngành" name="major" required>
              <USelect v-model="formData.major" :items="majorFormOptions" placeholder="Chọn chuyên ngành" class="w-full" />
            </UFormField>
            <UFormField label="Giới tính" name="gender" required>
              <USelect v-model="formData.gender" :items="genderFormOptions" class="w-full" />
            </UFormField>
          </div>

          <!-- Row 4: Address -->
          <UFormField label="Địa chỉ" name="address" required>
            <UTextarea
              v-model="formData.address"
              placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành"
              :rows="2"
              class="w-full"
            />
          </UFormField>

          <!-- Buttons -->
          <div class="flex justify-end gap-2 pt-2 border-t border-gray-100">
            <UButton color="neutral" variant="outline" @click="closeModal"> Hủy </UButton>
            <UButton type="submit" color="error" :loading="isSubmitting">
              {{ isEditing ? 'Lưu thay đổi' : 'Tạo sinh viên' }}
            </UButton>
          </div>
        </UForm>
      </template>
    </UModal>

    <!-- ── Delete Confirm Modal ────────────────────────────────────────────── -->
    <UModal v-model:open="isDeleteOpen" title="Xác nhận xóa" @close="closeDeleteModal">
      <template #body>
        <div class="space-y-4">
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
              <UIcon name="i-heroicons-exclamation-triangle" class="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p class="text-sm text-gray-700">
                Bạn có chắc muốn xóa sinh viên
                <span class="font-semibold text-gray-900">{{ deletingStudent?.fullName }}</span>
                (<span class="font-mono text-red-600">{{ deletingStudent?.studentCode }}</span
                >)?
              </p>
              <p class="text-xs text-gray-500 mt-1">Hành động này không thể hoàn tác.</p>
            </div>
          </div>

          <div class="flex justify-end gap-2 pt-2 border-t border-gray-100">
            <UButton color="neutral" variant="outline" @click="closeDeleteModal"> Hủy </UButton>
            <UButton color="error" :loading="isSubmitting" icon="i-heroicons-trash" @click="confirmDelete"> Xóa </UButton>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useStudentManagement } from '@/composables/userManagement/useStudentManagement'
import { GenderLabel, MAJOR_OPTIONS } from '@/types/student'
import type { Gender, StudentResponse } from '@/types/student'
import type { TableColumn } from '@nuxt/ui'

const {
  isLoading,
  isSubmitting,
  isModalOpen,
  isDeleteOpen,
  isEditing,
  deletingStudent,
  searchQuery,
  filterMajor,
  filterStatus,
  formData,
  filteredList,
  studentSchema,
  fetchAll,
  submitForm,
  confirmDelete,
  toggleStatus,
  openCreate,
  openEdit,
  openDelete,
  closeModal,
  closeDeleteModal,
} = useStudentManagement()

// ── Table columns ──────────────────────────────────────────────────────────
const columns: TableColumn<StudentResponse>[] = [
  { accessorKey: 'studentCode', header: 'Mã SV', enableSorting: true },
  { accessorKey: 'fullName', header: 'Họ tên', enableSorting: true },
  { accessorKey: 'phone', header: 'Điện thoại' },
  { accessorKey: 'major', header: 'Chuyên ngành', enableSorting: true },
  { accessorKey: 'gender', header: 'Giới tính' },
  { accessorKey: 'dateOfBirth', header: 'Ngày sinh' },
  { accessorKey: 'isActive', header: 'Trạng thái', enableSorting: true },
  { accessorKey: 'actions', header: 'Thao tác' },
]

// ── Select options ─────────────────────────────────────────────────────────
type MajorOptionValue = NonNullable<typeof filterMajor.value>

const majorFilterOptions: Array<{ label: string; value: MajorOptionValue | null }> = [
  { label: 'Tất cả chuyên ngành', value: null },
  ...MAJOR_OPTIONS.map((m) => ({ label: m, value: m as MajorOptionValue })),
]

const majorFormOptions: Array<{ label: string; value: MajorOptionValue }> = MAJOR_OPTIONS.map((m) => ({
  label: m,
  value: m as MajorOptionValue,
}))

const statusOptions = [
  { label: 'Tất cả trạng thái', value: null },
  { label: 'Đang học', value: true },
  { label: 'Vô hiệu hóa', value: false },
]

const genderFormOptions = Object.entries(GenderLabel).map(([val, label]) => ({
  label,
  value: val as Gender,
}))

// ── Helpers ────────────────────────────────────────────────────────────────
function formatDate(iso: string): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('vi-VN')
}

function clearFilters() {
  searchQuery.value = ''
  filterMajor.value = null
  filterStatus.value = null
}

// ── Lifecycle ──────────────────────────────────────────────────────────────
onMounted(fetchAll)
</script>
