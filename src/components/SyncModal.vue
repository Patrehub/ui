<script setup lang="tsx">
let { isOpen } = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(['update:isOpen'])

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'

import { ref } from 'vue'
import { ExclamationTriangleIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { useSyncStore } from '@/stores/sync'

const isSyncing = ref(false)
const syncStore = useSyncStore()

function closeDialog() {
  emit('update:isOpen', false)
}

async function handleSync() {
  isSyncing.value = true
  await syncStore.sync()
  isSyncing.value = false

  closeDialog()
}
</script>

<template>
  <TransitionRoot as="template" :show="isOpen == true">
    <Dialog class="relative z-10" @close="closeDialog">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-zinc-900/65 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform rounded-2xl border-y border-t-white/15 border-b-zinc-950/20 bg-zinc-900 px-4 pt-5 pb-4 text-left inset-shadow-sm ring shadow-xl shadow-zinc-950 ring-zinc-950 inset-shadow-zinc-800 transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6"
            >
              <div class="flex items-start gap-x-4">
                <div
                  class="flex size-14 items-center justify-center rounded-full bg-amber-600/20 text-amber-400 inset-shadow-xs ring ring-zinc-950/50 inset-shadow-amber-200/20"
                >
                  <ExclamationTriangleIcon class="size-8" />
                </div>
                <div class="text-left">
                  <DialogTitle
                    as="h3"
                    class="text-xl font-semibold text-zinc-50"
                    >Manual Sync</DialogTitle
                  >
                  <div class="">
                    <p class="text-sm text-zinc-300">
                      Invite to all eligible users based on your configured
                      benefits.
                    </p>
                    <p class="mt-4 text-sm text-zinc-300">
                      Are you sure you want to sync all eligible users?
                    </p>
                  </div>
                </div>
              </div>

              <div class="mt-5 flex items-center justify-between sm:mt-6">
                <button
                  class="flex cursor-pointer items-center gap-x-1 rounded-lg border-t border-t-white/5 bg-white/5 px-3 py-1 text-sm tracking-wide text-zinc-200 shadow inset-shadow-transparent transition hover:bg-white/7 active:bg-zinc-800 active:inset-shadow-xs active:inset-shadow-black/50"
                  @click="closeDialog"
                  type="button"
                >
                  Back
                </button>

                <button
                  class="flex cursor-pointer items-center gap-x-1.5 rounded-[7px] border-t border-t-amber-400 bg-linear-to-b/oklch from-amber-600 to-amber-800 px-3 py-1 text-sm font-medium tracking-wide text-amber-50 inset-shadow-sm ring-1 ring-zinc-950 transition [text-shadow:_0px_2px_2px_rgba(0,0,0,0.35)] hover:border-t-amber-300 hover:from-amber-500 hover:to-amber-700 hover:text-white active:border-t-amber-950 active:from-amber-800 active:to-amber-800 active:inset-shadow-black/50"
                  @click="handleSync"
                  type="button"
                >
                  <svg
                    class="size-4 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    v-if="false"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {{ isSyncing ? 'Syncing...' : 'Sync' }}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
