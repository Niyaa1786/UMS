import { ref, computed } from 'vue'
import { z } from 'zod'
import { classManagementService } from '@/services/classManagementService'
import type { SubjectResponse } from '@/types/subject'
import type { CreateSubjectRequest, UpdateSubjectRequest } from '@/types/subject'
import { getErrorMessage } from '@/utils/getErrorMessage'

// ─────────────────────────────────────────────────────────────────────────────
// Schemas
// ─────────────────────────────────────────────────────────────────────────────

export const createSubjectSchema = z.object({
  code: z
    .string()
    .min(1, 'Mã môn học không được để trống.')
    .max(20, 'Mã môn học tối đa 20 ký tự.'),

  name: z
    .string()
    .min(1, 'Tên môn học không được để trống.')
    .max(100, 'Tên môn học tối đa 100 ký tự.'),

  credits: z
    .number()
    .int()
    .gt(0, 'Số tín chỉ phải lớn hơn 0.'),

  description: z.string().max(500, 'Mô tả tối đa 500 ký tự.').optional(),
})

export const updateSubjectSchema = z.object({
  name: z
    .string()
    .min(1, 'Tên môn học không được để trống.')
    .max(100, 'Tên môn học tối đa 100 ký tự.'),

  credits: z
    .number()
    .int()
    .gt(0, 'Số tín chỉ phải lớn hơn 0.'),

  description: z.string().max(500, 'Mô tả tối đa 500 ký tự.').optional(),
})

export type CreateSubjectFormData = z.infer<typeof createSubjectSchema>
export type UpdateSubjectFormData = z.infer<typeof updateSubjectSchema>

// ─────────────────────────────────────────────────────────────────────────────
// Composable
// ─────────────────────────────────────────────────────────────────────────────

export function useSubjectManagement() {
  const toast = useToast()

  // ── State ──────────────────────────────────────────────────────────────────
  const subjectList    = ref<SubjectResponse[]>([])
  const isLoading      = ref(false)
  const isSubmitting   = ref(false)
  const isModalOpen    = ref(false)
  const isDeleteOpen   = ref(false)
  const editingSubject  = ref<SubjectResponse | null>(null)
  const deletingSubject = ref<SubjectResponse | null>(null)
  const searchQuery    = ref('')

  // ── Computed ───────────────────────────────────────────────────────────────
  const isEditing = computed(() => editingSubject.value !== null)

  const filteredList = computed(() => {
    const q = searchQuery.value.toLowerCase()
    if (!q) return subjectList.value
    return subjectList.value.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.code.toLowerCase().includes(q),
    )
  })

  // ── Form factory ───────────────────────────────────────────────────────────
  const emptyForm = (): CreateSubjectFormData => ({
    code: '',
    name: '',
    credits: 3,
    description: '',
  })

  const formData = ref<CreateSubjectFormData>(emptyForm())

  // ── Actions ────────────────────────────────────────────────────────────────
  async function fetchAll() {
    isLoading.value = true
    try {
      subjectList.value = await classManagementService.getAllSubjects()
    } catch (err) {
      toast.add({ title: 'Lỗi tải dữ liệu', description: getErrorMessage(err), color: 'error' })
    } finally {
      isLoading.value = false
    }
  }

  async function submitForm() {
    isSubmitting.value = true
    try {
      if (isEditing.value) {
        const payload: UpdateSubjectRequest = {
          name: formData.value.name,
          credits: formData.value.credits,
          description: formData.value.description,
        }
        const updated = await classManagementService.updateSubject(editingSubject.value!.id, payload)
        const idx = subjectList.value.findIndex((s) => s.id === updated.id)
        if (idx !== -1) subjectList.value[idx] = updated
        toast.add({ title: 'Cập nhật thành công', description: `Đã cập nhật môn học ${updated.name}`, color: 'success' })
      } else {
        const payload: CreateSubjectRequest = { ...formData.value }
        const created = await classManagementService.createSubject(payload)
        subjectList.value.unshift(created)
        toast.add({ title: 'Tạo thành công', description: `Đã tạo môn học ${created.name} (${created.code})`, color: 'success' })
      }
      closeModal()
    } catch (err) {
      toast.add({ title: isEditing.value ? 'Lỗi cập nhật' : 'Lỗi tạo mới', description: getErrorMessage(err), color: 'error' })
    } finally {
      isSubmitting.value = false
    }
  }

  async function confirmDelete() {
    if (!deletingSubject.value) return
    isSubmitting.value = true
    try {
      await classManagementService.deleteSubject(deletingSubject.value.id)
      subjectList.value = subjectList.value.filter((s) => s.id !== deletingSubject.value!.id)
      toast.add({ title: 'Xóa thành công', description: `Đã xóa môn học ${deletingSubject.value.name}`, color: 'success' })
      closeDeleteModal()
    } catch (err) {
      toast.add({ title: 'Lỗi xóa', description: getErrorMessage(err), color: 'error' })
    } finally {
      isSubmitting.value = false
    }
  }

  // ── Modal helpers ──────────────────────────────────────────────────────────
  function openCreate() {
    editingSubject.value = null
    formData.value = emptyForm()
    isModalOpen.value = true
  }

  function openEdit(subject: SubjectResponse) {
    editingSubject.value = subject
    formData.value = {
      code: subject.code,
      name: subject.name,
      credits: subject.credits,
      description: subject.description ?? '',
    }
    isModalOpen.value = true
  }

  function openDelete(subject: SubjectResponse) {
    deletingSubject.value = subject
    isDeleteOpen.value = true
  }

  function closeModal() {
    isModalOpen.value = false
    editingSubject.value = null
    formData.value = emptyForm()
  }

  function closeDeleteModal() {
    isDeleteOpen.value = false
    deletingSubject.value = null
  }

  return {
    // State
    subjectList,
    isLoading,
    isSubmitting,
    isModalOpen,
    isDeleteOpen,
    editingSubject,
    deletingSubject,
    searchQuery,
    formData,
    // Computed
    isEditing,
    filteredList,
    // Schemas
    createSubjectSchema,
    updateSubjectSchema,
    // Actions
    fetchAll,
    submitForm,
    confirmDelete,
    // Modal helpers
    openCreate,
    openEdit,
    openDelete,
    closeModal,
    closeDeleteModal,
  }
}