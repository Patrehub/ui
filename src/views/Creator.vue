<script setup lang="ts">
import CreatorCampaigns from '@/components/CreatorCampaigns.vue'
import { useAuthStore } from '@/stores'

const authStore = useAuthStore()
</script>

<template>
  <main class="flex-auto">
    <div class="mt-12 sm:px-8">
      <div class="mx-auto w-full max-w-7xl lg:px-8">
        <div class="relative px-4 sm:px-8 lg:px-12">
          <div class="mx-auto max-w-2xl lg:max-w-5xl">
            <header class="max-w-2xl">
              <h1
                class="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100"
              >
                Creator Dashboard
              </h1>
            </header>
            <div class="mt-6">
              <CreatorCampaigns />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
