<!-- src/views/admin/SubjectManagementView.vue -->
<template>
  <div class="space-y-5">
    <!-- ── Page Header ────────────────────────────────────────────────────── -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-xl font-bold text-gray-900">Quản lý Môn học</h1>
        <p class="text-sm text-gray-500 mt-0.5">
          Tổng cộng <span class="font-semibold text-gray-700">{{ filteredList.length }}</span> môn học
        </p>
      </div>
      <UButton color="error" icon="i-heroicons-plus" @click="openCreate"> Thêm môn học </UButton>
    </div>

    <!-- ── Filters ─────────────────────────────────────────────────────────── -->
    <div class="flex flex-wrap gap-3">
      <UInput
        v-model="searchQuery"
        icon="i-heroicons-magnifying-glass"
        placeholder="Tìm theo tên, mã môn học..."
        class="w-72"
      />
      <UButton
        v-if="searchQuery"
        color="neutral"
        variant="ghost"
        icon="i-heroicons-x-mark"
        @click="searchQuery = ''"
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
        :empty-state="{ icon: 'i-heroicons-book-open', label: 'Không có môn học nào' }"
      >
        <!-- Credits badge -->
        <template #credits-cell="{ row }">
          <UBadge color="info" variant="soft">{{ row.original.credits }} TC</UBadge>
        </template>

        <!-- Description -->
        <template #description-cell="{ row }">
          <span class="text-sm text-gray-500 line-clamp-1">
            {{ row.original.description ?? '—' }}
          </span>
        </template>

        <!-- Actions -->
        <template #actions-cell="{ row }">
          <div class="flex items-center gap-2">
            <UButton
              size="xs"
              color="neutral"
              variant="ghost"
              icon="i-heroicons-pencil-square"
              @click="openEdit(row.original)"
            />
            <UButton
              size="xs"
              color="error"
              variant="ghost"
              icon="i-heroicons-trash"
              @click="openDelete(row.original)"
            />
          </div>
        </template>
      </UTable>
    </UCard>

    <!-- ── Create / Edit Modal ────────────────────────────────────────────── -->
    <UModal
      v-model:open="isModalOpen"
      :title="isEditing ? 'Chỉnh sửa môn học' : 'Thêm môn học mới'"
      @close="closeModal"
    >
      <template #body>
        <UForm
          :schema="isEditing ? updateSubjectSchema : createSubjectSchema"
          :state="formData"
          class="space-y-4"
          @submit="submitForm"
        >
          <!-- Code — chỉ hiển thị khi tạo mới -->
          <UFormField v-if="!isEditing" label="Mã môn học" name="code" required>
            <UInput v-model="formData.code" placeholder="VD: CNTT101" class="w-full" />
          </UFormField>

          <!-- Name -->
          <UFormField label="Tên môn học" name="name" required>
            <UInput v-model="formData.name" placeholder="VD: Lập trình Web" class="w-full" />
          </UFormField>

          <!-- Credits -->
          <UFormField label="Số tín chỉ" name="credits" required>
            <UInputNumber v-model="formData.credits" :min="1" :max="10" class="w-full" />
          </UFormField>

          <!-- Description -->
          <UFormField label="Mô tả" name="description">
            <UTextarea
              v-model="formData.description"
              placeholder="Mô tả ngắn về môn học..."
              :rows="3"
              class="w-full"
            />
          </UFormField>

          <div class="flex justify-end gap-2 pt-2 border-t border-gray-100">
            <UButton color="neutral" variant="outline" @click="closeModal"> Hủy </UButton>
            <UButton type="submit" color="error" :loading="isSubmitting">
              {{ isEditing ? 'Lưu thay đổi' : 'Tạo môn học' }}
            </UButton>
          </div>
        </UForm>
      </template>
    </UModal>

    <!-- ── Delete Confirm Modal ───────────────────────────────────────────── -->
    <UModal v-model:open="isDeleteOpen" title="Xác nhận xóa" @close="closeDeleteModal">
      <template #body>
        <div class="space-y-4">
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
              <UIcon name="i-heroicons-exclamation-triangle" class="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p class="text-sm text-gray-700">
                Bạn có chắc muốn xóa môn học
                <span class="font-semibold text-gray-900">{{ deletingSubject?.name }}</span>
                (<span class="font-mono text-red-600">{{ deletingSubject?.code }}</span>)?
              </p>
              <p class="text-xs text-gray-500 mt-1">Hành động này không thể hoàn tác.</p>
            </div>
          </div>
          <div class="flex justify-end gap-2 pt-2 border-t border-gray-100">
            <UButton color="neutral" variant="outline" @click="closeDeleteModal"> Hủy </UButton>
            <UButton color="error" :loading="isSubmitting" icon="i-heroicons-trash" @click="confirmDelete">
              Xóa
            </UButton>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useSubjectManagement } from '@/composables/classManagement/useSubjectManagement'
import type { SubjectResponse } from '@/types/subject'
import type { TableColumn } from '@nuxt/ui'

const {
  isLoading,
  isSubmitting,
  isModalOpen,
  isDeleteOpen,
  isEditing,
  deletingSubject,
  searchQuery,
  formData,
  filteredList,
  createSubjectSchema,
  updateSubjectSchema,
  fetchAll,
  submitForm,
  confirmDelete,
  openCreate,
  openEdit,
  openDelete,
  closeModal,
  closeDeleteModal,
} = useSubjectManagement()

// ── Table columns ──────────────────────────────────────────────────────────
const columns: TableColumn<SubjectResponse>[] = [
  { accessorKey: 'code', header: 'Mã môn', enableSorting: true },
  { accessorKey: 'name', header: 'Tên môn học', enableSorting: true },
  { accessorKey: 'credits', header: 'Số tín chỉ', enableSorting: true },
  { accessorKey: 'description', header: 'Mô tả' },
  { accessorKey: 'actions', header: 'Thao tác' },
]

onMounted(fetchAll)
</script>