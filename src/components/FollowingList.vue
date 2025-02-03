<script setup lang="tsx">
import { onMounted, computed, ref } from 'vue'
import { usePatreonProfileStore } from '@/stores'
import BasicTable from './BasicTable.vue'
import { createColumnHelper } from '@tanstack/vue-table'
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/16/solid'
import type { PatreonPledge } from '@/api'

const store = usePatreonProfileStore()
const profilePledges = computed(() => {
  return store.getPatreonProfile?.pledges ?? []
})

const isLoading = ref(true)

onMounted(async () => {
  await store.fetchPatreonProfile()
  isLoading.value = false
})

const columnHelper = createColumnHelper<PatreonPledge>()

const columns = [
  columnHelper.accessor('creator.campaign.avatarPhotoImageUrls._default', {
    header: () => 'Creator',
    cell: props => (
      <span class="flex items-center gap-2">
        <img
          src={props.getValue()}
          class="size-8 rounded-full bg-slate-500 object-cover ring ring-zinc-950 ring-offset-zinc-700 outline -outline-offset-1 outline-white/20"
        />

        <p class="font-medium text-zinc-50">
          {props.row.original.creator.campaign?.name}
        </p>
      </span>
    ),
  }),
  columnHelper.accessor('creator.campaign.creationName', {
    header: () => 'About',
    cell: ({ getValue }) => (
      <p class="line-clamp-2 break-after-all text-ellipsis text-zinc-400">
        {getValue()}
      </p>
    ),
  }),
  columnHelper.accessor('creator.url', {
    header: () => '',
    cell: props => (
      <a
        href={props.getValue()}
        target="_blank"
        class="inline-flex w-full items-center justify-end gap-1 font-medium text-zinc-500 transition group-hover:text-blue-500/80 hover:text-blue-400 active:text-blue-600"
      >
        Visit
        <ArrowTopRightOnSquareIcon class="inline-block size-4" />
      </a>
    ),
  }),
]
</script>

<template>
  <BasicTable
    :columns="columns"
    :data="profilePledges"
    :isLoading="isLoading"
  />
</template>
