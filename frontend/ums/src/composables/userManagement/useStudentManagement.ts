import { ref, computed } from 'vue'
import { z } from 'zod'
import { studentService } from '@/services/studentService'
import type { Gender, MAJOR_OPTIONS } from '@/types/student'
import type { StudentResponse, CreateStudentRequest, UpdateStudentRequest } from '@/types/student'
import { getErrorMessage } from '@/utils/getErrorMessage'

// ─────────────────────────────────────────────────────────────────────────────
// Validation Schema
// ─────────────────────────────────────────────────────────────────────────────
export const studentSchema = z.object({
  fullName: z.string().min(2, 'Họ tên phải có ít nhất 2 ký tự').max(100, 'Họ tên không được quá 100 ký tự'),

  email: z.string().min(1, 'Email không được để trống').email('Email không hợp lệ'),

  phone: z
    .string()
    .min(1, 'Số điện thoại không được để trống')
    .regex(/^(0|\+84)[0-9]{9}$/, 'Số điện thoại không hợp lệ (VD: 0912345678)'),

  address: z.string().min(5, 'Địa chỉ phải có ít nhất 5 ký tự').max(200, 'Địa chỉ không được quá 200 ký tự'),

  major: z.string().min(1, 'Vui lòng chọn chuyên ngành'),

  gender: z.enum(['Unknown', 'Male', 'Female', 'Other'], { message: 'Vui lòng chọn giới tính' }),

  dateOfBirth: z
    .string()
    .min(1, 'Ngày sinh không được để trống')
    .refine((val) => {
      const date = new Date(val)
      if (isNaN(date.getTime())) return false
      const age = new Date().getFullYear() - date.getFullYear()
      return age >= 15
    }, 'Tuổi sinh viên phải trên 14'),
})

export type StudentFormData = z.infer<typeof studentSchema>

// ─────────────────────────────────────────────────────────────────────────────
// Composable
// ─────────────────────────────────────────────────────────────────────────────
export function useStudentManagement() {
  const toast = useToast()

  // ── State ────────────────────────────────────────────────────────────────
  const studentList = ref<StudentResponse[]>([])
  const isLoading = ref(false)
  const isSubmitting = ref(false)
  const isModalOpen = ref(false)
  const isDeleteOpen = ref(false)
  const editingStudent = ref<StudentResponse | null>(null)
  const deletingStudent = ref<StudentResponse | null>(null)
  const searchQuery = ref('')
  const filterMajor = ref<string | null>(null)
  const filterStatus = ref<boolean | null>(null)

  // ── Computed ─────────────────────────────────────────────────────────────
  const isEditing = computed(() => editingStudent.value !== null)

  const filteredList = computed(() => {
    let list = studentList.value

    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase()
      list = list.filter(
        (s) =>
          s.fullName.toLowerCase().includes(q) ||
          s.studentCode.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q) ||
          s.major.toLowerCase().includes(q),
      )
    }

    if (filterMajor.value) {
      list = list.filter((s) => s.major === filterMajor.value)
    }

    if (filterStatus.value !== null) {
      list = list.filter((s) => s.isActive === filterStatus.value)
    }

    return list
  })

  // ── Empty form factory ───────────────────────────────────────────────────
  const emptyForm = (): StudentFormData => ({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    major: '',
    gender: 'Unknown',
    dateOfBirth: '',
  })

  const formData = ref<StudentFormData>(emptyForm())

  // ── CRUD Actions ─────────────────────────────────────────────────────────

  async function fetchAll() {
    isLoading.value = true
    try {
      studentList.value = await studentService.getAllStudents()
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
        const payload: UpdateStudentRequest = { ...formData.value }
        const updated = await studentService.updateStudent(editingStudent.value!.id, payload)

        const idx = studentList.value.findIndex((s) => s.id === updated.id)
        if (idx !== -1) studentList.value[idx] = updated

        toast.add({
          title: 'Cập nhật thành công',
          description: `Đã cập nhật sinh viên ${updated.fullName}`,
          color: 'success',
        })
      } else {
        const payload: CreateStudentRequest = { ...formData.value }
        const created = await studentService.createStudent(payload)

        studentList.value.unshift(created)

        toast.add({
          title: 'Tạo thành công',
          description: `Đã tạo sinh viên ${created.fullName} (${created.studentCode})`,
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
    if (!deletingStudent.value) return
    isSubmitting.value = true
    try {
      await studentService.removeStudent(deletingStudent.value.id)
      studentList.value = studentList.value.filter((s) => s.id !== deletingStudent.value!.id)

      toast.add({
        title: 'Xóa thành công',
        description: `Đã xóa sinh viên ${deletingStudent.value.fullName}`,
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

  async function toggleStatus(student: StudentResponse) {
    try {
      await studentService.toggleStudentStatus(student.studentCode, !student.isActive)

      const idx = studentList.value.findIndex((s) => s.id === student.id)
      if (idx !== -1) {
        studentList.value[idx] = { ...studentList.value[idx], isActive: !student.isActive } as StudentResponse
      }

      toast.add({
        title: 'Cập nhật trạng thái',
        description: `Tài khoản ${student.fullName} đã được ${!student.isActive ? 'kích hoạt' : 'vô hiệu hóa'}`,
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
    editingStudent.value = null
    formData.value = emptyForm()
    isModalOpen.value = true
  }

  function openEdit(student: StudentResponse) {
    editingStudent.value = student
    formData.value = {
      fullName: student.fullName,
      email: student.email,
      phone: student.phone,
      address: student.address,
      major: student.major,
      gender: student.gender,
      dateOfBirth: student.dateOfBirth.substring(0, 10),
    }
    isModalOpen.value = true
  }

  function openDelete(student: StudentResponse) {
    deletingStudent.value = student
    isDeleteOpen.value = true
  }

  function closeModal() {
    isModalOpen.value = false
    editingStudent.value = null
    formData.value = emptyForm()
  }

  function closeDeleteModal() {
    isDeleteOpen.value = false
    deletingStudent.value = null
  }

  return {
    // State
    studentList,
    isLoading,
    isSubmitting,
    isModalOpen,
    isDeleteOpen,
    editingStudent,
    deletingStudent,
    searchQuery,
    filterMajor,
    filterStatus,
    formData,
    // Computed
    isEditing,
    filteredList,
    // Schema
    studentSchema,
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
