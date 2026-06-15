import { ref, computed } from 'vue'
import { z } from 'zod'
import { teacherService } from '@/services/teacherService'
import type { Faculty, Gender } from '@/types/teacher'
import type { TeacherResponse, CreateTeacherRequest, UpdateTeacherRequest } from '@/types/teacher'
import { getErrorMessage } from '@/utils/getErrorMessage'

// ─────────────────────────────────────────────────────────────────────────────
// Validation Schema
// ─────────────────────────────────────────────────────────────────────────────
export const teacherSchema = z.object({
  fullName: z.string().min(2, 'Họ tên phải có ít nhất 2 ký tự').max(100, 'Họ tên không được quá 100 ký tự'),

  email: z.string().min(1, 'Email không được để trống').email('Email không hợp lệ'),

  phone: z
    .string()
    .min(1, 'Số điện thoại không được để trống')
    .regex(/^(0|\+84)[0-9]{9}$/, 'Số điện thoại không hợp lệ (VD: 0912345678)'),

  address: z.string().min(5, 'Địa chỉ phải có ít nhất 5 ký tự').max(200, 'Địa chỉ không được quá 200 ký tự'),

  faculty: z.enum(['Engineering', 'Design', 'Management', 'Healthcare', 'Languages'], { message: 'Vui lòng chọn khoa' }),

  gender: z.enum(['Unknown', 'Male', 'Female', 'Other'], { message: 'Vui lòng chọn giới tính' }),

  dateOfBirth: z
    .string()
    .min(1, 'Ngày sinh không được để trống')
    .refine((val) => {
      const date = new Date(val)
      if (isNaN(date.getTime())) return false
      const age = new Date().getFullYear() - date.getFullYear()
      return age >= 22
    }, 'Tuổi giảng viên phải từ 22 trở lên'),
})

export type TeacherFormData = z.infer<typeof teacherSchema>

function emptyForm(): TeacherFormData {
  return {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    faculty: 'Design',
    gender: 'Unknown',
    dateOfBirth: '',
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Composable
// ─────────────────────────────────────────────────────────────────────────────
export function useTeacherManagement() {
  const toast = useToast()

  // ── State ────────────────────────────────────────────────────────────────
  const teacherList = ref<TeacherResponse[]>([])
  const isLoading = ref(false)
  const isSubmitting = ref(false)
  const isModalOpen = ref(false)
  const isDeleteOpen = ref(false)
  const editingTeacher = ref<TeacherResponse | null>(null)
  const deletingTeacher = ref<TeacherResponse | null>(null)
  const searchQuery = ref('')
  const filterFaculty = ref<Faculty | null>(null)
  const filterStatus = ref<boolean | null>(null)
  const formData = ref<TeacherFormData>(emptyForm())

  // ── Computed ─────────────────────────────────────────────────────────────
  const isEditing = computed(() => editingTeacher.value !== null)

  const filteredList = computed(() => {
    let list = teacherList.value

    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase()
      list = list.filter(
        (t) =>
          t.fullName.toLowerCase().includes(q) ||
          t.teacherCode.toLowerCase().includes(q) ||
          t.email.toLowerCase().includes(q) ||
          t.faculty.toLowerCase().includes(q),
      )
    }

    if (filterFaculty.value) {
      list = list.filter((t) => t.faculty === filterFaculty.value)
    }

    if (filterStatus.value !== null) {
      list = list.filter((t) => t.isActive === filterStatus.value)
    }

    return list
  })

  // ── CRUD Actions ─────────────────────────────────────────────────────────

  async function fetchAll() {
    isLoading.value = true
    try {
      teacherList.value = await teacherService.getAllTeachers()
    } catch (err) {
      toast.add({
        title: 'Lỗi tải dữ liệu',
        description: getErrorMessage(err),
        color: 'error',
      })
    } finally {
      isLoading.value = false
    }
  }

  async function submitForm() {
    isSubmitting.value = true
    try {
      if (isEditing.value) {
        // UPDATE
        const payload: UpdateTeacherRequest = { ...formData.value } as UpdateTeacherRequest
        const updated = await teacherService.updateTeacher(editingTeacher.value!.id, payload)

        const idx = teacherList.value.findIndex((t) => t.id === updated.id)
        if (idx !== -1) teacherList.value[idx] = updated

        toast.add({
          title: 'Cập nhật thành công',
          description: `Đã cập nhật giảng viên ${updated.fullName}`,
          color: 'success',
        })
      } else {
        // CREATE
        const payload: CreateTeacherRequest = { ...formData.value } as CreateTeacherRequest
        const created = await teacherService.createTeacher(payload)

        teacherList.value.unshift(created)

        toast.add({
          title: 'Tạo thành công',
          description: `Đã tạo giảng viên ${created.fullName} (${created.teacherCode})`,
          color: 'success',
        })
      }

      closeModal()
    } catch (err) {
      toast.add({
        title: isEditing.value ? 'Lỗi cập nhật' : 'Lỗi tạo mới',
        description: getErrorMessage(err),
        color: 'error',
      })
    } finally {
      isSubmitting.value = false
    }
  }

  async function confirmDelete() {
    if (!deletingTeacher.value) return
    isSubmitting.value = true
    try {
      await teacherService.removeTeacher(deletingTeacher.value.id)
      teacherList.value = teacherList.value.filter((t) => t.id !== deletingTeacher.value!.id)

      toast.add({
        title: 'Xóa thành công',
        description: `Đã xóa giảng viên ${deletingTeacher.value.fullName}`,
        color: 'success',
      })

      closeDeleteModal()
    } catch (err) {
      toast.add({
        title: 'Lỗi xóa',
        description: getErrorMessage(err),
        color: 'error',
      })
    } finally {
      isSubmitting.value = false
    }
  }

  async function toggleStatus(teacher: TeacherResponse) {
    try {
      await teacherService.toggleTeacherStatus(teacher.teacherCode, !teacher.isActive)

      const idx = teacherList.value.findIndex((t) => t.id === teacher.id)
      if (idx !== -1) teacherList.value[idx] = { ...teacherList.value[idx], isActive: !teacher.isActive } as TeacherResponse

      toast.add({
        title: 'Cập nhật trạng thái',
        description: `Tài khoản ${teacher.fullName} đã được ${!teacher.isActive ? 'kích hoạt' : 'vô hiệu hóa'}`,
        color: 'success',
      })
    } catch (err) {
      toast.add({
        title: 'Lỗi cập nhật trạng thái',
        description: getErrorMessage(err),
        color: 'error',
      })
    }
  }

  // ── Modal helpers ────────────────────────────────────────────────────────

  function openCreate() {
    editingTeacher.value = null
    formData.value = emptyForm()
    isModalOpen.value = true
  }

  function openEdit(teacher: TeacherResponse) {
    editingTeacher.value = teacher
    formData.value = {
      fullName: teacher.fullName,
      email: teacher.email,
      phone: teacher.phone,
      address: teacher.address,
      faculty: teacher.faculty,
      gender: teacher.gender,
      dateOfBirth: teacher.dateOfBirth.substring(0, 10), // "YYYY-MM-DD"
    }
    isModalOpen.value = true
  }

  function openDelete(teacher: TeacherResponse) {
    deletingTeacher.value = teacher
    isDeleteOpen.value = true
  }

  function closeModal() {
    isModalOpen.value = false
    editingTeacher.value = null
    formData.value = emptyForm()
  }

  function closeDeleteModal() {
    isDeleteOpen.value = false
    deletingTeacher.value = null
  }

  return {
    // State
    teacherList,
    isLoading,
    isSubmitting,
    isModalOpen,
    isDeleteOpen,
    editingTeacher,
    deletingTeacher,
    searchQuery,
    filterFaculty,
    filterStatus,
    formData,
    // Computed
    isEditing,
    filteredList,
    // Schema
    teacherSchema,
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
