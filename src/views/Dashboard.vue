<script setup lang="ts">
import { useAuthStore, useGitHubStore } from '@/stores'
import { LinkIcon } from '@heroicons/vue/24/solid'

const store = useGitHubStore()

const authStore = useAuthStore()
</script>

<template>
  <main class="flex-auto">
    <div class="sm:px-8 mt-16 sm:mt-32">
      <div class="mx-auto w-full max-w-7xl lg:px-8">
        <div class="relative px-4 sm:px-8 lg:px-12">
          <div class="mx-auto max-w-2xl lg:max-w-5xl">
            <header class="max-w-2xl">
              <h1
                class="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100"
              >
                PatreHub Dashboard
              </h1>
              <p class="mt-2 text-base text-zinc-600 dark:text-zinc-400">
                Welcome back {{ authStore.user.first_name }}!
              </p>
            </header>

            <div
              class="min-h-96 mt-12 relative flex items-center justify-center"
            >
              <div
                class="w-full h-full absolute top-0 left-0"
                :style="{
                  backgroundColor: 'transparent',
                  backgroundImage:
                    'radial-gradient(hsla(240, 5%, 26%, 100%) 1px, transparent 1px)',
                  backgroundSize: '4px 4px',
                  maskImage: 'radial-gradient(black 10%, transparent 65%)',
                }"
              ></div>

              <div class="flex flex-col items-center justify-center gap-y-4">
                <div class="relative text-white flex items-center">
                  <div
                    class="bg-gradient-to-b shadow-lg shadow-zinc-950 from-zinc-800 to-[hsl(240,_6%,_10%)] p-2 rounded-2xl border-t-2 border-t-zinc-700 border-zinc-800 ring-2 ring-zinc-950"
                  >
                    <img src="/patreon.svg" class="size-16 p-2" />
                  </div>

                  <div
                    class="w-28 mx-1 relative border border-dashed border-zinc-400 ring-zinc-950 ring-2"
                  >
                    <div
                      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ring-2 ring-zinc-950 rounded-2xl bg-gradient-to-b border-t-2 border-t-zinc-700 from-zinc-800 to-[hsl(240,_6%,_10%)] p-2"
                    >
                      <LinkIcon class="size-6" />
                    </div>
                  </div>

                  <div
                    class="bg-gradient-to-b shadow-lg shadow-zinc-950 from-zinc-800 to-[hsl(240,_6%,_10%)] p-2 rounded-2xl border-t-2 border-t-zinc-700 border-zinc-800 ring-2 ring-zinc-950"
                  >
                    <img src="/github.svg" class="size-16 p-2" />
                  </div>
                </div>

                <div class="relative flex-col flex gap-6 mt-4">
                  <div class="flex items-center justify-center gap-2">
                    <button
                      class="px-3 py-1 flex items-center bg-gradient-to-b from-blue-600 to-blue-800 rounded-[7px] border-t border-t-blue-400 ring-1 ring-zinc-950 text-blue-50 font-medium tracking-wide text-sm [text-shadow:_0px_2px_2px_rgba(0,0,0,0.35)] hover:text-white shadow-inner active:shadow-black/80 active:border-t-blue-950 transition"
                      @click="store.connect()"
                    >
                      Connect GitHub
                    </button>
                  </div>
                  <div
                    class="text-zinc-300/90 font-mono relative backdrop-blur-[0.5px] text-sm [text-shadow:_0px_0px_5px_black;]"
                  >
                    Connect your GitHub account to get started
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
