<!-- src/views/admin/TeacherManagementView.vue -->
<template>
  <div class="space-y-5">
    <!-- ── Page Header ────────────────────────────────────────────────────── -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-xl font-bold text-gray-900">Quản lý Giảng viên</h1>
        <p class="text-sm text-gray-500 mt-0.5">
          Tổng cộng <span class="font-semibold text-gray-700">{{ filteredList.length }}</span> giảng viên
        </p>
      </div>
      <UButton color="error" icon="i-heroicons-plus" @click="openCreate"> Thêm giảng viên </UButton>
    </div>

    <!-- ── Filters ─────────────────────────────────────────────────────────── -->
    <div class="flex flex-wrap gap-3">
      <UInput
        v-model="searchQuery"
        icon="i-heroicons-magnifying-glass"
        placeholder="Tìm theo tên, mã, email..."
        class="w-64"
      />

      <USelect v-model="filterFaculty" :items="facultyFilterOptions" placeholder="Tất cả khoa" class="w-52" />

      <USelect v-model="filterStatus" :items="statusOptions" placeholder="Tất cả trạng thái" class="w-44" />

      <UButton
        v-if="searchQuery || filterFaculty !== null || filterStatus !== null"
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
        :empty-state="{ icon: 'i-heroicons-academic-cap', label: 'Không có giảng viên nào' }"
      >
        <!-- Teacher Code -->
        <template #teacherCode-cell="{ row }">
          <span class="font-mono text-sm font-semibold text-red-600">
            {{ row.original.teacherCode }}
          </span>
        </template>

        <!-- Full Name -->
        <template #fullName-cell="{ row }">
          <div class="flex items-center gap-2">
            <UAvatar :alt="row.original.fullName" size="sm" />
            <div>
              <p class="font-medium text-gray-900 text-sm">{{ row.original.fullName }}</p>
              <p class="text-xs text-gray-400">{{ row.original.email }}</p>
            </div>
          </div>
        </template>

        <!-- Faculty -->
        <template #faculty-cell="{ row }">
          <UBadge color="neutral" variant="subtle" size="sm">
            {{ FacultyLabel[row.original.faculty as Faculty] ?? row.original.faculty }}
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
            {{ row.original.isActive ? 'Đang dạy' : 'Vô hiệu hóa' }}
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
      :title="isEditing ? 'Chỉnh sửa giảng viên' : 'Thêm giảng viên mới'"
      :ui="{ body: 'max-w-2xl' }"
      @close="closeModal"
    >
      <template #body>
        <UForm :schema="teacherSchema" :state="formData" class="space-y-4" @submit="submitForm">
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

          <!-- Row 3: Faculty + Gender -->
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Khoa" name="faculty" required>
              <USelect v-model="formData.faculty" :items="facultyFormOptions" placeholder="Chọn khoa" class="w-full" />
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
              {{ isEditing ? 'Lưu thay đổi' : 'Tạo giảng viên' }}
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
                Bạn có chắc muốn xóa giảng viên
                <span class="font-semibold text-gray-900">{{ deletingTeacher?.fullName }}</span>
                (<span class="font-mono text-red-600">{{ deletingTeacher?.teacherCode }}</span
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
import { useTeacherManagement } from '@/composables/userManagement/useTeacherManagement'
import { GenderLabel } from '@/types/staff'
import { FacultyLabel, FACULTY_OPTIONS } from '@/types/teacher'
import type { Faculty, Gender, TeacherResponse } from '@/types/teacher'
import type { TableColumn } from '@nuxt/ui'

const {
  isLoading,
  isSubmitting,
  isModalOpen,
  isDeleteOpen,
  isEditing,
  deletingTeacher,
  searchQuery,
  filterFaculty,
  filterStatus,
  formData,
  filteredList,
  teacherSchema,
  fetchAll,
  submitForm,
  confirmDelete,
  toggleStatus,
  openCreate,
  openEdit,
  openDelete,
  closeModal,
  closeDeleteModal,
} = useTeacherManagement()

// ── Table columns ──────────────────────────────────────────────────────────
const columns: TableColumn<TeacherResponse>[] = [
  { accessorKey: 'teacherCode', header: 'Mã GV', enableSorting: true },
  { accessorKey: 'fullName', header: 'Họ tên', enableSorting: true },
  { accessorKey: 'phone', header: 'Điện thoại' },
  { accessorKey: 'faculty', header: 'Khoa', enableSorting: true },
  { accessorKey: 'gender', header: 'Giới tính' },
  { accessorKey: 'dateOfBirth', header: 'Ngày sinh' },
  { accessorKey: 'isActive', header: 'Trạng thái', enableSorting: true },
  { accessorKey: 'actions', header: 'Thao tác' },
]

// ── Select options ─────────────────────────────────────────────────────────
type FacultyOptionValue = NonNullable<typeof filterFaculty.value>

const facultyFilterOptions: Array<{ label: string; value: FacultyOptionValue | null }> = [
  { label: 'Tất cả khoa', value: null },
  ...FACULTY_OPTIONS.map((f) => ({ label: FacultyLabel[f], value: f as FacultyOptionValue })),
]

const facultyFormOptions: Array<{ label: string; value: FacultyOptionValue }> = FACULTY_OPTIONS.map((f) => ({
  label: FacultyLabel[f],
  value: f as FacultyOptionValue,
}))

const statusOptions = [
  { label: 'Tất cả trạng thái', value: null },
  { label: 'Đang dạy', value: true },
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
  filterFaculty.value = null
  filterStatus.value = null
}

// ── Lifecycle ──────────────────────────────────────────────────────────────
onMounted(fetchAll)
</script>
