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

import { computed, onMounted, ref, watch } from 'vue'
import { useWebhooksStore } from '@/stores/webhooks'
import { TrashIcon } from '@heroicons/vue/24/outline'

const isDeleting = ref('')
const isLoading = ref(false)
const creatingWebhook = ref(false)

const webhooksStore = useWebhooksStore()
const webhooks = computed(() => {
  return webhooksStore.webhooks ?? []
})

watch(
  () => isOpen,
  async value => {
    if (value) {
      isLoading.value = true
      await webhooksStore.fetchWebhooks()
      isLoading.value = false
    }
  },
)

function closeDialog() {
  emit('update:isOpen', false)
}

async function handleDelete(id: string) {
  isDeleting.value = id
  await webhooksStore.deleteWebhook(id)
  isDeleting.value = ''

  await webhooksStore.fetchWebhooks()
}

async function handleCreateWebhook() {
  creatingWebhook.value = true
  await webhooksStore.createWebhook()
  creatingWebhook.value = false

  await webhooksStore.fetchWebhooks()
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
              <div class="mt-0">
                <DialogTitle as="h2" class="text-xl font-semibold text-zinc-50"
                  >Webhooks</DialogTitle
                >
                <div class="mt-2 mb-2">
                  <p class="text-sm text-zinc-300">
                    Webhooks allow us to receive real time updates from patreon
                    when you get a new patron or when a patron updates their
                    pledge.
                  </p>
                </div>
              </div>

              <div>
                <div class="mb-2 flex justify-end text-base text-zinc-200">
                  <div
                    class="rounded-lg border border-blue-400/30 bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-300 ring-inset"
                  >
                    {{ webhooks.length }} Webhook
                    {{ webhooks.length === 1 ? '' : 's' }}
                  </div>
                </div>

                <div
                  v-if="isLoading"
                  class="flex h-17 items-center justify-between rounded-xl border border-zinc-700/50 bg-zinc-800 p-4 text-sm shadow"
                ></div>

                <div
                  v-if="!isLoading && webhooks.length === 0"
                  class="flex h-20 items-center justify-center rounded-xl border-2 border-dashed border-white/5 bg-white/1 text-center"
                >
                  <div class="flex flex-col gap-1">
                    <p class="text-sm text-zinc-400">There are no webhooks</p>
                    <button
                      class="mx-auto flex w-fit cursor-pointer items-center justify-center gap-x-1 rounded-lg border-t border-t-white/5 bg-white/5 px-3 py-1 text-sm tracking-wide text-zinc-200 shadow inset-shadow-transparent transition hover:bg-white/7 active:bg-zinc-800 active:inset-shadow-xs active:inset-shadow-black/50"
                      @click="handleCreateWebhook"
                      type="button"
                    >
                      {{ creatingWebhook ? 'Adding...' : 'Add Webhook' }}
                    </button>
                  </div>
                </div>

                <div
                  v-if="!isLoading && webhooks.length > 0"
                  v-for="(wh, i) in webhooks"
                  class="flex items-center justify-between rounded-xl border-y border-t-white/5 border-b-zinc-950/20 bg-white/5 p-4 text-sm shadow"
                >
                  <div class="flex flex-col">
                    <p class="font-medium text-zinc-200">Webhook {{ i + 1 }}</p>
                    <p class="text-xs font-medium text-zinc-400">
                      {{
                        wh.createdAt
                          ?.toISOString()
                          .slice(0, 16)
                          .replace('T', ' ')
                      }}
                    </p>
                  </div>

                  <button
                    class="cursor-pointer rounded-full text-white/80 transition hover:bg-red-500/20 hover:text-red-200"
                    @click="() => handleDelete(wh.id)"
                  >
                    <svg
                      v-if="isDeleting === wh.id"
                      class="m-1 size-5 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
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

                    <TrashIcon v-else class="m-1 size-5" />
                  </button>
                </div>
              </div>

              <div
                class="mt-5 flex flex-row-reverse items-center justify-between sm:mt-6"
              >
                <!-- <button
                    class="flex cursor-pointer items-center gap-x-1 rounded-lg border-t border-t-white/5 bg-white/5 px-3 py-1 text-sm tracking-wide text-zinc-200 shadow inset-shadow-transparent transition hover:bg-white/7 active:bg-zinc-800 active:inset-shadow-xs active:inset-shadow-black/50"
                    @click="closeDialog"
                    type="button"
                  >
                    Back
                  </button> -->

                <button
                  class="flex cursor-pointer items-center gap-x-1.5 rounded-[7px] border-t border-t-blue-400 bg-linear-to-b/oklch from-blue-600 to-blue-800 px-3 py-1 text-sm font-medium tracking-wide text-blue-50 inset-shadow-sm ring-1 ring-zinc-950 transition [text-shadow:_0px_2px_2px_rgba(0,0,0,0.35)] hover:border-t-blue-300 hover:from-blue-500 hover:to-blue-700 hover:text-white active:border-t-blue-950 active:from-blue-800 active:to-blue-800 active:inset-shadow-black/50"
                  @click="closeDialog"
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
                  {{ false ? 'Adding...' : 'Done' }}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
