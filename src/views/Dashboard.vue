<script setup lang="ts">
import { useGitHubStore } from '@/stores'

const store = useGitHubStore()
</script>

<template>
  <div class="about">
    <h1>Dashboard</h1>
  </div>

  <main class="flex-auto">
    <div class="sm:px-8 mt-16 sm:mt-32">
      <div class="mx-auto w-full max-w-7xl lg:px-8">
        <div class="relative px-4 sm:px-8 lg:px-12">
          <div class="mx-auto max-w-2xl lg:max-w-5xl">
            <header class="max-w-2xl">
              <h1
                class="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100"
              >
                Welcome to Patrehub's Dashboard
              </h1>
              <p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                Connect your GitHub Account to get started.
              </p>
            </header>
            <div class="mt-16 sm:mt-20">
              <button
                type="button"
                class="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                @click="store.connect()"
              >
                Connect GitHub
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
