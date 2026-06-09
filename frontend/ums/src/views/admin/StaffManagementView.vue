<!-- src/views/admin/StaffManagementView.vue -->
<template>
  <div class="space-y-5">
    <!-- ── Page Header ────────────────────────────────────────────────────── -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-xl font-bold text-gray-900">Quản lý Nhân viên</h1>
        <p class="text-sm text-gray-500 mt-0.5">
          Tổng cộng <span class="font-semibold text-gray-700">{{ filteredList.length }}</span> nhân viên
        </p>
      </div>
      <UButton color="error" icon="i-heroicons-plus" @click="openCreate"> Thêm nhân viên </UButton>
    </div>

    <!-- ── Filters ─────────────────────────────────────────────────────────── -->
    <div class="flex flex-wrap gap-3">
      <UInput
        v-model="searchQuery"
        icon="i-heroicons-magnifying-glass"
        placeholder="Tìm theo tên, mã, email..."
        class="w-64"
      />

      <USelect v-model="filterDept" :items="departmentOptions" placeholder="Tất cả phòng ban" class="w-52" />

      <USelect v-model="filterStatus" :items="statusOptions" placeholder="Tất cả trạng thái" class="w-44" />

      <UButton
        v-if="searchQuery || filterDept !== null || filterStatus !== null"
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
        :empty-state="{ icon: 'i-heroicons-user-group', label: 'Không có nhân viên nào' }"
      >
        <!-- Staff Code -->
        <template #staffCode-cell="{ row }">
          <span class="font-mono text-sm font-semibold text-red-600">
            {{ row.original.staffCode }}
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

        <!-- Department -->
        <template #department-cell="{ row }">
          <UBadge color="neutral" variant="subtle" size="sm">
            {{ DepartmentLabel[row.original.department as Department] }}
          </UBadge>
        </template>

        <!-- Gender -->
        <template #gender-cell="{ row }">
          <span class="text-sm text-gray-600">{{ GenderLabel[row.original.gender as Gender] }}</span>
        </template>

        <!-- Date of Birth -->
        <template #dateOfBirth-cell="{ row }">
          <span class="text-sm text-gray-600">
            {{ formatDate(row.original.dateOfBirth) }}
          </span>
        </template>

        <!-- Status -->
        <template #isActive-cell="{ row }">
          <UBadge :color="row.original.isActive ? 'success' : 'neutral'" variant="subtle" size="sm">
            {{ row.original.isActive ? 'Đang hoạt động' : 'Vô hiệu hóa' }}
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
      :title="isEditing ? 'Chỉnh sửa nhân viên' : 'Thêm nhân viên mới'"
      :ui="{ body: 'max-w-2xl' }"
      @close="closeModal"
    >
      <template #body>
        <UForm :schema="staffSchema" :state="formData" class="space-y-4" @submit="submitForm">
          <!-- Row 1: FullName + Email -->
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Họ và tên" name="fullName" required>
              <UInput v-model="formData.fullName" placeholder="Nguyễn Văn A" class="w-full" />
            </UFormField>
            <UFormField label="Email" name="email" required>
              <UInput v-model="formData.email" type="email" placeholder="example@vietmly.edu.vn" class="w-full" />
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

          <!-- Row 3: Department + Gender -->
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Phòng ban" name="department" required>
              <USelect v-model="formData.department" :items="departmentFormOptions" class="w-full" />
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

          <!-- Footer buttons inside form -->
          <div class="flex justify-end gap-2 pt-2 border-t border-gray-100">
            <UButton color="neutral" variant="outline" @click="closeModal"> Hủy </UButton>
            <UButton type="submit" color="error" :loading="isSubmitting">
              {{ isEditing ? 'Lưu thay đổi' : 'Tạo nhân viên' }}
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
                Bạn có chắc muốn xóa nhân viên
                <span class="font-semibold text-gray-900">{{ deletingStaff?.fullName }}</span>
                (<span class="font-mono text-red-600">{{ deletingStaff?.staffCode }}</span
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
import { useStaffManagement } from '@/composables/userManagement/useStaffManagement'
import { DepartmentLabel, GenderLabel } from '@/types/staff'
import type { Department, Gender } from '@/types/staff'
import type { StaffResponse } from '@/types/staff'
import type { SelectItem, TableColumn } from '@nuxt/ui'

const {
  isLoading,
  isSubmitting,
  isModalOpen,
  isDeleteOpen,
  isEditing,
  deletingStaff,
  searchQuery,
  filterDept,
  filterStatus,
  formData,
  filteredList,
  staffSchema,
  fetchAll,
  submitForm,
  confirmDelete,
  toggleStatus,
  openCreate,
  openEdit,
  openDelete,
  closeModal,
  closeDeleteModal,
} = useStaffManagement()

// ── Table columns ──────────────────────────────────────────────────────────
const columns: TableColumn<StaffResponse>[] = [
  { accessorKey: 'staffCode', header: 'Mã NV', enableSorting: true },
  { accessorKey: 'fullName', header: 'Họ tên', enableSorting: true },
  { accessorKey: 'phone', header: 'Điện thoại' },
  { accessorKey: 'department', header: 'Phòng ban', enableSorting: true },
  { accessorKey: 'gender', header: 'Giới tính' },
  { accessorKey: 'dateOfBirth', header: 'Ngày sinh' },
  { accessorKey: 'isActive', header: 'Trạng thái', enableSorting: true },
  { id: 'actions', header: 'Thao tác' },
]

// ── Select options for filters ─────────────────────────────────────────────
const departmentOptions = [
  { label: 'Tất cả phòng ban', value: null },
  ...Object.entries(DepartmentLabel).map(([val, label]) => ({
    label: label,
    value: val as Department,
  })),
]

const statusOptions = [
  { label: 'Tất cả trạng thái', value: null },
  { label: 'Đang hoạt động', value: true },
  { label: 'Vô hiệu hóa', value: false },
]

// ── Select options for form ────────────────────────────────────────────────
const departmentFormOptions: SelectItem[] = Object.entries(DepartmentLabel).map(([val, label]) => ({
  label: label,
  value: val as Department,
}))

const genderFormOptions = Object.entries(GenderLabel).map(([val, label]) => ({
  label: label,
  value: val as Gender,
}))

// ── Helpers ───────────────────────────────────────────────────────────────
function formatDate(iso: string): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('vi-VN')
}

function clearFilters() {
  searchQuery.value = ''
  filterDept.value = null
  filterStatus.value = null
}

// ── Lifecycle ─────────────────────────────────────────────────────────────
onMounted(fetchAll)
</script>
