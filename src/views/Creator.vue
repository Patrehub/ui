<script setup lang="ts">
import InstallationList from '@/components/InstallationList.vue'
import InstallationCreate from '@/components/InstallationCreate.vue'
</script>

<template>
  <div class="about">
    <h1>Dashboard</h1>
  </div>

  <main class="flex-auto">
    <div class="mt-16 sm:mt-32 sm:px-8">
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
            <div class="mt-16 sm:mt-20">
              <InstallationList />
              <InstallationCreate />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
