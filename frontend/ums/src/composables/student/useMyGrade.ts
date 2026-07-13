// src/composables/student/useMyGrade.ts
import { ref, computed } from 'vue'
import { gradeService } from '@/services/gradeService'
import { studentService } from '@/services/studentService'
import { GradeTypeLabel } from '@/types/grade'
import type { GradeResponse } from '@/types/grade'
import type { StudentClassResponse } from '@/types/enrollment'
import { getErrorMessage } from '@/utils/getErrorMessage'
import { useAuthStore } from '@/stores/useAuthStore'

export interface MyClassGradeGroup {
  enrollmentId: string
  // Khớp với lớp trong danh sách "Lớp của tôi" theo thứ tự đăng ký gần nhất khi
  // không thể map trực tiếp enrollmentId -> classId (API điểm không trả classId)
  classInfo?: StudentClassResponse
  grades: GradeResponse[]
  weightedAverage: number | null
}

export function useMyGrade() {
  const toast = useToast()
  const authStore = useAuthStore()

  const isLoading = ref(false)
  const grades = ref<GradeResponse[]>([])
  const myClasses = ref<StudentClassResponse[]>([])

  const groups = computed<MyClassGradeGroup[]>(() => {
    const byEnrollment = new Map<string, GradeResponse[]>()
    for (const g of grades.value) {
      const list = byEnrollment.get(g.enrollmentId) ?? []
      list.push(g)
      byEnrollment.set(g.enrollmentId, list)
    }

    return Array.from(byEnrollment.entries()).map(([enrollmentId, list]) => {
      const totalWeight = list.reduce((sum, g) => sum + (g.weight || 0), 0)
      const weightedAverage =
        totalWeight > 0
          ? list.reduce((sum, g) => sum + (g.score / g.maxScore) * 10 * (g.weight || 0), 0) / totalWeight
          : null
      return {
        enrollmentId,
        grades: list.sort((a, b) => a.gradeType - b.gradeType),
        weightedAverage,
      }
    })
  })

  async function fetchAll() {
    const studentId = authStore.user?.id
    if (!studentId) return
    isLoading.value = true
    try {
      const [gradeList, classList] = await Promise.all([
        gradeService.getStudentGrades(studentId),
        studentService.getMyClasses().catch(() => []),
      ])
      grades.value = gradeList
      myClasses.value = classList
    } catch (err) {
      toast.add({ title: 'Lỗi tải điểm', description: getErrorMessage(err), color: 'error' })
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    grades,
    myClasses,
    groups,
    GradeTypeLabel,
    fetchAll,
  }
}
