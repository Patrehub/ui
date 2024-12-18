<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores'

onMounted(() => {
  const authStore = useAuthStore()
  authStore.login()
})
</script>

<template>
  <div class="sm:px-8 mt-9">
    <div class="mx-auto w-full max-w-7xl lg:px-8">
      <div class="relative px-4 sm:px-8 lg:px-12">
        <div class="mx-auto max-w-2xl lg:max-w-5xl">
          <div class="max-w-2xl">
            <h1
              class="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100"
            >
              Authenticating Please Wait...
            </h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
