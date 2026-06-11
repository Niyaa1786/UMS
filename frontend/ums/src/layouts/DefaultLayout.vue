<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'
import { useLogout } from '@/composables/auth/useLogout'
import type { NavigationMenuItem } from '@nuxt/ui'

const authStore = useAuthStore()
const router = useRouter()
const { logout: logoutAction } = useLogout()

const userRole = computed(() => authStore.user?.role || 'N/A')
const userName = computed(() => authStore.user?.username || 'User')

const userRoleText = computed(() => {
  const roleMap: Record<string, string> = {
    Admin: 'Quản trị viên',
    Staff: 'Nhân viên',
    Teacher: 'Giảng viên',
    Student: 'Sinh viên',
  }
  return roleMap[userRole.value] || userRole.value
})

const menuItems = computed<NavigationMenuItem[]>(() => {
  const role = userRole.value.toLowerCase()
  const basePath = `/${role}`

  const overviewItems: NavigationMenuItem[] = [{ label: 'Dashboard', icon: 'i-heroicons-home', to: `${basePath}/dashboard` }]

  let learningItems: NavigationMenuItem[] = []
  if (userRole.value === 'Student') {
    learningItems = [
      { label: 'Khóa học', icon: 'i-heroicons-book-open', to: `${basePath}/courses` },
      { label: 'Điểm số', icon: 'i-heroicons-chart-bar', to: `${basePath}/scores` },
      { label: 'Thời khóa biểu', icon: 'i-heroicons-calendar-days', to: `${basePath}/schedule` },
    ]
  } else if (userRole.value === 'Teacher') {
    learningItems = [
      { label: 'Lớp học', icon: 'i-heroicons-book-open', to: `${basePath}/classes` },
      { label: 'Nhập điểm', icon: 'i-heroicons-pencil-square', to: `${basePath}/grades` },
      { label: 'Thời khóa biểu', icon: 'i-heroicons-calendar-days', to: `${basePath}/schedule` },
    ]
  } else {
    learningItems = [
      { label: 'Quản lý nhân viên', icon: 'i-heroicons-user-group', to: `${basePath}/staffs` },
      { label: 'Quản lý sinh viên', icon: 'i-heroicons-users', to: `${basePath}/students` },
      { label: 'Quản lý giảng viên', icon: 'i-heroicons-academic-cap', to: `${basePath}/teachers` },
    ]
  }

  return [...overviewItems, ...learningItems]
})

const userMenuItems = [
  [{ label: 'Hồ sơ', icon: 'i-heroicons-user', to: `/${userRole.value.toLowerCase()}/profile` }],
  [{ label: 'Đổi mật khẩu', icon: 'i-heroicons-key', to: '/change-password' }],
]

const logout = async () => {
  await logoutAction()
  router.push('/login')
}
</script>

<template>
  <UApp>
    <div class="flex h-screen">
      <USidebar open collapsible="none" side="left" variant="sidebar">
        <template #header>
          <div class="m-auto">
            <span class="font-bold text-red-600">EduManager</span>
          </div>
        </template>

        <UNavigationMenu :items="menuItems" orientation="vertical" color="error" />

        <template #footer>
          <UButton color="error" variant="outline" block @click="logout" class="mt-2">
            <UIcon name="i-heroicons-arrow-right-on-rectangle" class="size-4 mr-2" />
            Đăng xuất
          </UButton>
        </template>
      </USidebar>

      <!-- Main content -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <!-- Header -->
        <UHeader class="bg-white" title="">
          <template #right>
            <div class="flex items-center gap-3">
              <UBadge color="neutral">
                {{ userRoleText }}
              </UBadge>
              <UDropdownMenu :items="userMenuItems">
                <UButton color="neutral" variant="ghost" class="flex items-center gap-2">
                  <UAvatar :alt="userName" size="sm" />
                  <span>{{ userName }}</span>
                  <UIcon name="i-heroicons-chevron-down" class="size-4" />
                </UButton>
              </UDropdownMenu>
            </div>
          </template>
        </UHeader>
        <UContainer class="flex-1 overflow-y-auto p-6">
          <slot />
        </UContainer>
      </div>
    </div>
  </UApp>
</template>
