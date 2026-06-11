<template>
  <UApp>
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
      <UCard class="w-full max-w-md">
        <template #header>
          <div class="text-center">
            <h1 class="mt-3 text-2xl font-semibold text-gray-900">Đăng nhập</h1>
          </div>
        </template>

        <UForm :schema="loginSchema" :state="formData" @submit="handleFormSubmit" class="space-y-4">
          <UFormField label="Tài khoản" name="username" required>
            <UInput
              v-model="formData.username"
              placeholder="Nhập tài khoản"
              icon="i-heroicons-user"
              size="lg"
              autocomplete="username"
              class="w-full"
            />
          </UFormField>

          <UFormField label="Mật khẩu" name="password" required>
            <UInput
              v-model="formData.password"
              type="password"
              placeholder="Nhập mật khẩu"
              icon="i-heroicons-lock-closed"
              size="lg"
              autocomplete="current-password"
              class="w-full"
            />
          </UFormField>

          <UButton type="submit" color="error" size="lg" block :loading="isLoading" loading-auto> Đăng nhập </UButton>
        </UForm>

        <template #footer>
          <p class="text-xs text-center text-gray-500">© 2026 UMS. Bản quyền thuộc về Trường Đại học ABC.</p>
        </template>
      </UCard>
    </div>
  </UApp>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useLogin } from '@/composables/auth/useLogin'
import type { LoginRequest } from '@/types/auth'

const { isLoading, onSubmit, loginSchema } = useLogin()
const handleFormSubmit = () => {
  onSubmit(formData)
}
const formData = reactive<LoginRequest>({
  username: '',
  password: '',
})
</script>
