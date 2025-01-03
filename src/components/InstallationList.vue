<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useInstallationStore } from '@/stores'

const store = useInstallationStore()
const getInstallations = computed(() => {
  return store.getInstallations
})

onMounted(() => {
  store.fetchInstallations()
})
</script>

<template>
  <div class="installation-list">
    <h1>Installation List</h1>
  </div>
  <h1>Made By Getters</h1>
  <div v-for="user in getInstallations" :key="user.id">
    {{ user.id }} {{ user.name }}
  </div>
</template>
