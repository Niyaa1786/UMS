import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'
import type { Role } from '@/types/auth'

// ─────────────────────────────────────────────────────────────────────────────
// Route Meta Types
// ─────────────────────────────────────────────────────────────────────────────
declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    requiresGuest?: boolean
    roles?: Role[]
    title?: string
    /** 'none' → không bọc DefaultLayout (dùng cho login, error pages) */
    layout?: 'none'
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Views — lazy loaded
// ─────────────────────────────────────────────────────────────────────────────
const LoginView = () => import('@/views/LoginView.vue')

// Admin / Staff
const StudentManagementView = () => import('@/views/admin/StudentManagementView.vue')
const TeacherManagementView = () => import('@/views/admin/TeacherManagementView.vue')
const StaffManagementView = () => import('@/views/admin/StaffManagementView.vue')
const ClassManagementView = () => import('@/views/admin/ClassManagementView.vue')
const SubjectManagementView = () => import('@/views/admin/SubjectManagementView.vue')
const ClassScheduleManagementView = () => import('@/views/admin/ClassScheduleManagementView.vue')

// Teacher
const TeacherSubjectView = () => import('@/views/teacher/SubjectView.vue')
const TeacherClassScheduleView = () => import('@/views/teacher/ClassScheduleView.vue')

// Student
const StudentSubjectView = () => import('@/views/student/SubjectView.vue')

// ─────────────────────────────────────────────────────────────────────────────
// Helper: trang chủ sau khi đăng nhập theo role
// ─────────────────────────────────────────────────────────────────────────────
function roleHomePath(role: Role): string {
  const map: Record<Role, string> = {
    Admin: '/admin/students',
    Staff: '/admin/students',
    Teacher: '/teacher/schedule',
    Student: '/student/subjects',
  }
  return map[role] ?? '/login'
}

// ─────────────────────────────────────────────────────────────────────────────
// Routes
// ─────────────────────────────────────────────────────────────────────────────
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: () => {
      const auth = useAuthStore()
      if (!auth.isAuthenticated) return { name: 'Login' }
      return roleHomePath(auth.user!.role)
    },
  },

  // ── Login ─────────────────────────────────────────────────────────────────
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { requiresGuest: true, title: 'Đăng nhập', layout: 'none' },
  },

  // ── Admin / Staff — User management ───────────────────────────────────────
  {
    path: '/admin/students',
    name: 'StudentManagement',
    component: StudentManagementView,
    meta: { requiresAuth: true, roles: ['Admin', 'Staff'], title: 'Quản lý Sinh viên' },
  },
  {
    path: '/admin/teachers',
    name: 'TeacherManagement',
    component: TeacherManagementView,
    meta: { requiresAuth: true, roles: ['Admin', 'Staff'], title: 'Quản lý Giảng viên' },
  },
  {
    path: '/admin/staffs',
    name: 'StaffManagement',
    component: StaffManagementView,
    meta: { requiresAuth: true, roles: ['Admin', 'Staff'], title: 'Quản lý Nhân viên' },
  },

  // ── Admin / Staff — Class management ──────────────────────────────────────
  {
    path: '/admin/classes',
    name: 'ClassManagement',
    component: ClassManagementView,
    meta: { requiresAuth: true, roles: ['Admin', 'Staff'], title: 'Quản lý Lớp học' },
  },
  {
    path: '/admin/subjects',
    name: 'SubjectManagement',
    component: SubjectManagementView,
    meta: { requiresAuth: true, roles: ['Admin', 'Staff'], title: 'Quản lý Môn học' },
  },
  {
    path: '/admin/classes/:classId/schedules',
    name: 'ClassScheduleManagement',
    component: ClassScheduleManagementView,
    meta: { requiresAuth: true, roles: ['Admin', 'Staff'], title: 'Lịch học lớp' },
  },
  {
    path: '/admin/classes/:classId/enrollments',
    name: 'ClassEnrollmentManagement',
    component: () => import('@/views/admin/ClassEnrollmentManagementView.vue'),
    meta: { requiresAuth: true, roles: ['Admin', 'Staff'], title: 'Quản lý đăng ký lớp' },
  },

  // ── Teacher ────────────────────────────────────────────────────────────────
  {
    path: '/teacher/subjects',
    name: 'TeacherSubjects',
    component: TeacherSubjectView,
    meta: { requiresAuth: true, roles: ['Teacher'], title: 'Danh sách Môn học' },
  },
  {
    path: '/teacher/schedule',
    name: 'TeacherSchedule',
    component: TeacherClassScheduleView,
    meta: { requiresAuth: true, roles: ['Teacher'], title: 'Thời khóa biểu' },
  },

  // ── Student ────────────────────────────────────────────────────────────────
  {
    path: '/student/subjects',
    name: 'StudentSubjects',
    component: StudentSubjectView,
    meta: { requiresAuth: true, roles: ['Student'], title: 'Môn học của tôi' },
  },

  {
    path: '/student/my-classes',
    name: 'StudentMyClasses',
    component: () => import('@/views/student/MyClassesView.vue'),
    meta: { requiresAuth: true, roles: ['Student'], title: 'Lớp học của tôi' },
  },

  {
    path: '/student/available-classes',
    name: 'StudentAvailableClasses',
    component: () => import('@/views/student/AvailableClassesView.vue'),
    meta: { requiresAuth: true, roles: ['Student'], title: 'Đăng ký lớp học' },
  },

  {
    path: '/student/schedule',
    name: 'StudentSchedule',
    component: () => import('@/views/student/ScheduleView.vue'),
    meta: { requiresAuth: true, roles: ['Student'], title: 'Thời khóa biểu' },
  },
  // ── Catch-all ─────────────────────────────────────────────────────────────
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Router Instance
// ─────────────────────────────────────────────────────────────────────────────
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition ?? { top: 0, behavior: 'smooth' }
  },
})

// ─────────────────────────────────────────────────────────────────────────────
// Navigation Guard
// ─────────────────────────────────────────────────────────────────────────────
router.beforeEach(async (to, _from, next) => {
  const auth = useAuthStore()

  // BƯỚC 1: F5/reload — Pinia bị reset nhưng token vẫn còn trong localStorage
  if (!auth.isAuthenticated && localStorage.getItem('accessToken')) {
    try {
      await auth.restoreAndRefresh()
    } catch {
      auth.clearAuth()
    }
  }

  const isAuthenticated = auth.isAuthenticated
  const userRole = auth.user?.role

  // BƯỚC 2: Đã đăng nhập mà vào /login → về trang chủ của role
  if (to.meta.requiresGuest && isAuthenticated && userRole) {
    return next(roleHomePath(userRole))
  }

  // BƯỚC 3: Chưa đăng nhập mà vào trang protected → về /login
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next({ name: 'Login', query: { redirect: to.fullPath } })
  }

  // BƯỚC 4: Sai role → về trang chủ của role mình
  const allowedRoles = to.meta.roles
  if (isAuthenticated && allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    return next(roleHomePath(userRole))
  }

  next()
})

// ─────────────────────────────────────────────────────────────────────────────
// After Hook: cập nhật document.title
// ─────────────────────────────────────────────────────────────────────────────
router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} — UMS` : 'UMS'
})

export default router
export { roleHomePath }
