<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores'

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
</script>

<template>
  <header class="pointer-events-none relative z-50 flex flex-none flex-col">
    <div class="top-0 z-10 h-16 pt-6">
      <div class="sm:px-8 w-full">
        <div class="mx-auto w-full max-w-7xl lg:px-8">
          <div class="relative px-4 sm:px-8 lg:px-12">
            <div class="mx-auto max-w-2xl lg:max-w-5xl">
              <div class="relative flex gap-4">
                <div class="flex flex-1">
                  <nav class="pointer-events-auto">
                    <ul
                      class="flex px-3 text-sm font-medium text-zinc-800 dark:text-zinc-200 dark:ring-white/10"
                    >
                      <li>
                        <RouterLink
                          class="relative block px-3 py-2 transition hover:text-teal-500 dark:hover:text-teal-400"
                          to="/"
                          >Patrehub</RouterLink
                        >
                      </li>
                    </ul>
                  </nav>
                </div>
                <div class="flex flex-1 justify-center">
                  <nav class="pointer-events-auto">
                    <ul
                      class="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10"
                    >
                      <li>
                        <RouterLink
                          class="relative block px-3 py-2 transition hover:text-teal-500 dark:hover:text-teal-400"
                          to="/"
                          >Home</RouterLink
                        >
                      </li>
                      <li>
                        <RouterLink
                          class="relative block px-3 py-2 transition hover:text-teal-500 dark:hover:text-teal-400"
                          to="/about"
                          >About</RouterLink
                        >
                      </li>
                    </ul>
                  </nav>
                </div>
                <div class="flex justify-end flex-1">
                  <div class="pointer-events-auto">
                    <ul
                      v-show="user"
                      class="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10"
                    >
                      <li>
                        <RouterLink
                          class="relative block px-3 py-2 transition hover:text-teal-500 dark:hover:text-teal-400"
                          to="/dashboard"
                          >Dashboard</RouterLink
                        >
                      </li>
                      <li>
                        <RouterLink
                          class="relative block px-3 py-2 transition hover:text-teal-500 dark:hover:text-teal-400"
                          to="/creator"
                          >Creator</RouterLink
                        >
                      </li>
                      <li>
                        <button
                          class="relative block px-3 py-2 transition hover:text-teal-500 dark:hover:text-teal-400"
                          @click="authStore.logout"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                    <ul
                      v-show="!authStore.user"
                      class="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10"
                    >
                      <li>
                        <RouterLink
                          v-show="!user"
                          class="relative block px-3 py-2 transition hover:text-teal-500 dark:hover:text-teal-400"
                          to="/auth/patreon"
                          >Login</RouterLink
                        >
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
