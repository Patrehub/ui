<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
</script>

<template>
  <div class="fixed inset-0 flex justify-center sm:px-8">
    <div class="flex w-full max-w-7xl lg:px-8">
      <div
        class="relative w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20"
      >
        <div
          class="absolute right-[calc(100%+1px)] h-[100dvh] w-[15%] bg-linear-to-l dark:from-zinc-800/90"
        >
          <div
            class="absolute top-0 left-0 h-full w-full backdrop-blur-xs"
            :style="{
              backgroundImage: 'radial-gradient(transparent 1px, black 1px)',
              backgroundSize: '4px 4px',
              maskImage:
                'linear-gradient(to left, black 60%, transparent 100%)',
            }"
          ></div>
        </div>
        <div
          class="absolute left-[calc(100%+1px)] h-[100dvh] w-[15%] bg-linear-to-r dark:from-zinc-800/90"
        >
          <div
            class="absolute top-0 left-0 h-full w-full backdrop-blur-xs"
            :style="{
              backgroundImage: 'radial-gradient(transparent 1px, black 1px)',
              backgroundSize: '4px 4px',
              maskImage:
                'linear-gradient(to right, black 60%, transparent 100%)',
            }"
          ></div>
        </div>
      </div>
    </div>
  </div>

  <div class="relative flex w-full flex-col">
    <Header />
    <main class="flex-auto">
      <RouterView />
      <!-- 
        -->
    </main>
    <footer class="mt-32 flex-none">
      <div class="sm:px-8">
        <div class="mx-auto w-full max-w-7xl lg:px-8">
          <div
            class="border-t border-zinc-100 pt-10 pb-16 dark:border-zinc-700/40"
          >
            <div class="relative px-4 sm:px-8 lg:px-12">
              <div class="mx-auto max-w-2xl lg:max-w-5xl">
                <div
                  class="flex flex-col items-center justify-between gap-6 sm:flex-row"
                >
                  <div
                    class="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-zinc-800 dark:text-zinc-200"
                  >
                    <a
                      class="transition hover:text-teal-500 dark:hover:text-teal-400"
                      href="/about"
                      >About</a
                    ><a
                      class="transition hover:text-teal-500 dark:hover:text-teal-400"
                      href="/projects"
                      >Projects</a
                    ><a
                      class="transition hover:text-teal-500 dark:hover:text-teal-400"
                      href="/speaking"
                      >Speaking</a
                    ><a
                      class="transition hover:text-teal-500 dark:hover:text-teal-400"
                      href="/uses"
                      >Uses</a
                    >
                  </div>
                  <p class="text-sm text-zinc-400 dark:text-zinc-500">
                    ©
                    <!-- -->2024<!-- -->
                    Spencer Sharp. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
