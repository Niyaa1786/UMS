<template>
  <div class="space-y-5">
    <!-- ── Page Header ────────────────────────────────────────────────────── -->
    <div>
      <h1 class="text-xl font-bold text-gray-900">Danh sách Môn học</h1>
      <p class="text-sm text-gray-500 mt-0.5">
        Tổng cộng <span class="font-semibold text-gray-700">{{ filteredList.length }}</span> môn học
      </p>
    </div>

    <!-- ── Search ─────────────────────────────────────────────────────────── -->
    <div class="flex gap-3">
      <UInput
        v-model="searchQuery"
        icon="i-heroicons-magnifying-glass"
        placeholder="Tìm theo tên, mã môn học..."
        class="w-72"
      />
      <UButton
        v-if="searchQuery"
        color="neutral"
        variant="ghost"
        icon="i-heroicons-x-mark"
        @click="searchQuery = ''"
      >
        Xóa
      </UButton>
    </div>

    <!-- ── Subject Cards ──────────────────────────────────────────────────── -->
    <div v-if="isLoading" class="flex justify-center py-12">
      <UIcon name="i-heroicons-arrow-path" class="w-6 h-6 animate-spin text-gray-400" />
    </div>

    <div v-else-if="filteredList.length === 0" class="text-center py-12 text-gray-400">
      <UIcon name="i-heroicons-book-open" class="w-10 h-10 mx-auto mb-2" />
      <p class="text-sm">Không tìm thấy môn học nào</p>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <UCard
        v-for="subject in filteredList"
        :key="subject.id"
        class="hover:shadow-md transition-shadow"
      >
        <div class="space-y-2">
          <div class="flex items-start justify-between">
            <span class="font-mono text-xs text-red-600 font-semibold bg-red-50 px-2 py-0.5 rounded">
              {{ subject.code }}
            </span>
            <UBadge color="info" variant="soft">{{ subject.credits }} TC</UBadge>
          </div>
          <h3 class="font-semibold text-gray-900 text-sm leading-snug">{{ subject.name }}</h3>
          <p class="text-xs text-gray-500 line-clamp-2">
            {{ subject.description ?? 'Không có mô tả' }}
          </p>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useSubjectManagement } from '@/composables/classManagement/useSubjectManagement'

const { isLoading, searchQuery, filteredList, fetchAll } = useSubjectManagement()

onMounted(fetchAll)
</script>