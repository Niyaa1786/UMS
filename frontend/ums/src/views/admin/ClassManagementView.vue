<template>
  <div class="space-y-5">
    <!-- ── Page Header ────────────────────────────────────────────────────── -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-xl font-bold text-gray-900">Quản lý Lớp học</h1>
        <p class="text-sm text-gray-500 mt-0.5">
          Tổng cộng <span class="font-semibold text-gray-700">{{ filteredList.length }}</span> lớp học
        </p>
      </div>
      <UButton color="error" icon="i-heroicons-plus" @click="openCreate"> Thêm lớp học </UButton>
    </div>

    <!-- ── Filters ────────────────────────────────────────────────────────── -->
    <div class="flex flex-wrap gap-3">
      <UInput
        v-model="searchQuery"
        icon="i-heroicons-magnifying-glass"
        placeholder="Tìm theo mã lớp, môn học, giảng viên..."
        class="w-72"
      />

      <USelect v-model="filterSemester" :items="semesterFilterOptions" placeholder="Tất cả học kỳ" class="w-44" />

      <USelect v-model="filterStatus" :items="statusFilterOptions" placeholder="Tất cả trạng thái" class="w-44" />

      <UButton
        v-if="searchQuery || filterSemester !== null || filterStatus !== null"
        color="neutral"
        variant="ghost"
        icon="i-heroicons-x-mark"
        @click="clearFilters"
      >
        Xóa bộ lọc
      </UButton>
    </div>

    <!-- ── Table ─────────────────────────────────────────────────────────── -->
    <UCard :ui="{ body: 'p-0' }">
      <UTable
        :data="filteredList"
        :columns="columns"
        :loading="isLoading"
        :empty-state="{ icon: 'i-heroicons-academic-cap', label: 'Không có lớp học nào' }"
      >
        <!-- Class Code -->
        <template #code-cell="{ row }">
          <span class="font-mono text-sm font-semibold text-red-600">
            {{ row.original.code }}
          </span>
        </template>

        <!-- Subject + school year -->
        <template #subjectName-cell="{ row }">
          <div>
            <p class="font-medium text-gray-900 text-sm">{{ row.original.subjectName }}</p>
            <p class="text-xs text-gray-400">{{ row.original.schoolYear }}</p>
          </div>
        </template>

        <!-- Teacher -->
        <template #teacherName-cell="{ row }">
          <div class="flex items-center gap-2">
            <UAvatar :alt="row.original.teacherName" size="sm" />
            <span class="text-sm text-gray-700">{{ row.original.teacherName }}</span>
          </div>
        </template>

        <!-- Semester -->
        <template #semester-cell="{ row }">
          <UBadge color="info" variant="soft" size="sm"> Học kỳ {{ row.original.semester }} </UBadge>
        </template>

        <!-- Date range -->
        <template #startDate-cell="{ row }">
          <span class="text-sm text-gray-600">
            {{ formatDate(row.original.startDate) }} – {{ formatDate(row.original.endDate) }}
          </span>
        </template>

        <!-- Max students -->
        <template #maxStudents-cell="{ row }">
          <span class="text-sm text-gray-700 font-medium">{{ row.original.maxStudents }} SV</span>
        </template>

        <!-- Status -->
        <template #status-cell="{ row }">
          <UBadge :color="row.original.status === 'Active' ? 'success' : 'neutral'" variant="subtle" size="sm">
            {{ row.original.status === 'Active' ? 'Đang hoạt động' : 'Vô hiệu hóa' }}
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
              :icon="row.original.status === 'Active' ? 'i-heroicons-lock-closed' : 'i-heroicons-lock-open'"
              color="neutral"
              variant="ghost"
              size="sm"
              @click="toggleStatus(row.original)"
            />
            <UButton icon="i-heroicons-trash" color="error" variant="ghost" size="sm" @click="openDelete(row.original)" />
            <UButton
              icon="i-heroicons-user-group"
              color="info"
              variant="ghost"
              size="sm"
              title="Quản lý đăng ký"
              @click="goToEnrollments(row.original)"
            />
            <UButton
              icon="i-heroicons-calendar-days"
              color="info"
              variant="ghost"
              size="sm"
              title="Xem lịch học"
              @click="goToSchedule(row.original)"
            />
          </div>
        </template>
      </UTable>
    </UCard>

    <!-- ── Create / Edit Modal ────────────────────────────────────────────── -->
    <UModal v-model:open="isModalOpen" :title="isEditing ? 'Chỉnh sửa lớp học' : 'Thêm lớp học mới'" @close="closeModal">
      <template #body>
        <UForm :schema="classSchema" :state="formData" class="space-y-4" @submit="submitForm">
          <!-- Row 1: Code + SchoolYear -->
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Mã lớp" name="code" required>
              <UInput v-model="formData.code" placeholder="VD: CS101-01" class="w-full" :disabled="isEditing" />
            </UFormField>
            <UFormField label="Năm học" name="schoolYear" required>
              <UInput v-model="formData.schoolYear" placeholder="VD: 2024-2025" class="w-full" />
            </UFormField>
          </div>

          <!-- Row 2: Subject + Teacher -->
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Môn học" name="subjectId" required>
              <USelect v-model="formData.subjectId" :items="subjectOptions" placeholder="Chọn môn học" class="w-full" />
            </UFormField>
            <UFormField label="Giảng viên" name="teacherId" required>
              <USelect v-model="formData.teacherId" :items="teacherOptions" placeholder="Chọn giảng viên" class="w-full" />
            </UFormField>
          </div>

          <!-- Row 3: Semester + MaxStudents -->
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Học kỳ" name="semester" required>
              <USelect v-model="formData.semester" :items="semesterFormOptions" class="w-full" />
            </UFormField>
            <UFormField label="Sĩ số tối đa" name="maxStudents" required>
              <UInput v-model.number="formData.maxStudents" type="number" min="1" class="w-full" />
            </UFormField>
          </div>

          <!-- Row 4: StartDate + EndDate -->
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Ngày bắt đầu" name="startDate" required>
              <UInput v-model="formData.startDate" type="date" class="w-full" />
            </UFormField>
            <UFormField label="Ngày kết thúc" name="endDate" required>
              <UInput v-model="formData.endDate" type="date" class="w-full" />
            </UFormField>
          </div>

          <!-- Footer buttons inside form -->
          <div class="flex justify-end gap-2 pt-2 border-t border-gray-100">
            <UButton color="neutral" variant="outline" @click="closeModal"> Hủy </UButton>
            <UButton type="submit" color="error" :loading="isSubmitting">
              {{ isEditing ? 'Lưu thay đổi' : 'Tạo lớp học' }}
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
                Bạn có chắc muốn xóa lớp
                <span class="font-mono font-semibold text-red-600">{{ deletingClass?.code }}</span>
                — <span class="font-semibold text-gray-900">{{ deletingClass?.subjectName }}</span
                >?
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
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useClassManagement } from '@/composables/classManagement/useClassManagement'
import { classManagementService } from '@/services/classManagementService'
import { teacherService } from '@/services/teacherService'
import type { ClassResponse } from '@/types/class'
import type { SubjectResponse } from '@/types/subject'
import type { TeacherResponse } from '@/types/teacher'
import type { TableColumn } from '@nuxt/ui'

const router = useRouter()

// ── Composable ─────────────────────────────────────────────────────────────
const {
  filteredList,
  isLoading,
  isSubmitting,
  isModalOpen,
  isDeleteOpen,
  isEditing,
  deletingClass,
  searchQuery,
  filterSemester,
  filterStatus,
  formData,
  classSchema,
  fetchAll,
  submitForm,
  confirmDelete,
  toggleStatus,
  openCreate,
  openEdit,
  openDelete,
  closeModal,
  closeDeleteModal,
} = useClassManagement()

// ── Supporting data for dropdowns ──────────────────────────────────────────
const subjectList = ref<SubjectResponse[]>([])
const teacherList = ref<TeacherResponse[]>([])

const subjectOptions = computed(() => subjectList.value.map((s) => ({ label: `${s.code} — ${s.name}`, value: s.id })))

const teacherOptions = computed(() =>
  teacherList.value.map((t) => ({ label: `${t.teacherCode} — ${t.fullName}`, value: t.id })),
)

// ── Table columns ───────────────────────────────────────────────────────────
const columns: TableColumn<ClassResponse>[] = [
  { accessorKey: 'code', header: 'Mã lớp', enableSorting: true },
  { accessorKey: 'subjectName', header: 'Môn học', enableSorting: true },
  { accessorKey: 'teacherName', header: 'Giảng viên' },
  { accessorKey: 'semester', header: 'Học kỳ', enableSorting: true },
  { accessorKey: 'startDate', header: 'Thời gian' },
  { accessorKey: 'maxStudents', header: 'Sĩ số' },
  { accessorKey: 'status', header: 'Trạng thái', enableSorting: true },
  { id: 'actions', header: 'Thao tác' },
]

// ── Filter / form select options ────────────────────────────────────────────
const semesterFilterOptions = [
  { label: 'Tất cả học kỳ', value: null },
  { label: 'Học kỳ 1', value: 1 },
  { label: 'Học kỳ 2', value: 2 },
  { label: 'Học kỳ 3', value: 3 },
]

const statusFilterOptions = [
  { label: 'Tất cả trạng thái', value: null },
  { label: 'Đang hoạt động', value: 'Active' },
  { label: 'Vô hiệu hóa', value: 'Inactive' },
]

const semesterFormOptions = [
  { label: 'Học kỳ 1', value: 1 },
  { label: 'Học kỳ 2', value: 2 },
  { label: 'Học kỳ 3', value: 3 },
]

// ── Helpers ─────────────────────────────────────────────────────────────────
function formatDate(iso: string): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('vi-VN')
}

function clearFilters() {
  searchQuery.value = ''
  filterSemester.value = null
  filterStatus.value = null
}

function goToSchedule(cls: ClassResponse) {
  router.push({
    name: 'ClassScheduleManagement',
    params: { classId: cls.id },
    query: { classCode: cls.code },
  })
}

function goToEnrollments(cls: ClassResponse) {
  router.push({
    name: 'ClassEnrollmentManagement',
    params: { classId: cls.id },
    query: { classCode: cls.code },
  })
}

// ── Lifecycle ───────────────────────────────────────────────────────────────
onMounted(async () => {
  await fetchAll()
  try {
    const [subjects, teachers] = await Promise.all([
      classManagementService.getAllSubjects(),
      teacherService.getAllTeachers(),
    ])
    subjectList.value = subjects
    teacherList.value = teachers
  } catch {}
})
</script>
