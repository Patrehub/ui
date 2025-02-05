<script setup lang="tsx">
import { onMounted, computed, ref, createElementBlock } from 'vue'
import CreatorCampaign from './CreatorCampaign.vue'

import { usePatreonProfileStore } from '@/stores'
const store = usePatreonProfileStore()
const patreonProfile = computed(() => {
  return store.getPatreonProfile
})

const isLoading = ref(true)

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
  </div>
</template>
