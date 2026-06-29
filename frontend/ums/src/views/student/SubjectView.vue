<!-- src/views/student/SubjectView.vue -->
<!--
  Sinh viên xem danh sách các môn học đang/đã học.
  Route: /student/subjects
-->
<template>
  <div class="space-y-5">
    <!-- ── Page Header ────────────────────────────────────────────────────── -->
    <div>
      <h1 class="text-xl font-bold text-gray-900">Môn học của tôi</h1>
      <p class="text-sm text-gray-500 mt-0.5">
        Danh sách các môn học bạn đang đăng ký
      </p>
    </div>

    <!-- ── Stats Summary ──────────────────────────────────────────────────── -->
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
      <UCard>
        <div class="text-center">
          <p class="text-2xl font-bold text-red-600">{{ subjectList.length }}</p>
          <p class="text-xs text-gray-500 mt-1">Tổng môn học</p>
        </div>
      </UCard>
      <UCard>
        <div class="text-center">
          <p class="text-2xl font-bold text-blue-600">{{ totalCredits }}</p>
          <p class="text-xs text-gray-500 mt-1">Tổng tín chỉ</p>
        </div>
      </UCard>
      <UCard class="col-span-2 sm:col-span-1">
        <div class="text-center">
          <p class="text-2xl font-bold text-green-600">{{ filteredList.length }}</p>
          <p class="text-xs text-gray-500 mt-1">Kết quả tìm kiếm</p>
        </div>
      </UCard>
    </div>

    <!-- ── Search ─────────────────────────────────────────────────────────── -->
    <UInput
      v-model="searchQuery"
      icon="i-heroicons-magnifying-glass"
      placeholder="Tìm theo tên, mã môn học..."
      class="w-full sm:w-80"
    />

    <!-- ── Loading ────────────────────────────────────────────────────────── -->
    <div v-if="isLoading" class="flex justify-center py-12">
      <UIcon name="i-heroicons-arrow-path" class="w-6 h-6 animate-spin text-gray-400" />
    </div>

    <!-- ── Empty ──────────────────────────────────────────────────────────── -->
    <div v-else-if="filteredList.length === 0" class="text-center py-12 text-gray-400">
      <UIcon name="i-heroicons-book-open" class="w-10 h-10 mx-auto mb-2" />
      <p class="text-sm">Không tìm thấy môn học nào</p>
    </div>

    <!-- ── Subject List ───────────────────────────────────────────────────── -->
    <div v-else class="space-y-3">
      <UCard
        v-for="subject in filteredList"
        :key="subject.id"
        class="hover:shadow-sm transition-shadow"
      >
        <div class="flex items-center gap-4">
          <!-- Icon -->
          <div class="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center shrink-0">
            <UIcon name="i-heroicons-academic-cap" class="w-5 h-5 text-red-600" />
          </div>

          <!-- Info -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="font-semibold text-gray-900 text-sm">{{ subject.name }}</span>
              <span class="font-mono text-xs text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                {{ subject.code }}
              </span>
            </div>
            <p class="text-xs text-gray-500 mt-0.5 line-clamp-1">
              {{ subject.description ?? 'Không có mô tả' }}
            </p>
          </div>

          <!-- Credits -->
          <UBadge color="info" variant="soft" class="shrink-0">
            {{ subject.credits }} tín chỉ
          </UBadge>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useSubjectManagement } from '@/composables/classManagement/useSubjectManagement'

const { isLoading, subjectList, searchQuery, filteredList, fetchAll } = useSubjectManagement()

const totalCredits = computed(() =>
  subjectList.value.reduce((sum, s) => sum + s.credits, 0),
)

onMounted(fetchAll)
</script>