<script setup lang="ts">
import { useInstallationStore } from '@/stores'
import { ref } from 'vue'

const store = useInstallationStore()
const name = ref('')
</script>

<template>
  <div class="installation-list">
    <h1>Installation New</h1>
  </div>
  <form @submit.prevent="store.createInstallation(name)">
    <input type="text" v-model="name" />
    <button type="submit">Create</button>
  </form>
</template>
