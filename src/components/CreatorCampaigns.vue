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
      <h1
        class="text-xl font-bold tracking-tight text-zinc-800 sm:text-3xl dark:text-zinc-100"
      >
        Campaign Tiers
      </h1>
      <p class="mt-2 mb-4 text-sm text-zinc-600 dark:text-zinc-400">
        Here are the tiers for your campaign
      </p>

      <div
        class="bg-zinc-925 rounded-3xl border-b border-zinc-800/50 border-b-zinc-700/50 p-4 inset-shadow-sm inset-shadow-zinc-950"
      >
        <div
          v-for="campaign in profileCampaigns"
          class="grid grid-cols-4 gap-4"
        >
          <div
            v-for="tier in campaign.tiers"
            class="rounded-xl border border-zinc-800 bg-zinc-900 p-4 ring ring-zinc-950"
          >
            <p class="text-lg font-medium text-zinc-50">{{ tier.title }}</p>
            <p class="text-xs text-zinc-400">
              {{ cleanSummary(tier.description) }}
            </p>
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
