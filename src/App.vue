<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="fixed inset-0 flex justify-center sm:px-8">
    <div class="flex w-full max-w-7xl lg:px-8">
      <div
        class="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20"
      ></div>
    </div>
  </div>
  <div class="relative flex w-full flex-col">
    <header class="pointer-events-none relative z-50 flex flex-none flex-col">
      <div class="top-0 z-10 h-16 pt-6">
        <div class="sm:px-8 w-full">
          <div class="mx-auto w-full max-w-7xl lg:px-8">
            <div class="relative px-4 sm:px-8 lg:px-12">
              <div class="mx-auto max-w-2xl lg:max-w-5xl">
                <div class="relative flex gap-4">
                  <div class="flex flex-1 justify-end md:justify-center">
                    <div
                      class="pointer-events-auto md:hidden"
                      data-headlessui-state=""
                    >
                      <button
                        class="group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20"
                        type="button"
                        aria-expanded="false"
                        data-headlessui-state=""
                        id="headlessui-popover-button-:Rbmiqja:"
                      >
                        Menu<svg
                          viewBox="0 0 8 6"
                          aria-hidden="true"
                          class="ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400"
                        >
                          <path
                            d="M1.75 1.75 4 4.25l2.25-2.5"
                            fill="none"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <nav class="pointer-events-auto hidden md:block">
                      <ul
                        class="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10"
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="flex-auto">
      <RouterView />
      <!-- 
       -->
    </main>
    <footer class="mt-32 flex-none">
      <div class="sm:px-8">
        <div class="mx-auto w-full max-w-7xl lg:px-8">
          <div
            class="border-t border-zinc-100 pb-16 pt-10 dark:border-zinc-700/40"
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
