<script setup lang="ts">
import { useAuthStore, useGitHubStore } from '@/stores'
import { LinkIcon } from '@heroicons/vue/24/solid'
import FollowingList from '@/components/FollowingList.vue'

const store = useGitHubStore()

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
                PatreHub Dashboard
              </h1>
              <p class="mt-4 text-base text-zinc-600 dark:text-zinc-400">
                Welcome back {{ authStore.user.first_name }}!
              </p>
            </header>

            <div
              class="relative mt-12 flex min-h-96 items-center justify-center"
            >
              <div
                class="absolute top-0 left-0 h-full w-full"
                :style="{
                  backgroundColor: 'transparent',
                  backgroundImage:
                    'radial-gradient(hsla(240, 5%, 26%, 100%) 1px, transparent 1px)',
                  backgroundSize: '4px 4px',
                  maskImage: 'radial-gradient(black 10%, transparent 65%)',
                }"
              ></div>

              <div class="flex flex-col items-center justify-center gap-y-4">
                <div class="relative flex items-center text-white">
                  <div
                    class="rounded-2xl border-t-2 border-zinc-800 border-t-zinc-700 bg-linear-to-b from-zinc-800 to-[hsl(240,_6%,_10%)] p-2 ring-2 shadow-lg shadow-zinc-950 ring-zinc-950"
                  >
                    <img src="/patreon.svg" class="size-16 p-2" />
                  </div>

                  <div
                    class="relative mx-1 w-28 border border-dashed border-zinc-400 ring-2 ring-zinc-950"
                  >
                    <div
                      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl border-t-2 border-t-zinc-700 bg-linear-to-b from-zinc-800 to-[hsl(240,_6%,_10%)] p-2 ring-2 shadow-lg shadow-zinc-950 ring-zinc-950"
                    >
                      <LinkIcon class="size-6" />
                    </div>
                  </div>

                  <div
                    class="rounded-2xl border-t-2 border-zinc-800 border-t-zinc-700 bg-linear-to-b from-zinc-800 to-[hsl(240,_6%,_10%)] p-2 ring-2 shadow-lg shadow-zinc-950 ring-zinc-950"
                  >
                    <img src="/github.svg" class="size-16 p-2" />
                  </div>
                </div>

                <div class="relative mt-4 flex flex-col gap-6">
                  <div class="flex items-center justify-center gap-2">
                    <button
                      class="flex cursor-pointer items-center rounded-[7px] border-t border-t-blue-400 bg-linear-to-b/oklch from-blue-600 to-blue-800 px-3 py-1 text-sm font-medium tracking-wide text-blue-50 inset-shadow-sm ring-1 ring-zinc-950 transition [text-shadow:_0px_2px_2px_rgba(0,0,0,0.35)] hover:border-t-blue-300 hover:from-blue-500 hover:to-blue-700 hover:text-white active:border-t-blue-950 active:from-blue-800 active:to-blue-800 active:inset-shadow-black/50"
                      @click="store.connect()"
                    >
                      Connect GitHub
                    </button>
                  </div>
                  <div
                    class="relative font-mono text-sm text-zinc-300/90 backdrop-blur-[0.5px] [text-shadow:_0px_0px_5px_black;]"
                  >
                    Connect your GitHub account to get started
                  </div>
                </div>
              </div>
            </div>

            <!-- need a loading state on the table -->
            <div class="mt-12">
              <h1
                class="text-2xl font-bold tracking-tight text-zinc-800 sm:text-3xl dark:text-zinc-100"
              >
                Memberships
              </h1>
              <p class="mt-2 mb-4 text-sm text-zinc-600 dark:text-zinc-400">
                Here are the creators you support on Patreon
              </p>

              <FollowingList />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
