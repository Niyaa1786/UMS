<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from './layouts/DefaultLayout.vue'

const route = useRoute()

const useDefaultLayout = computed(() => route.meta.layout !== 'none')
</script>

<template>
  <DefaultLayout v-if="useDefaultLayout">
    <RouterView />
  </DefaultLayout>

  <RouterView v-else />
</template>
