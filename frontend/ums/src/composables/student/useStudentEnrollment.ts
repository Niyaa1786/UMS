// src/composables/student/useStudentEnrollment.ts
import { ref, computed } from 'vue'
import { studentService } from '@/services/studentService'
import { classManagementService } from '@/services/classManagementService'
import type { StudentClassResponse } from '@/types/enrollment'
import type { ClassResponse } from '@/types/class'
import { getErrorMessage } from '@/utils/getErrorMessage'
import axiosClient from '@/api/axiosClient'

export function useStudentEnrollment() {
  const toast = useToast()

  const myClasses = ref<StudentClassResponse[]>([])
  const availableClasses = ref<ClassResponse[]>([])
  const isLoading = ref(false)
  const isActionLoading = ref(false)
  const searchQuery = ref('')
  const filterSemester = ref<number | null>(null)

  const filteredAvailable = computed(() => {
    let list = availableClasses.value
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase()
      list = list.filter((c) => c.code.toLowerCase().includes(q) || c.subjectName.toLowerCase().includes(q))
    }
    if (filterSemester.value !== null) {
      list = list.filter((c) => c.semester === filterSemester.value)
    }
    return list
  })

  const isRegistered = (classId: string) => myClasses.value.some((m) => m.classId === classId)

  async function fetchMyClasses() {
    isLoading.value = true
    try {
      myClasses.value = await studentService.getMyClasses()
    } catch (err) {
      toast.add({ title: 'Lỗi tải lớp học', description: getErrorMessage(err), color: 'error' })
    } finally {
      isLoading.value = false
    }
  }

  async function fetchAvailableClasses() {
    isLoading.value = true
    try {
      const all = await studentService.getAvailableClasses()
      availableClasses.value = all
    } catch (err) {
      toast.add({ title: 'Lỗi tải danh sách lớp', description: getErrorMessage(err), color: 'error' })
    } finally {
      isLoading.value = false
    }
  }

  async function registerForClass(classId: string) {
    if (isRegistered(classId)) {
      toast.add({ title: 'Đã đăng ký', description: 'Bạn đã đăng ký lớp này rồi.', color: 'warning' })
      return
    }
    isActionLoading.value = true
    try {
      await studentService.registerClass(classId)
      toast.add({ title: 'Đăng ký thành công', description: 'Bạn đã đăng ký lớp học.', color: 'success' })
      await Promise.all([fetchMyClasses(), fetchAvailableClasses()])
    } catch (err) {
      toast.add({ title: 'Lỗi đăng ký', description: getErrorMessage(err), color: 'error' })
    } finally {
      isActionLoading.value = false
    }
  }

  async function dropClass(classId: string) {
    isActionLoading.value = true
    try {
      await studentService.dropClass(classId)
      toast.add({ title: 'Hủy đăng ký thành công', description: 'Bạn đã hủy lớp học.', color: 'success' })
      await Promise.all([fetchMyClasses(), fetchAvailableClasses()])
    } catch (err) {
      toast.add({ title: 'Lỗi hủy đăng ký', description: getErrorMessage(err), color: 'error' })
    } finally {
      isActionLoading.value = false
    }
  }

  async function init() {
    await Promise.all([fetchMyClasses(), fetchAvailableClasses()])
  }

  return {
    myClasses,
    availableClasses,
    isLoading,
    isActionLoading,
    searchQuery,
    filterSemester,
    filteredAvailable,
    isRegistered,
    fetchMyClasses,
    fetchAvailableClasses,
    registerForClass,
    dropClass,
    init,
  }
}
