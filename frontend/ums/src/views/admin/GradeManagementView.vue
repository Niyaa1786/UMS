<!-- src/views/staff/GradeManagementView.vue -->
<template>
  <div class="space-y-5">
    <!-- ── Header ─────────────────────────────────────────────────────────── -->
    <div class="flex items-center gap-3">
      <UButton color="neutral" variant="ghost" icon="i-heroicons-arrow-left" @click="router.back()" />
      <div class="flex-1">
        <h1 class="text-xl font-bold text-gray-900">Bảng điểm – {{ classCode }}</h1>
        <p class="text-sm text-gray-500 mt-0.5">
          Tổng cộng <span class="font-semibold text-gray-700">{{ rows.length }}</span> sinh viên
        </p>
      </div>
    </div>

    <!-- ── Table ─────────────────────────────────────────────────────────── -->
    <UCard :ui="{ body: 'p-0' }">
      <UTable
        :data="rows"
        :columns="columns"
        :loading="isLoading"
        :empty-state="{ icon: 'i-heroicons-user-group', label: 'Chưa có sinh viên nào trong lớp' }"
      >
        <!-- Mã SV -->
        <template #studentCode-cell="{ row }">
          <span class="font-mono text-sm font-semibold text-red-600">
            {{ row.original.studentCode }}
          </span>
        </template>

        <!-- Họ tên -->
        <template #studentFullName-cell="{ row }">
          <div class="flex items-center gap-2">
            <UAvatar :alt="row.original.studentFullName" size="sm" />
            <div>
              <p class="font-medium text-gray-900 text-sm">{{ row.original.studentFullName }}</p>
              <p class="text-xs text-gray-400">{{ row.original.studentEmail }}</p>
            </div>
          </div>
        </template>

        <!-- Chuyên cần: chỉ đồng bộ tự động, không nhập tay -->
        <template #attendance-cell="{ row }">
          <div class="flex items-center gap-1.5">
            <GradeCell :grade="row.original.gradesByType[GradeType.Attendance]" readonly />
            <UButton
              size="xs"
              color="neutral"
              variant="ghost"
              icon="i-heroicons-arrow-path"
              :loading="syncingEnrollmentId === row.original.enrollmentId"
              title="Đồng bộ điểm chuyên cần từ điểm danh"
              @click="syncAttendance(row.original)"
            />
          </div>
        </template>

        <!-- Giữa kỳ -->
        <template #midterm-cell="{ row }">
          <GradeCell
            :grade="row.original.gradesByType[GradeType.Midterm]"
            @edit="openGradeModal(row.original, GradeType.Midterm)"
          />
        </template>

        <!-- Cuối kỳ -->
        <template #final-cell="{ row }">
          <GradeCell
            :grade="row.original.gradesByType[GradeType.Final]"
            @edit="openGradeModal(row.original, GradeType.Final)"
          />
        </template>

        <!-- Bài tập -->
        <template #assignment-cell="{ row }">
          <GradeCell
            :grade="row.original.gradesByType[GradeType.Assignment]"
            @edit="openGradeModal(row.original, GradeType.Assignment)"
          />
        </template>

        <!-- Tổng kết -->
        <template #final-summary-cell="{ row }">
          <div v-if="row.original.finalScore !== undefined" class="flex items-center gap-2">
            <span class="font-semibold text-gray-900">{{ row.original.finalScore.toFixed(2) }}</span>
            <UBadge :color="letterColor(row.original.gradeLetter)" variant="subtle" size="sm">
              {{ row.original.gradeLetter }}
            </UBadge>
          </div>
          <span v-else class="text-xs text-gray-400">—</span>
        </template>
      </UTable>
    </UCard>

    <!-- ── Modal Thêm / Sửa điểm — mọi thông tin đã auto-fill sẵn ─────────── -->
    <UModal v-model:open="isGradeModalOpen" :title="editingGrade ? 'Chỉnh sửa điểm' : 'Thêm điểm'" @close="closeGradeModal">
      <template #body>
        <form class="space-y-4" @submit.prevent="submitGrade">
          <!-- Thông tin auto-fill: sinh viên + loại điểm — chỉ hiển thị, không sửa -->
          <div class="rounded-lg bg-gray-50 border border-gray-100 p-3 space-y-1">
            <p class="text-sm font-medium text-gray-900">{{ modalContext?.studentFullName }}</p>
            <p class="text-xs text-gray-500 font-mono">{{ modalContext?.studentCode }}</p>
            <UBadge color="info" variant="soft" size="sm" class="mt-1">
              {{ modalContext ? GradeTypeLabel[modalContext.gradeType] : '' }}
            </UBadge>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Điểm" name="score" required>
              <UInput v-model.number="gradeForm.score" type="number" step="0.1" min="0" class="w-full" />
            </UFormField>
            <UFormField label="Điểm tối đa" name="maxScore" required>
              <UInput
                v-model.number="gradeForm.maxScore"
                type="number"
                step="0.1"
                min="1"
                class="w-full"
                :disabled="!!editingGrade"
              />
            </UFormField>
          </div>

          <UFormField label="Trọng số" name="weight" required>
            <UInput
              v-model.number="gradeForm.weight"
              type="number"
              step="0.1"
              min="0"
              class="w-full"
              :disabled="!!editingGrade"
            />
          </UFormField>

          <UFormField label="Ghi chú" name="note">
            <UTextarea v-model="gradeForm.note" placeholder="Ghi chú (không bắt buộc)" class="w-full" />
          </UFormField>

          <div class="flex justify-between items-center pt-2 border-t border-gray-100">
            <UButton
              v-if="editingGrade"
              type="button"
              color="error"
              variant="ghost"
              icon="i-heroicons-trash"
              @click="removeCurrentGrade"
            >
              Xóa điểm
            </UButton>
            <div v-else />

            <div class="flex gap-2">
              <UButton color="neutral" variant="outline" type="button" @click="closeGradeModal"> Hủy </UButton>
              <UButton type="submit" color="error" :loading="isSubmitting">
                {{ editingGrade ? 'Lưu thay đổi' : 'Thêm điểm' }}
              </UButton>
            </div>
          </div>
        </form>
      </template>
    </UModal>

    <!-- ── Modal xác nhận xóa điểm ─────────────────────────────────────────── -->
    <UModal v-model:open="isConfirmDeleteOpen" title="Xác nhận xóa điểm" @close="closeConfirmDeleteGrade">
      <template #body>
        <div class="space-y-4">
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
              <UIcon name="i-heroicons-exclamation-triangle" class="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p class="text-sm text-gray-700">Bạn có chắc muốn xóa điểm này không?</p>
              <p class="text-xs text-gray-500 mt-1">Hành động này không thể hoàn tác.</p>
            </div>
          </div>
          <div class="flex justify-end gap-2 pt-2 border-t border-gray-100">
            <UButton color="neutral" variant="outline" @click="closeConfirmDeleteGrade"> Hủy </UButton>
            <UButton color="error" :loading="isSubmitting" icon="i-heroicons-trash" @click="confirmDeleteGrade">
              Xóa
            </UButton>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, h } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGradeManagement, type StudentGradeRow } from '@/composables/grade/useGradeManagement'
import { GradeType, GradeTypeLabel } from '@/types/grade'
import type { GradeResponse } from '@/types/grade'
import type { TableColumn } from '@nuxt/ui'
import { defineComponent, type PropType } from 'vue'

const route = useRoute()
const router = useRouter()

const classId = computed(() => route.params.classId as string)
const classCode = computed(() => (route.query.classCode as string) || classId.value)

const {
  rows,
  isLoading,
  isSubmitting,
  syncingEnrollmentId,
  isGradeModalOpen,
  editingGrade,
  modalContext,
  gradeForm,
  openGradeModal,
  closeGradeModal,
  submitGrade,
  isConfirmDeleteOpen,
  openConfirmDeleteGrade,
  closeConfirmDeleteGrade,
  confirmDeleteGrade,
  syncAttendance,
  fetchAll,
} = useGradeManagement()

function removeCurrentGrade() {
  if (!editingGrade.value) return
  const g = editingGrade.value
  closeGradeModal()
  openConfirmDeleteGrade(g)
}

function letterColor(letter?: string): 'success' | 'info' | 'warning' | 'error' | 'neutral' {
  if (!letter) return 'neutral'
  if (['A', 'A+'].includes(letter)) return 'success'
  if (['B', 'B+'].includes(letter)) return 'info'
  if (['C', 'C+', 'D', 'D+'].includes(letter)) return 'warning'
  return 'error'
}

// ── Ô hiển thị điểm ─────────────────────────────────────────────────────
// - Chưa có điểm: hiện nút "+ Thêm" (bấm để mở modal thêm điểm)
// - Đã có điểm: hiện điểm dạng text (không bấm được) + 1 nút bút chì riêng
//   để mở modal chỉnh sửa. Tách bạch rõ giữa "xem" và "sửa".
const GradeCell = defineComponent({
  props: {
    grade: { type: Object as PropType<GradeResponse | undefined>, default: undefined },
    readonly: { type: Boolean, default: false },
  },
  emits: ['edit'],
  setup(props, { emit }) {
    return () => {
      // Chưa có điểm -> nút "+ Thêm"
      if (!props.grade) {
        return h(
          'button',
          {
            type: 'button',
            disabled: props.readonly,
            class: [
              'text-sm rounded px-2 py-1 transition-colors',
              props.readonly ? 'cursor-default' : 'hover:bg-red-50 cursor-pointer',
              'text-gray-400 border border-dashed border-gray-300',
            ],
            onClick: () => !props.readonly && emit('edit'),
          },
          '+ Thêm',
        )
      }

      // Đã có điểm -> hiện điểm (text) + nút sửa riêng (nếu không phải readonly)
      // Lưu ý: dùng SVG viết tay thay vì <UIcon> vì h('UIcon', ...) không tự
      // resolve ra component khi gọi trong render function thủ công — sẽ bị
      // render thành thẻ <uicon> lạ và không hiển thị gì.
      return h('div', { class: 'flex items-center gap-1.5' }, [
        h('span', { class: 'text-sm font-semibold text-gray-900' }, `${props.grade.score}/${props.grade.maxScore}`),
        !props.readonly &&
          h(
            'button',
            {
              type: 'button',
              class: 'text-gray-400 hover:text-red-600 transition-colors shrink-0',
              title: 'Chỉnh sửa điểm',
              onClick: () => emit('edit'),
            },
            [
              h(
                'svg',
                {
                  xmlns: 'http://www.w3.org/2000/svg',
                  viewBox: '0 0 24 24',
                  fill: 'none',
                  stroke: 'currentColor',
                  'stroke-width': '2',
                  'stroke-linecap': 'round',
                  'stroke-linejoin': 'round',
                  class: 'w-4 h-4',
                },
                [
                  h('path', {
                    d: 'M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z',
                  }),
                  h('path', { d: 'M15.75 5.25l3 3' }),
                ],
              ),
            ],
          ),
      ])
    }
  },
})

const columns: TableColumn<StudentGradeRow>[] = [
  { accessorKey: 'studentCode', header: 'Mã SV' },
  { accessorKey: 'studentFullName', header: 'Họ tên' },
  { id: 'attendance', header: 'Chuyên cần' },
  { id: 'midterm', header: 'Giữa kỳ' },
  { id: 'final', header: 'Cuối kỳ' },
  { id: 'assignment', header: 'Bài tập' },
  { id: 'final-summary', header: 'Tổng kết' },
]

onMounted(() => fetchAll(classId.value))
</script>
