<template>
  <div class="space-y-5">
    <!-- ── Page Header ────────────────────────────────────────────────────── -->
    <div class="flex items-center gap-3">
      <UButton color="neutral" variant="ghost" icon="i-heroicons-arrow-left" @click="router.back()" />
      <div class="flex-1">
        <h1 class="text-xl font-bold text-gray-900">Lịch học lớp {{ classCode }}</h1>
        <p class="text-sm text-gray-500 mt-0.5">Quản lý lịch học theo ngày và phòng</p>
      </div>
      <UButton color="error" icon="i-heroicons-plus" @click="openCreate"> Thêm lịch học </UButton>
    </div>

    <!-- ── Schedule Table ─────────────────────────────────────────────────── -->
    <UCard :ui="{ body: 'p-0' }">
      <UTable
        :data="scheduleList"
        :columns="columns"
        :loading="isLoading"
        :empty-state="{ icon: 'i-heroicons-calendar-days', label: 'Chưa có lịch học nào' }"
      >
        <!-- Day of week -->
        <template #dayOfWeek-cell="{ row }">
          <UBadge color="info" variant="soft">
            {{ DAY_OF_WEEK_LABELS[row.original.dayOfWeek] }}
          </UBadge>
        </template>

        <!-- Time range -->
        <template #startTime-cell="{ row }">
          <span class="font-mono text-sm">
            {{ row.original.startTime.substring(0, 5) }} – {{ row.original.endTime.substring(0, 5) }}
          </span>
        </template>

        <!-- Room -->
        <template #room-cell="{ row }">
          <div class="flex items-center gap-1.5">
            <UIcon name="i-heroicons-building-office-2" class="w-4 h-4 text-gray-400" />
            <span>{{ row.original.room }}</span>
          </div>
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
              @click="removeSchedule(row.original)"
            />
          </div>
        </template>
      </UTable>
    </UCard>

    <!-- ── Create / Edit Slideover ────────────────────────────────────────── -->
    <USlideover
      v-model:open="isFormOpen"
      :title="isEditing ? 'Chỉnh sửa lịch học' : 'Thêm lịch học mới'"
      side="right"
      @close="closeForm"
    >
      <template #body>
        <UForm :schema="scheduleSchema" :state="formData" class="space-y-4 p-4" @submit="submitForm">
          <!-- Day of week -->
          <UFormField label="Thứ trong tuần" name="dayOfWeek" required>
            <USelect v-model="formData.dayOfWeek" :items="dayOfWeekOptions" placeholder="Chọn thứ" class="w-full" />
          </UFormField>

          <!-- Time range -->
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Giờ bắt đầu" name="startTime" required>
              <UInput v-model="formData.startTime" type="time" class="w-full" />
            </UFormField>
            <UFormField label="Giờ kết thúc" name="endTime" required>
              <UInput v-model="formData.endTime" type="time" class="w-full" />
            </UFormField>
          </div>

          <!-- Room -->
          <UFormField label="Phòng học" name="room" required>
            <UInput v-model="formData.room" placeholder="VD: A101, B204..." class="w-full" />
          </UFormField>

          <div class="flex justify-end gap-2 pt-4 border-t border-gray-100">
            <UButton color="neutral" variant="outline" @click="closeForm"> Hủy </UButton>
            <UButton type="submit" color="error" :loading="isSubmitting">
              {{ isEditing ? 'Lưu thay đổi' : 'Thêm lịch học' }}
            </UButton>
          </div>
        </UForm>
      </template>
    </USlideover>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useClassScheduleManagement } from '@/composables/classManagement/useClasssSheduleManagement'
import { DAY_OF_WEEK_LABELS, DAY_OF_WEEK_OPTIONS } from '@/types/classSchedule'
import type { ClassScheduleResponse } from '@/types/classSchedule'
import type { TableColumn } from '@nuxt/ui'

const route = useRoute()
const router = useRouter()

const classId = computed(() => route.params.classId as string)
const classCode = computed(() => (route.query.classCode as string) ?? classId.value)

const {
  scheduleList,
  isLoading,
  isSubmitting,
  isFormOpen,
  isEditing,
  formData,
  scheduleSchema,
  fetchByClass,
  submitForm,
  removeSchedule,
  openCreate,
  openEdit,
  closeForm,
} = useClassScheduleManagement()

// ── Table columns ──────────────────────────────────────────────────────────
const columns: TableColumn<ClassScheduleResponse>[] = [
  { accessorKey: 'dayOfWeek', header: 'Thứ', enableSorting: true },
  { accessorKey: 'startTime', header: 'Thời gian' },
  { accessorKey: 'room', header: 'Phòng học' },
  { accessorKey: 'actions', header: 'Thao tác' },
]

// ── Select options ─────────────────────────────────────────────────────────
const dayOfWeekOptions = DAY_OF_WEEK_OPTIONS

// ── Lifecycle ──────────────────────────────────────────────────────────────
onMounted(() => fetchByClass(classId.value))
</script>
