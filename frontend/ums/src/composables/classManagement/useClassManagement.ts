import { ref, computed } from 'vue'
import { z } from 'zod'
import { classManagementService } from '@/services/classManagementService'
import type { ClassResponse, CreateClassRequest, UpdateClassRequest } from '@/types/class'
import { getErrorMessage } from '@/utils/getErrorMessage'

// ─────────────────────────────────────────────────────────────────────────────
// Schema
// ─────────────────────────────────────────────────────────────────────────────

export const classSchema = z
  .object({
    code: z
      .string()
      .min(1, 'Mã lớp không được để trống.')
      .max(30, 'Mã lớp tối đa 30 ký tự.'),

    subjectId: z.string().min(1, 'SubjectId không hợp lệ.'),

    teacherId: z.string().min(1, 'TeacherId không hợp lệ.'),

    schoolYear: z
      .string()
      .min(1, 'Năm học không được để trống.')
      .regex(/^\d{4}-\d{4}$/, 'Năm học phải có định dạng YYYY-YYYY.'),

    semester: z
      .number()
      .int()
      .min(1, 'Học kỳ chỉ từ 1 đến 3.')
      .max(3, 'Học kỳ chỉ từ 1 đến 3.'),

    startDate: z.string().min(1, 'Ngày bắt đầu không được để trống.'),

    endDate: z.string().min(1, 'Ngày kết thúc không được để trống.'),

    maxStudents: z
      .number()
      .int()
      .gt(0, 'Sĩ số tối đa phải lớn hơn 0.'),
  })
  .refine((data) => data.startDate < data.endDate, {
    message: 'Ngày bắt đầu phải trước ngày kết thúc.',
    path: ['startDate'],
  })

export type ClassFormData = z.infer<typeof classSchema>

// ─────────────────────────────────────────────────────────────────────────────
// Composable
// ─────────────────────────────────────────────────────────────────────────────

export function useClassManagement() {
  const toast = useToast()

  // ── State ──────────────────────────────────────────────────────────────────
  const classList      = ref<ClassResponse[]>([])
  const isLoading      = ref(false)
  const isSubmitting   = ref(false)
  const isModalOpen    = ref(false)
  const isDeleteOpen   = ref(false)
  const editingClass   = ref<ClassResponse | null>(null)
  const deletingClass  = ref<ClassResponse | null>(null)
  const searchQuery    = ref('')
  const filterSemester = ref<number | null>(null)
  const filterStatus   = ref<string | null>(null)
  const togglingId     = ref<string | null>(null)

  // ── Computed ───────────────────────────────────────────────────────────────
  const isEditing = computed(() => editingClass.value !== null)

  const filteredList = computed(() => {
    let list = classList.value

    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase()
      list = list.filter(
        (c) =>
          c.code.toLowerCase().includes(q) ||
          c.subjectName.toLowerCase().includes(q) ||
          c.teacherName.toLowerCase().includes(q),
      )
    }

    if (filterSemester.value !== null) {
      list = list.filter((c) => c.semester === filterSemester.value)
    }

    if (filterStatus.value !== null) {
      list = list.filter((c) => c.status === filterStatus.value)
    }

    return list
  })

  // ── Form factory ───────────────────────────────────────────────────────────
  const emptyForm = (): ClassFormData => ({
    code: '',
    subjectId: '',
    teacherId: '',
    schoolYear: '',
    semester: 1,
    startDate: '',
    endDate: '',
    maxStudents: 40,
  })

  const formData = ref<ClassFormData>(emptyForm())

  // ── Actions ────────────────────────────────────────────────────────────────
  async function fetchAll() {
    isLoading.value = true
    try {
      classList.value = await classManagementService.getAllClasses()
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
        const payload: UpdateClassRequest = { ...formData.value }
        const updated = await classManagementService.updateClass(editingClass.value!.id, payload)
        const idx = classList.value.findIndex((c) => c.id === updated.id)
        if (idx !== -1) classList.value[idx] = updated
        toast.add({ title: 'Cập nhật thành công', description: `Đã cập nhật lớp ${updated.code}`, color: 'success' })
      } else {
        const payload: CreateClassRequest = { ...formData.value }
        const created = await classManagementService.createClass(payload)
        classList.value.unshift(created)
        toast.add({ title: 'Tạo thành công', description: `Đã tạo lớp ${created.code}`, color: 'success' })
      }
      closeModal()
    } catch (err) {
      toast.add({ title: isEditing.value ? 'Lỗi cập nhật' : 'Lỗi tạo mới', description: getErrorMessage(err), color: 'error' })
    } finally {
      isSubmitting.value = false
    }
  }

  async function confirmDelete() {
    if (!deletingClass.value) return
    isSubmitting.value = true
    try {
      await classManagementService.deleteClass(deletingClass.value.id)
      classList.value = classList.value.filter((c) => c.id !== deletingClass.value!.id)
      toast.add({ title: 'Xóa thành công', description: `Đã xóa lớp ${deletingClass.value.code}`, color: 'success' })
      closeDeleteModal()
    } catch (err) {
      toast.add({ title: 'Lỗi xóa', description: getErrorMessage(err), color: 'error' })
    } finally {
      isSubmitting.value = false
    }
  }

  async function toggleStatus(cls: ClassResponse) {
    try {
      const isActive = cls.status !== 'Active'
      await classManagementService.toggleClassStatus(cls.id, isActive)
      const idx = classList.value.findIndex((c) => c.id === cls.id)
      if (idx !== -1) classList.value[idx] = { ...classList.value[idx], status: isActive ? 'Active' : 'Inactive' } as ClassResponse
      toast.add({
        title: 'Cập nhật trạng thái',
        description: `Lớp ${cls.code} đã được ${isActive ? 'kích hoạt' : 'vô hiệu hóa'}`,
        color: 'success',
      })
    } catch (err) {
      toast.add({ 
        title: 'Lỗi cập nhật trạng thái',
        description: getErrorMessage(err), 
        color: 'error' })
    }
  }

  // ── Modal helpers ──────────────────────────────────────────────────────────
  function openCreate() {
    editingClass.value = null
    formData.value = emptyForm()
    isModalOpen.value = true
  }

  function openEdit(cls: ClassResponse) {
    editingClass.value = cls
    formData.value = {
      code: cls.code,
      subjectId: cls.subjectId,
      teacherId: cls.teacherId,
      schoolYear: cls.schoolYear,
      semester: cls.semester,
      startDate: cls.startDate.substring(0, 10),
      endDate: cls.endDate.substring(0, 10),
      maxStudents: cls.maxStudents,
    }
    isModalOpen.value = true
  }

  function openDelete(cls: ClassResponse) {
    deletingClass.value = cls
    isDeleteOpen.value = true
  }

  function closeModal() {
    isModalOpen.value = false
    editingClass.value = null
    formData.value = emptyForm()
  }

  function closeDeleteModal() {
    isDeleteOpen.value = false
    deletingClass.value = null
  }

  return {
    // State
    classList,
    isLoading,
    isSubmitting,
    isModalOpen,
    isDeleteOpen,
    editingClass,
    deletingClass,
    searchQuery,
    filterSemester,
    filterStatus,
    togglingId,
    formData,
    // Computed
    isEditing,
    filteredList,
    // Schema
    classSchema,
    // Actions
    fetchAll,
    submitForm,
    confirmDelete,
    toggleStatus,
    // Modal helpers
    openCreate,
    openEdit,
    openDelete,
    closeModal,
    closeDeleteModal,
  }
}