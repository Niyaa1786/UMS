import { ref, computed } from 'vue'
import { z } from 'zod'
import { staffService } from '@/services/staffService'
import type { Department, Gender } from '@/types/staff'
import type { StaffResponse, CreateStaffRequest, UpdateStaffRequest } from '@/types/staff'
import { getErrorMessage } from '@/utils/getErrorMessage'

// ─────────────────────────────────────────────────────────────────────────────
// Validation Schema (dùng cho cả create và update)
// ─────────────────────────────────────────────────────────────────────────────
export const staffSchema = z.object({
  fullName: z.string().min(2, 'Họ tên phải có ít nhất 2 ký tự').max(100, 'Họ tên không được quá 100 ký tự'),

  email: z.string().min(1, 'Email không được để trống').email('Email không hợp lệ'),

  phone: z
    .string()
    .min(1, 'Số điện thoại không được để trống')
    .regex(/^(0|\+84)[0-9]{9}$/, 'Số điện thoại không hợp lệ (VD: 0912345678)'),

  address: z.string().min(5, 'Địa chỉ phải có ít nhất 5 ký tự').max(200, 'Địa chỉ không được quá 200 ký tự'),

  department: z.enum(['HumanResources', 'TestingAndAssessment', 'AcademicAffairs', 'StudentServices'], {
    message: 'Vui lòng chọn phòng ban',
  }),

  gender: z.enum(['Unknown', 'Male', 'Female', 'Other'], { message: 'Vui lòng chọn giới tính' }),

  dateOfBirth: z
    .string()
    .min(1, 'Ngày sinh không được để trống')
    .refine((val) => {
      const date = new Date(val)
      if (isNaN(date.getTime())) return false
      const age = new Date().getFullYear() - date.getFullYear()
      return age >= 18
    }, 'Tuổi nhân viên phải trên 18'),
})

export type StaffFormData = z.infer<typeof staffSchema>

// ─────────────────────────────────────────────────────────────────────────────
// Composable
// ─────────────────────────────────────────────────────────────────────────────
export function useStaffManagement() {
  const toast = useToast()

  // ── State ────────────────────────────────────────────────────────────────
  const staffList = ref<StaffResponse[]>([])
  const isLoading = ref(false)
  const isSubmitting = ref(false)
  const isModalOpen = ref(false)
  const isDeleteOpen = ref(false)
  const editingStaff = ref<StaffResponse | null>(null)
  const deletingStaff = ref<StaffResponse | null>(null)
  const searchQuery = ref('')
  const filterDept = ref<Department | null>(null)
  const filterStatus = ref<boolean | null>(null)

  // ── Computed ─────────────────────────────────────────────────────────────
  const isEditing = computed(() => editingStaff.value !== null)

  const filteredList = computed(() => {
    let list = staffList.value

    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase()
      list = list.filter(
        (s) =>
          s.fullName.toLowerCase().includes(q) || s.staffCode.toLowerCase().includes(q) || s.email.toLowerCase().includes(q),
      )
    }

    if (filterDept.value !== null) {
      list = list.filter((s) => s.department === filterDept.value)
    }

    if (filterStatus.value !== null) {
      list = list.filter((s) => s.isActive === filterStatus.value)
    }

    return list
  })

  // ── Initial form values ──────────────────────────────────────────────────
  const emptyForm = (): StaffFormData => ({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    department: 'HumanResources',
    gender: 'Unknown',
    dateOfBirth: '',
  })

  const formData = ref<StaffFormData>(emptyForm())

  // ── CRUD Actions ─────────────────────────────────────────────────────────

  async function fetchAll() {
    isLoading.value = true
    try {
      staffList.value = await staffService.getAllStaffs()
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
        const payload: UpdateStaffRequest = { ...formData.value }
        const updated = await staffService.updateStaff(editingStaff.value!.id, payload)

        const idx = staffList.value.findIndex((s) => s.id === updated.id)
        if (idx !== -1) staffList.value[idx] = updated

        toast.add({
          title: 'Cập nhật thành công',
          description: `Đã cập nhật nhân viên ${updated.fullName}`,
          color: 'success',
        })
      } else {
        // CREATE
        const payload: CreateStaffRequest = { ...formData.value }
        const created = await staffService.createStaff(payload)

        staffList.value.unshift(created)

        toast.add({
          title: 'Tạo thành công',
          description: `Đã tạo nhân viên ${created.fullName} (${created.staffCode})`,
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
    if (!deletingStaff.value) return
    isSubmitting.value = true
    try {
      await staffService.removeStaff(deletingStaff.value.id)
      staffList.value = staffList.value.filter((s) => s.id !== deletingStaff.value!.id)

      toast.add({
        title: 'Xóa thành công',
        description: `Đã xóa nhân viên ${deletingStaff.value.fullName}`,
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

  async function toggleStatus(staff: StaffResponse) {
    try {
      await staffService.toggleStaffStatus(staff.staffCode, !staff.isActive)

      const idx = staffList.value.findIndex((s) => s.id === staff.id)
      if (idx !== -1) staffList.value[idx] = { ...staffList.value[idx], isActive: !staff.isActive } as StaffResponse

      toast.add({
        title: 'Cập nhật trạng thái',
        description: `Tài khoản ${staff.fullName} đã được ${!staff.isActive ? 'kích hoạt' : 'vô hiệu hóa'}`,
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
    editingStaff.value = null
    formData.value = emptyForm()
    isModalOpen.value = true
  }

  function openEdit(staff: StaffResponse) {
    editingStaff.value = staff
    formData.value = {
      fullName: staff.fullName,
      email: staff.email,
      phone: staff.phone,
      address: staff.address,
      department: staff.department,
      gender: staff.gender,
      dateOfBirth: staff.dateOfBirth.substring(0, 10), // "YYYY-MM-DD"
    }
    isModalOpen.value = true
  }

  function openDelete(staff: StaffResponse) {
    deletingStaff.value = staff
    isDeleteOpen.value = true
  }

  function closeModal() {
    isModalOpen.value = false
    editingStaff.value = null
    formData.value = emptyForm()
  }

  function closeDeleteModal() {
    isDeleteOpen.value = false
    deletingStaff.value = null
  }

  return {
    // State
    staffList,
    isLoading,
    isSubmitting,
    isModalOpen,
    isDeleteOpen,
    editingStaff,
    deletingStaff,
    searchQuery,
    filterDept,
    filterStatus,
    formData,
    // Computed
    isEditing,
    filteredList,
    // Schema
    staffSchema,
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
