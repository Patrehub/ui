<script setup lang="tsx">
import { onMounted, computed, ref, createElementBlock } from 'vue'
import { useProfileCampaignsStore } from '@/stores/profileCampaigns'
import CreatorCampaign from './CreatorCampaign.vue'

const store = useProfileCampaignsStore()
const profileCampaigns = computed(() => {
  return store.getProfileCampaigns
})

const isLoading = ref(true)

onMounted(async () => {
  if (!profileCampaigns.value || profileCampaigns.value.length === 0) {
    isLoading.value = true
    await store.fetchProfileCampaigns()
    isLoading.value = false
  } else {
    isLoading.value = false
    await store.fetchProfileCampaigns()
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
      v-if="!isLoading && profileCampaigns.length === 0"
      class="relative mb-4 h-52 overflow-clip rounded-3xl border border-zinc-700/50 bg-zinc-800 p-3 text-zinc-300"
    >
      No campaigns found
    </div>

    <div v-for="campaign in profileCampaigns">
      <CreatorCampaign :campaign="campaign" />
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
          <button
            class="flex cursor-pointer items-center rounded-[7px] border-t border-t-blue-400 bg-linear-to-b/oklch from-blue-600 to-blue-800 px-3 py-1 text-sm font-medium tracking-wide text-blue-50 inset-shadow-sm ring-1 ring-zinc-950 transition [text-shadow:_0px_2px_2px_rgba(0,0,0,0.35)] hover:border-t-blue-300 hover:from-blue-500 hover:to-blue-700 hover:text-white active:border-t-blue-950 active:from-blue-800 active:to-blue-800 active:inset-shadow-black/50"
          >
            Install Application
          </button>
        </div>
      </div>

      <div class="">
        <div
          v-for="campaign in profileCampaigns"
          class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
        >
          <div
            v-for="(tier, i) in campaign.tiers"
            class="rounded-xl border-y border-zinc-700/50 border-t-zinc-700 border-b-zinc-900 bg-linear-to-b from-zinc-800 to-zinc-900 p-4 inset-shadow-sm ring ring-zinc-950 inset-shadow-zinc-700/60"
          >
            <p class="text-base font-medium tracking-wider text-zinc-200">
              {{ tier.title }}
            </p>

            <p class="mt-1 text-xl font-bold text-white">
              {{ centsToDollars(tier.amountCents) }}
            </p>
            <p class="-mt-1 text-sm text-zinc-400">
              {{ campaign.isMonthly ? 'per month' : '' }}
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

            <p class="mt-2 text-sm font-medium tracking-wide text-zinc-300">
              Repo Benefits
            </p>

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

    <!-- <button
      class="ring-zinc-925 flex cursor-pointer items-center gap-x-0.5 rounded-lg border border-white/5 border-t-white/10 bg-zinc-800/60 py-1 pr-2 pl-1 text-sm tracking-wide ring transition hover:bg-zinc-800/80"
    >
      <ChevronDownIcon class="size-5" />

      View Tiers
    </button> -->
  </div>
</template>
