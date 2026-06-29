import { ref, computed } from 'vue'
import { z } from 'zod'
import { classManagementService } from '@/services/classManagementService'
import type { ClassScheduleResponse, CreateClassScheduleRequest, UpdateClassScheduleRequest } from '@/types/classSchedule'
import type { DayOfWeek } from '@/types/classSchedule'
import { getErrorMessage } from '@/utils/getErrorMessage'

// ─────────────────────────────────────────────────────────────────────────────
// Schema
// ─────────────────────────────────────────────────────────────────────────────

export const scheduleSchema = z.object({
  classId: z.string().min(1, 'ClassId không hợp lệ.'),
  dayOfWeek: z.number().int().min(0).max(7),
  startTime: z.string().min(1, 'Thời gian bắt đầu không được để trống.'),
  endTime: z.string().min(1, 'Thời gian kết thúc không được để trống.'),
  room: z.string().min(1, 'Phòng học không được để trống.'),
})

export type ScheduleFormData = z.infer<typeof scheduleSchema>

// ─────────────────────────────────────────────────────────────────────────────
// Composable
// ─────────────────────────────────────────────────────────────────────────────

export function useClassScheduleManagement() {
  const toast = useToast()

  // ── State ──────────────────────────────────────────────────────────────────
  const scheduleList = ref<ClassScheduleResponse[]>([])
  const isLoading = ref(false)
  const isSubmitting = ref(false)
  const isFormOpen = ref(false)
  const editingSchedule = ref<ClassScheduleResponse | null>(null)
  const currentClassId = ref<string | null>(null)

  // ── Computed ───────────────────────────────────────────────────────────────
  const isEditing = computed(() => editingSchedule.value !== null)

  // ── Form factory ───────────────────────────────────────────────────────────
  const emptyForm = (): ScheduleFormData => ({
    classId: currentClassId.value ?? '',
    dayOfWeek: 1,
    startTime: '07:00',
    endTime: '09:00',
    room: '',
  })

  const formData = ref<ScheduleFormData>(emptyForm())

  // ── Actions ────────────────────────────────────────────────────────────────
  async function fetchByClass(classId: string) {
    currentClassId.value = classId
    isLoading.value = true
    try {
      scheduleList.value = await classManagementService.getSchedulesByClass(classId)
    } catch (err) {
      toast.add({ title: 'Lỗi tải lịch học', description: getErrorMessage(err), color: 'error' })
    } finally {
      isLoading.value = false
    }
  }

  async function submitForm() {
    isSubmitting.value = true
    try {
      const toTimeSpan = (t: string) => (t.length === 5 ? `${t}:00` : t)

      if (isEditing.value) {
        const payload: UpdateClassScheduleRequest = {
          dayOfWeek: formData.value.dayOfWeek as unknown as DayOfWeek,
          startTime: toTimeSpan(formData.value.startTime),
          endTime: toTimeSpan(formData.value.endTime),
          room: formData.value.room,
        }
        const updated = await classManagementService.updateSchedule(editingSchedule.value!.id, payload)
        const idx = scheduleList.value.findIndex((s) => s.id === updated.id)
        if (idx !== -1) scheduleList.value[idx] = updated
        toast.add({ title: 'Cập nhật thành công', description: 'Đã cập nhật lịch học', color: 'success' })
      } else {
        const payload: CreateClassScheduleRequest = {
          classId: currentClassId.value!,
          dayOfWeek: formData.value.dayOfWeek as unknown as DayOfWeek,
          startTime: toTimeSpan(formData.value.startTime),
          endTime: toTimeSpan(formData.value.endTime),
          room: formData.value.room,
        }
        const created = await classManagementService.createSchedule(payload)
        scheduleList.value.push(created)
        toast.add({ title: 'Thêm thành công', description: 'Đã thêm lịch học mới', color: 'success' })
      }

      closeForm()
    } catch (err) {
      toast.add({
        title: isEditing.value ? 'Lỗi cập nhật' : 'Lỗi thêm lịch',
        description: getErrorMessage(err),
        color: 'error',
      })
    } finally {
      isSubmitting.value = false
    }
  }

  async function removeSchedule(schedule: ClassScheduleResponse) {
    try {
      await classManagementService.deleteSchedule(schedule.id)
      scheduleList.value = scheduleList.value.filter((s) => s.id !== schedule.id)
      toast.add({ title: 'Xóa thành công', description: 'Đã xóa lịch học', color: 'success' })
    } catch (err) {
      toast.add({ title: 'Lỗi xóa lịch', description: getErrorMessage(err), color: 'error' })
    }
  }

  // ── Form helpers ───────────────────────────────────────────────────────────
  function openCreate() {
    editingSchedule.value = null
    formData.value = emptyForm()
    isFormOpen.value = true
  }

  function openEdit(schedule: ClassScheduleResponse) {
    editingSchedule.value = schedule
    formData.value = {
      classId: schedule.classId,
      dayOfWeek: Number(schedule.dayOfWeek),
      startTime: schedule.startTime.substring(0, 5),
      endTime: schedule.endTime.substring(0, 5),
      room: schedule.room,
    }
    isFormOpen.value = true
  }

  function closeForm() {
    isFormOpen.value = false
    editingSchedule.value = null
    formData.value = emptyForm()
  }

  return {
    // State
    scheduleList,
    isLoading,
    isSubmitting,
    isFormOpen,
    editingSchedule,
    currentClassId,
    formData,
    // Computed
    isEditing,
    // Schema
    scheduleSchema,
    // Actions
    fetchByClass,
    submitForm,
    removeSchedule,
    // Form helpers
    openCreate,
    openEdit,
    closeForm,
  }
}
