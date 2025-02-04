<script setup lang="tsx">
import { onMounted, computed, ref, createElementBlock } from 'vue'
import CreatorCampaign from './CreatorCampaign.vue'
import { PlusIcon } from '@heroicons/vue/16/solid'

import InstallationModal from './InstallationModal.vue'
import { usePatreonProfileStore } from '@/stores'

const store = usePatreonProfileStore()
const patreonProfile = computed(() => {
  return store.getPatreonProfile
})

const isLoading = ref(true)

const isOpen = ref(false)
const tier = ref<any>(null)

function setTier(newTier: any) {
  tier.value = newTier
  setIsOpen(true)
}

function setIsOpen(value: boolean) {
  isOpen.value = value
}

onMounted(async () => {
  if (!patreonProfile.value) {
    isLoading.value = true
    await store.fetchPatreonProfile()
    isLoading.value = false
  } else {
    isLoading.value = false
    await store.fetchPatreonProfile()
  }
})

function cleanSummary(summary: string) {
  let element = document.createElement('div')

  element.innerHTML = summary

  return element.innerText
}

function centsToDollars(cents: number) {
  // format dollars

  let dollars = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100)

  return dollars
}
</script>

<template>
  <div>
    <div
      v-if="isLoading"
      v-for="item in Array(1)"
      class="relative mb-4 h-52 animate-pulse overflow-clip rounded-3xl border border-zinc-700/50 bg-zinc-800 p-3 text-zinc-300"
    ></div>

    <div
      v-if="!isLoading && patreonProfile?.campaign === null"
      class="relative mb-4 h-52 overflow-clip rounded-3xl border border-zinc-700/50 bg-zinc-800 p-3 text-zinc-300"
    >
      No campaigns found
    </div>

    <div v-if="!isLoading && patreonProfile?.campaign">
      <CreatorCampaign :campaign="patreonProfile?.campaign" />
    </div>

    <div class="mt-12">
      <div class="flex items-center justify-between">
        <div>
          <h1
            class="text-xl font-bold tracking-tight text-zinc-800 sm:text-3xl dark:text-zinc-100"
          >
            Campaign Tiers
          </h1>
          <p class="mt-2 mb-4 text-sm text-zinc-600 dark:text-zinc-400">
            Here are the tiers for your campaign
          </p>
        </div>

        <div>
          <a
            href="https://github.com/apps/Patrehub/installations/new"
            class="flex cursor-pointer items-center rounded-[7px] border-t border-t-blue-400 bg-linear-to-b/oklch from-blue-600 to-blue-800 px-3 py-1 text-sm font-medium tracking-wide text-blue-50 inset-shadow-sm ring-1 ring-zinc-950 transition [text-shadow:_0px_2px_2px_rgba(0,0,0,0.35)] hover:border-t-blue-300 hover:from-blue-500 hover:to-blue-700 hover:text-white active:border-t-blue-950 active:from-blue-800 active:to-blue-800 active:inset-shadow-black/50"
          >
            Install Application
          </a>
        </div>
      </div>

      <div class="">
        <div
          v-if="isLoading"
          class="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
        >
          <div
            v-for="item in Array(3)"
            class="h-66 animate-pulse rounded-xl border border-zinc-700/50 bg-zinc-800"
          ></div>
        </div>

        <div
          v-if="!isLoading && patreonProfile?.campaign"
          class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
        >
          <div
            v-for="(tier, i) in patreonProfile?.campaign.rewards"
            class="rounded-xl border-y border-zinc-700/50 border-t-zinc-700 border-b-zinc-900 bg-linear-to-b from-zinc-800 to-zinc-900 p-4 inset-shadow-sm ring ring-zinc-950 inset-shadow-zinc-700/60"
          >
            <p class="text-base font-medium tracking-wider text-zinc-200">
              {{ tier.title }}
            </p>

            <p class="mt-1 text-xl font-bold text-white">
              {{ centsToDollars(tier.amountCents) }}
            </p>
            <p class="-mt-1 text-sm text-zinc-400">
              <!-- {{ campaign.isMonthly ? 'per month' : '' }} -->
            </p>

            <p
              class="mt-4 line-clamp-2 min-h-[2.66em] text-xs leading-[1.33em] overflow-ellipsis text-zinc-400"
            >
              {{
                cleanSummary(tier.description).length > 0
                  ? cleanSummary(tier.description)
                  : 'No description'
              }}
            </p>

            <div class="mt-2 flex items-center justify-between">
              <p class="text-sm font-medium tracking-wide text-zinc-300">
                Repo Benefits
              </p>

              <button
                class="ring-zinc-925 flex cursor-pointer items-center gap-x-0.5 rounded-lg border border-white/5 border-t-white/10 bg-zinc-800 p-0.5 px-2 text-sm tracking-wide ring inset-shadow-transparent transition hover:bg-zinc-700/40 active:bg-zinc-800 active:inset-shadow-xs active:inset-shadow-black/50"
                @click="setTier(tier)"
              >
                <PlusIcon class="size-4 text-zinc-200" />
              </button>
            </div>

            <div
              class="mt-2 border-y border-t-zinc-950 border-b-zinc-700/50"
            ></div>

            <div class="mx-2 mt-2 grid grid-cols-2 gap-1.5">
              <div
                v-for="j in Array(i)"
                class="flex items-center gap-x-1.5 overflow-clip"
              >
                <div class="">
                  <img
                    src="/github.svg"
                    class="size-4.5 rounded-full opacity-50"
                  />
                </div>
                <p class="font-mono text-sm tracking-wide text-zinc-300">
                  /ExampleRepo
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- TODO: NEED PASS DOWN TIER -->
  <InstallationModal v-model:isOpen="isOpen" />
</template>
