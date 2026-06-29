// src/composables/classManagement/useClassEnrollmentManagement.ts
import { ref } from 'vue'
import { classManagementService } from '@/services/classManagementService'
import { studentService } from '@/services/studentService'
import type { EnrollmentResponse, CreateEnrollmentRequest } from '@/types/enrollment'
import { getErrorMessage } from '@/utils/getErrorMessage'

export function useClassEnrollmentManagement() {
  const toast = useToast()

  const enrollments = ref<EnrollmentResponse[]>([])
  const isLoading = ref(false)
  const isSubmitting = ref(false)
  const classId = ref<string | null>(null)

  const isAddModalOpen = ref(false)
  const studentCode = ref('')

  // Modal xác nhận xóa
  const isConfirmDeleteOpen = ref(false)
  const deletingEnrollmentId = ref<string | null>(null)

  async function fetchEnrollments(classIdParam: string) {
    classId.value = classIdParam
    isLoading.value = true
    try {
      enrollments.value = await classManagementService.getEnrollmentsByClass(classIdParam)
    } catch (err) {
      toast.add({ title: 'Lỗi tải danh sách đăng ký', description: getErrorMessage(err), color: 'error' })
    } finally {
      isLoading.value = false
    }
  }

  async function addEnrollmentByStudentCode() {
    if (!classId.value || !studentCode.value.trim()) {
      toast.add({ title: 'Lỗi', description: 'Vui lòng nhập mã sinh viên.', color: 'error' })
      return
    }

    isSubmitting.value = true
    try {
      const allStudents = await studentService.getAllStudents()
      const student = allStudents.find((s) => s.studentCode === studentCode.value.trim())
      if (!student) {
        toast.add({ title: 'Lỗi', description: 'Không tìm thấy sinh viên với mã này.', color: 'error' })
        return
      }

      const payload: CreateEnrollmentRequest = {
        classId: classId.value,
        studentId: student.id,
      }
      const newEnrollment = await classManagementService.createEnrollment(payload)
      enrollments.value.push(newEnrollment)
      toast.add({
        title: 'Thêm thành công',
        description: `Đã đăng ký sinh viên ${student.fullName} vào lớp.`,
        color: 'success',
      })
      closeAddModal()
    } catch (err) {
      toast.add({ title: 'Lỗi thêm đăng ký', description: getErrorMessage(err), color: 'error' })
    } finally {
      isSubmitting.value = false
    }
  }

  async function confirmDeleteEnrollment() {
    if (!deletingEnrollmentId.value) return
    isSubmitting.value = true
    try {
      await classManagementService.deleteEnrollment(deletingEnrollmentId.value)
      enrollments.value = enrollments.value.filter((e) => e.id !== deletingEnrollmentId.value)
      toast.add({ title: 'Xóa thành công', description: 'Đã hủy đăng ký sinh viên.', color: 'success' })
      closeConfirmDeleteModal()
    } catch (err) {
      toast.add({ title: 'Lỗi xóa đăng ký', description: getErrorMessage(err), color: 'error' })
    } finally {
      isSubmitting.value = false
    }
  }

  function openConfirmDeleteModal(enrollmentId: string) {
    deletingEnrollmentId.value = enrollmentId
    isConfirmDeleteOpen.value = true
  }

  function closeConfirmDeleteModal() {
    isConfirmDeleteOpen.value = false
    deletingEnrollmentId.value = null
  }

  function openAddModal() {
    studentCode.value = ''
    isAddModalOpen.value = true
  }

  function closeAddModal() {
    isAddModalOpen.value = false
    studentCode.value = ''
  }

  async function init(classIdParam: string) {
    await fetchEnrollments(classIdParam)
  }

  return {
    enrollments,
    isLoading,
    isSubmitting,
    isAddModalOpen,
    isConfirmDeleteOpen,
    studentCode,
    deletingEnrollmentId,
    fetchEnrollments,
    addEnrollmentByStudentCode,
    confirmDeleteEnrollment,
    openConfirmDeleteModal,
    closeConfirmDeleteModal,
    openAddModal,
    closeAddModal,
    init,
  }
}
