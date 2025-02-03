<script setup lang="tsx">
let { isOpen } = defineProps<{
  isOpen: boolean
  isLoading?: boolean
}>()

const emit = defineEmits(['update:isOpen'])

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'

import {
  ArrowLeftIcon,
  BookmarkIcon,
  UserGroupIcon,
  UserIcon,
} from '@heroicons/vue/16/solid'

import { useGithubInstallationsStore } from '@/stores/githubInstallations'
import { computed, ref, type Ref } from 'vue'

const gitHubStore = useGithubInstallationsStore()
const githubInstallations = computed(() => {
  return gitHubStore.getGithubInstallations
})

const inviteType = ref<'team' | 'contributor'>('team')
function setInviteType(type: 'team' | 'contributor') {
  inviteType.value = type
}

function closeDialog() {
  emit('update:isOpen', false)
}

import { useForm } from '@tanstack/vue-form'

const form = useForm({
  defaultValues: {
    fullName: '',
  },
  onSubmit: async ({ value }) => {
    // Do something with form data
    console.log(value)
  },
})
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
              class="border-b-zinc-925 relative transform overflow-hidden rounded-2xl border-y border-t-zinc-700 bg-zinc-900 px-4 pt-5 pb-4 text-left inset-shadow-sm ring shadow-xl shadow-zinc-950 ring-zinc-950 inset-shadow-zinc-800 transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6"
            >
              <div>
                <div
                  class="mx-auto flex size-14 items-center justify-center rounded-full bg-zinc-800 inset-shadow-2xs ring ring-zinc-950 inset-shadow-zinc-700"
                >
                  <img src="/github.svg" class="size-10 rounded-full" />
                </div>
                <div class="mt-3 text-center sm:mt-5">
                  <DialogTitle
                    as="h3"
                    class="text-base font-semibold text-zinc-50"
                    >Add Repo Benefits</DialogTitle
                  >
                  <div class="mt-2">
                    <p class="text-sm text-zinc-200">
                      <!-- {{ tier.title }} -->
                    </p>
                  </div>

                  <form
                    @submit="
                      e => {
                        e.preventDefault()
                        e.stopPropagation()
                        form.handleSubmit()
                      }
                    "
                  >
                    <div class="mt-4 text-left">
                      <div class="text-sm text-zinc-200">
                        <label>Add supporters as</label>

                        <div
                          class="relative mt-1 flex items-center gap-x-1 rounded-lg border border-zinc-700 bg-zinc-800"
                        >
                          <div
                            :class="[
                              {
                                'left-[2px]': inviteType === 'contributor',
                                'left-[calc(50%+2px)]': inviteType === 'team',
                              },
                              'absolute inset-0.5 flex w-[calc(50%-4px)] items-center rounded-md border-t border-t-blue-400 bg-linear-to-b/oklch from-blue-600 to-blue-800 px-3 py-1 text-sm font-medium tracking-wide inset-shadow-sm shadow shadow-zinc-950/50 transition-all',
                            ]"
                          ></div>

                          <button
                            @click="setInviteType('contributor')"
                            :class="[
                              {
                                'text-white': inviteType === 'contributor',
                                'font-medium': inviteType === 'contributor',
                              },
                              'relative flex flex-1 cursor-pointer items-center justify-center gap-x-1 rounded-md p-1.5 text-center tracking-wide transition [text-shadow:_0px_2px_2px_rgba(0,0,0,0.2)] hover:text-white',
                            ]"
                          >
                            <UserIcon class="size-4.5 drop-shadow" />
                            Contributor
                          </button>
                          <button
                            @click="setInviteType('team')"
                            :class="[
                              {
                                'text-white': inviteType === 'team',
                                'font-medium': inviteType === 'team',
                              },
                              'relative flex flex-1 cursor-pointer items-center justify-center gap-x-1 rounded-md p-1.5 text-center tracking-wide transition [text-shadow:_0px_2px_2px_rgba(0,0,0,0.2)] hover:text-white',
                            ]"
                          >
                            <UserGroupIcon class="size-4.5 drop-shadow" />
                            Team Member
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div class="mt-5 flex items-center justify-between sm:mt-6">
                <button
                  class="ring-zinc-925 flex cursor-pointer items-center gap-x-1 rounded-lg border border-white/5 border-t-white/10 bg-zinc-800 px-3 py-1 text-sm tracking-wide text-zinc-200 ring inset-shadow-transparent transition hover:bg-zinc-700/40 active:bg-zinc-800 active:inset-shadow-xs active:inset-shadow-black/50"
                  @click="closeDialog"
                >
                  Back
                </button>

                <button
                  class="flex cursor-pointer items-center gap-x-1 rounded-[7px] border-t border-t-blue-400 bg-linear-to-b/oklch from-blue-600 to-blue-800 px-3 py-1 text-sm font-medium tracking-wide text-blue-50 inset-shadow-sm ring-1 ring-zinc-950 transition [text-shadow:_0px_2px_2px_rgba(0,0,0,0.35)] hover:border-t-blue-300 hover:from-blue-500 hover:to-blue-700 hover:text-white active:border-t-blue-950 active:from-blue-800 active:to-blue-800 active:inset-shadow-black/50"
                  @click="closeDialog"
                >
                  Save
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
