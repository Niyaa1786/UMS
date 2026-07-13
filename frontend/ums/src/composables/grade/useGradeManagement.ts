// src/composables/grade/useGradeManagement.ts
import { ref, computed } from 'vue'
import { classManagementService } from '@/services/classManagementService'
import { gradeService } from '@/services/gradeService'
import { GradeType, manualGradeTypeOptions } from '@/types/grade'
import type { GradeResponse, FinalGradeResponse, CreateGradeRequest, UpdateGradeRequest } from '@/types/grade'
import type { EnrollmentResponse } from '@/types/enrollment'
import { getErrorMessage } from '@/utils/getErrorMessage'

// ─── Dòng dữ liệu hiển thị: 1 sinh viên = 1 dòng, có sẵn điểm theo từng loại ───
export interface StudentGradeRow {
  enrollmentId: string
  studentId: string
  studentCode: string
  studentFullName: string
  studentEmail: string
  gradesByType: Partial<Record<GradeType, GradeResponse>>
  finalScore?: number
  gradeLetter?: string
}

// Context được set sẵn (auto-fill) khi bấm vào 1 ô điểm của 1 sinh viên
export interface GradeModalContext {
  enrollmentId: string
  studentId: string
  studentCode: string
  studentFullName: string
  gradeType: GradeType
}

export function useGradeManagement() {
  const toast = useToast()

  const classId = ref<string | null>(null)
  const enrollments = ref<EnrollmentResponse[]>([])
  const grades = ref<GradeResponse[]>([])
  const finalGrades = ref<FinalGradeResponse[]>([])

  const isLoading = ref(false)
  const isSubmitting = ref(false)
  const syncingEnrollmentId = ref<string | null>(null)

  // ── Modal thêm/sửa điểm ──────────────────────────────────────────────────
  const isGradeModalOpen = ref(false)
  const editingGrade = ref<GradeResponse | null>(null)
  const modalContext = ref<GradeModalContext | null>(null)

  const gradeForm = ref({
    score: 0,
    maxScore: 10,
    weight: 1,
    note: '',
  })

  // ── Modal xóa điểm ───────────────────────────────────────────────────────
  const isConfirmDeleteOpen = ref(false)
  const deletingGrade = ref<GradeResponse | null>(null)

  // ── Derived: mỗi sinh viên 1 dòng, tự map sẵn điểm theo loại ────────────
  const rows = computed<StudentGradeRow[]>(() =>
    enrollments.value
      .filter((e) => e.status === 'Active')
      .map((e) => {
        const studentGrades = grades.value.filter((g) => g.enrollmentId === e.id)
        const gradesByType: Partial<Record<GradeType, GradeResponse>> = {}
        studentGrades.forEach((g) => {
          gradesByType[g.gradeType] = g
        })
        const fg = finalGrades.value.find((f) => f.enrollmentId === e.id)
        return {
          enrollmentId: e.id,
          studentId: e.studentId,
          studentCode: e.studentCode,
          studentFullName: e.studentFullName,
          studentEmail: e.studentEmail,
          gradesByType,
          finalScore: fg?.finalScore,
          gradeLetter: fg?.gradeLetter,
        }
      }),
  )

  // ── Fetch toàn bộ dữ liệu bảng điểm của 1 lớp ───────────────────────────
  async function fetchAll(classIdParam: string) {
    classId.value = classIdParam
    isLoading.value = true
    try {
      const [enrollmentList, gradeList, finalList] = await Promise.all([
        classManagementService.getEnrollmentsByClass(classIdParam),
        gradeService.getClassGrades(classIdParam),
        gradeService.getClassFinalGrades(classIdParam).catch(() => []),
      ])
      enrollments.value = enrollmentList
      grades.value = gradeList
      finalGrades.value = finalList
    } catch (err) {
      toast.add({ title: 'Lỗi tải bảng điểm', description: getErrorMessage(err), color: 'error' })
    } finally {
      isLoading.value = false
    }
  }

  async function refreshFinal() {
    if (!classId.value) return
    try {
      finalGrades.value = await gradeService.getClassFinalGrades(classId.value)
    } catch {
      // Không chặn luồng chính nếu tính điểm tổng kết lỗi
    }
  }

  // ── Mở modal thêm/sửa điểm — auto-fill sẵn theo SV + loại điểm đã bấm ───
  function openGradeModal(row: StudentGradeRow, gradeType: GradeType) {
    modalContext.value = {
      enrollmentId: row.enrollmentId,
      studentId: row.studentId,
      studentCode: row.studentCode,
      studentFullName: row.studentFullName,
      gradeType,
    }
    const existing = row.gradesByType[gradeType] ?? null
    editingGrade.value = existing
    gradeForm.value = {
      score: existing?.score ?? 0,
      maxScore: existing?.maxScore ?? 10,
      weight: existing?.weight ?? 1,
      note: existing?.note ?? '',
    }
    isGradeModalOpen.value = true
  }

  function closeGradeModal() {
    isGradeModalOpen.value = false
    modalContext.value = null
    editingGrade.value = null
  }

  async function submitGrade() {
    if (!modalContext.value) return
    isSubmitting.value = true
    try {
      if (editingGrade.value) {
        // ── Sửa điểm đã có ──
        const payload: UpdateGradeRequest = {
          score: gradeForm.value.score,
          note: gradeForm.value.note || undefined,
        }
        const updated = await gradeService.updateGrade(editingGrade.value.id, payload)
        const idx = grades.value.findIndex((g) => g.id === updated.id)
        if (idx !== -1) grades.value[idx] = updated
        toast.add({
          title: 'Cập nhật thành công',
          description: `Đã cập nhật điểm cho ${modalContext.value.studentFullName}.`,
          color: 'success',
        })
      } else {
        // ── Thêm điểm mới ──
        const payload: CreateGradeRequest = {
          enrollmentId: modalContext.value.enrollmentId,
          gradeType: modalContext.value.gradeType,
          score: gradeForm.value.score,
          maxScore: gradeForm.value.maxScore,
          weight: gradeForm.value.weight,
          note: gradeForm.value.note || undefined,
        }
        const created = await gradeService.createGrade(payload)
        grades.value.push(created)
        toast.add({
          title: 'Thêm điểm thành công',
          description: `Đã thêm điểm cho ${modalContext.value.studentFullName}.`,
          color: 'success',
        })
      }
      closeGradeModal()
      await refreshFinal()
    } catch (err) {
      toast.add({ title: 'Lỗi lưu điểm', description: getErrorMessage(err), color: 'error' })
    } finally {
      isSubmitting.value = false
    }
  }

  // ── Xóa điểm ─────────────────────────────────────────────────────────────
  function openConfirmDeleteGrade(grade: GradeResponse) {
    deletingGrade.value = grade
    isConfirmDeleteOpen.value = true
  }

  function closeConfirmDeleteGrade() {
    isConfirmDeleteOpen.value = false
    deletingGrade.value = null
  }

  async function confirmDeleteGrade() {
    if (!deletingGrade.value) return
    isSubmitting.value = true
    try {
      await gradeService.deleteGrade(deletingGrade.value.id)
      grades.value = grades.value.filter((g) => g.id !== deletingGrade.value!.id)
      toast.add({ title: 'Xóa thành công', description: 'Đã xóa điểm.', color: 'success' })
      closeConfirmDeleteGrade()
      await refreshFinal()
    } catch (err) {
      toast.add({ title: 'Lỗi xóa điểm', description: getErrorMessage(err), color: 'error' })
    } finally {
      isSubmitting.value = false
    }
  }

  // ── Đồng bộ điểm chuyên cần từ dữ liệu điểm danh ────────────────────────
  async function syncAttendance(row: StudentGradeRow) {
    syncingEnrollmentId.value = row.enrollmentId
    try {
      const updated = await gradeService.syncFromAttendance(row.enrollmentId)
      const idx = grades.value.findIndex((g) => g.enrollmentId === row.enrollmentId && g.gradeType === GradeType.Attendance)
      if (idx !== -1) grades.value[idx] = updated
      else grades.value.push(updated)
      toast.add({
        title: 'Đồng bộ thành công',
        description: `Đã đồng bộ điểm chuyên cần cho ${row.studentFullName}.`,
        color: 'success',
      })
      await refreshFinal()
    } catch (err) {
      toast.add({ title: 'Lỗi đồng bộ', description: getErrorMessage(err), color: 'error' })
    } finally {
      syncingEnrollmentId.value = null
    }
  }

  return {
    // state
    isLoading,
    isSubmitting,
    syncingEnrollmentId,
    rows,
    manualGradeTypeOptions,
    // modal thêm/sửa
    isGradeModalOpen,
    editingGrade,
    modalContext,
    gradeForm,
    openGradeModal,
    closeGradeModal,
    submitGrade,
    // modal xóa
    isConfirmDeleteOpen,
    deletingGrade,
    openConfirmDeleteGrade,
    closeConfirmDeleteGrade,
    confirmDeleteGrade,
    // khác
    syncAttendance,
    fetchAll,
  }
}
