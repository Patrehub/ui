<script setup lang="tsx">
let { isOpen, tier } = defineProps<{
  tier: PatreonReward | null
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
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'

import {
  CheckIcon,
  ChevronUpDownIcon,
  UserGroupIcon,
  UserIcon,
} from '@heroicons/vue/16/solid'

import { useGithubInstallationsStore } from '@/stores/githubInstallations'
import { useGithubReposStore } from '@/stores/githubRepos'
import { useGitHubTeamsStore } from '@/stores/githubTeams'
import { useBenefitsStore } from '@/stores/benefits'
import { computed, onMounted, ref, watch } from 'vue'
import {
  PostBenefitRequestTypeEnum,
  type GithubInstallation,
  type GithubRepository,
  type GithubTeam,
  type PatreonReward,
  type PostBenefitRequest,
} from '@/api'
import { InformationCircleIcon } from '@heroicons/vue/20/solid'

const isLoading = ref(true)

const gitHubStore = useGithubInstallationsStore()
const githubReposStore = useGithubReposStore()
const githubTeamsStore = useGitHubTeamsStore()
const benefitsStore = useBenefitsStore()

const githubInstallations = computed(() => {
  return gitHubStore.getGithubInstallations?.installations ?? []
})

const githubRepos = computed(() => {
  return githubReposStore.getGithubRepos ?? []
})
const githubTeams = computed(() => {
  return githubTeamsStore.getGitHubTeams ?? []
})

const githubReposLoaded = ref(false)
const githubTeamsLoaded = ref(false)

onMounted(async () => {
  if (!githubInstallations.value) {
    isLoading.value = true
    await gitHubStore.fetchGithubInstallations()
    isLoading.value = false
  } else {
    isLoading.value = false
    await gitHubStore.fetchGithubInstallations()
  }
})

const inviteType = ref<'team' | 'contributor'>('contributor')
function setInviteType(type: 'team' | 'contributor') {
  inviteType.value = type
}

const selectedInstallation = ref<GithubInstallation | null>(null)
const selectedRepo = ref<GithubRepository | null>(null)
const selectedTeam = ref<GithubTeam | null>(null)

watch(selectedInstallation, async value => {
  if (value && inviteType.value === 'contributor') {
    githubReposLoaded.value = false
    selectedRepo.value = null
    await githubReposStore.fetchGithubRepos(value.id)
    githubReposLoaded.value = true
  } else if (value && inviteType.value === 'team') {
    githubTeamsLoaded.value = false
    selectedTeam.value = null
    await githubTeamsStore.fetchGitHubTeams(value.id)
    githubTeamsLoaded.value = true
  }
})

watch(inviteType, async value => {
  if (value === 'contributor' && selectedInstallation.value) {
    githubReposLoaded.value = false
    selectedRepo.value = null
    await githubReposStore.fetchGithubRepos(selectedInstallation.value.id)
    githubReposLoaded.value = true
  } else if (value === 'team' && selectedInstallation.value) {
    githubTeamsLoaded.value = false
    selectedTeam.value = null
    await githubTeamsStore.fetchGitHubTeams(selectedInstallation.value.id)
    githubTeamsLoaded.value = true
  }

  formError.value = ''
})

// watch isOpen and reset values
watch(
  () => isOpen,
  value => {
    selectedInstallation.value = null
    selectedRepo.value = null
    selectedTeam.value = null
    inviteType.value = 'contributor'
    formError.value = ''
  },
)

function closeDialog() {
  emit('update:isOpen', false)
}

let formError = ref<string>('')

function validate() {
  if (gitHubStore.error) {
    formError.value = 'You must connect your GitHub account'
    return true
  }

  if (!selectedInstallation.value?.id) {
    formError.value = 'Please select an installation'
    return true
  }

  if (!tier?.id) {
    formError.value = 'Error: Tier not found'
    return true
  }

  if (inviteType.value === 'contributor' && !selectedRepo.value) {
    formError.value = 'Please select a repository'
    return true
  } else if (inviteType.value === 'team' && !selectedTeam.value) {
    formError.value = 'Please select a team'
    return true
  }

  formError.value = ''
  return false
}

const savingBenefit = ref(false)

async function handleSubmit() {
  // validate
  if (validate()) {
    return
  }

  let type =
    inviteType.value === 'contributor'
      ? PostBenefitRequestTypeEnum.Repository
      : PostBenefitRequestTypeEnum.Team

  let data: PostBenefitRequest = {
    installationId: parseInt(selectedInstallation.value!.id),
    tierId: parseInt(tier!.id),
    type: type,
    ...(inviteType.value === 'contributor'
      ? { repository: selectedRepo.value!.fullName }
      : { teamId: selectedTeam.value!.id }),
  }

  savingBenefit.value = true
  let result = await benefitsStore.saveBenefit(data)

  if (result) {
    savingBenefit.value = false
    closeDialog()
    await benefitsStore.fetchBenefits()
  } else {
    savingBenefit.value = false
    formError.value = 'Failed to save benefit'
  }
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
              class="relative transform rounded-2xl border-y border-t-white/15 border-b-zinc-950/20 bg-zinc-900 px-4 pt-5 pb-4 text-left inset-shadow-sm ring shadow-xl shadow-zinc-950 ring-zinc-950 inset-shadow-zinc-800 transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6"
            >
              <form @submit.prevent="handleSubmit">
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
                      {{ tier?.title }}
                    </p>
                  </div>

                  <div class="mt-4 space-y-4 text-left text-sm text-zinc-200">
                    <div>
                      <label>Add supporters as</label>

                      <div
                        class="relative mt-1 flex items-center gap-x-1 rounded-lg border border-white/5 bg-zinc-800"
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
                          type="button"
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
                          type="button"
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

                    <div>
                      <Listbox as="div" v-model="selectedInstallation">
                        <ListboxLabel class="text-sm text-zinc-200"
                          >Select Installation</ListboxLabel
                        >
                        <div class="relative mt-2">
                          <ListboxButton
                            class="bg-zinc-925 grid w-full grid-cols-1 rounded-lg border-b border-t-zinc-950 border-b-zinc-800 py-2 pr-2 pl-3 text-left text-slate-200 inset-shadow-sm inset-shadow-zinc-950/60 transition"
                          >
                            <span
                              v-if="selectedInstallation"
                              class="col-start-1 row-start-1 flex items-center gap-3 pr-6"
                            >
                              <img
                                :src="selectedInstallation?.account.avatarUrl"
                                class="size-5 shrink-0 rounded-full ring ring-zinc-950/25 outline -outline-offset-1 outline-white/25"
                              />
                              <span class="block truncate">{{
                                selectedInstallation?.account.login
                              }}</span>
                            </span>

                            <span
                              v-else
                              class="col-start-1 row-start-1 flex items-center gap-3 pr-6"
                            >
                              <span class="block truncate text-zinc-400"
                                >{{
                                  githubInstallations.length
                                }}
                                Installations</span
                              >
                            </span>

                            <ChevronUpDownIcon
                              class="col-start-1 row-start-1 size-5 self-center justify-self-end text-zinc-500 sm:size-4"
                              aria-hidden="true"
                            />
                          </ListboxButton>

                          <transition
                            leave-active-class="transition ease-in duration-100"
                            leave-from-class="opacity-100"
                            leave-to-class="opacity-0"
                          >
                            <ListboxOptions
                              class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-lg border border-y border-zinc-800/70 border-t-zinc-800 bg-zinc-900/90 p-0.5 text-base ring shadow-md shadow-black/50 ring-zinc-950/85 backdrop-blur-md focus:outline-none sm:text-sm"
                            >
                              <ListboxOption
                                as="template"
                                v-for="install in githubInstallations"
                                :key="install.id"
                                :value="install"
                                v-slot="{ active, selected }"
                              >
                                <li
                                  :class="[
                                    active
                                      ? 'border-t-white/6 from-white/6 to-white/6 text-white shadow outline-none'
                                      : 'from-transparent to-transparent text-zinc-300',
                                    'relative mt-0.5 cursor-pointer rounded-[6.5px] border-t border-transparent bg-linear-to-b/oklch py-2 pr-9 pl-3 transition select-none first:mt-0',
                                  ]"
                                >
                                  <div class="flex items-center">
                                    <img
                                      :src="install.account.avatarUrl"
                                      alt=""
                                      class="size-5 shrink-0 rounded-full ring ring-zinc-950/25 outline -outline-offset-1 outline-white/25"
                                    />
                                    <span
                                      :class="[
                                        selected
                                          ? 'font-semibold'
                                          : 'font-normal',
                                        'ml-3 block truncate',
                                      ]"
                                      >{{ install.account.login }}</span
                                    >
                                  </div>

                                  <span
                                    v-if="selected"
                                    :class="[
                                      active ? 'text-white' : 'text-blue-500',
                                      'absolute inset-y-0 right-0 flex items-center pr-4 transition',
                                    ]"
                                  >
                                    <CheckIcon
                                      class="size-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                </li>
                              </ListboxOption>
                            </ListboxOptions>
                          </transition>
                        </div>
                      </Listbox>
                    </div>

                    <!-- REPOS -->
                    <!-- REPOS -->
                    <!-- REPOS -->
                    <!-- REPOS -->
                    <div>
                      <Listbox
                        as="div"
                        v-model="selectedRepo"
                        v-if="
                          selectedInstallation && inviteType === 'contributor'
                        "
                      >
                        <ListboxLabel class="text-sm text-zinc-200"
                          >Select Repository</ListboxLabel
                        >
                        <div class="relative mt-2">
                          <ListboxButton
                            class="bg-zinc-925 grid w-full cursor-default grid-cols-1 rounded-lg border-b border-t-zinc-950 border-b-zinc-800 py-2 pr-2 pl-3 text-left text-slate-200 inset-shadow-sm inset-shadow-zinc-950/60 transition"
                          >
                            <span
                              v-if="selectedRepo"
                              class="col-start-1 row-start-1 flex items-center gap-3 pr-6"
                            >
                              <img
                                :src="selectedRepo?.owner.avatarUrl"
                                class="size-5 shrink-0 rounded-full ring ring-zinc-950/25 outline -outline-offset-1 outline-white/25"
                              />
                              <span class="block truncate">{{
                                selectedRepo?.fullName
                              }}</span>
                            </span>

                            <span
                              v-else-if="!githubReposLoaded"
                              class="col-start-1 row-start-1 flex items-center gap-3 pr-6"
                            >
                              <span
                                class="flex items-center gap-x-1.5 truncate text-zinc-400"
                              >
                                <svg
                                  class="size-4 animate-spin text-zinc-400"
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
                                Loading...</span
                              >
                            </span>

                            <span
                              v-else
                              class="col-start-1 row-start-1 flex items-center gap-3 pr-6"
                            >
                              <span class="block truncate text-zinc-400"
                                >{{ githubRepos.length }} Repositories</span
                              >
                            </span>

                            <ChevronUpDownIcon
                              class="col-start-1 row-start-1 size-5 self-center justify-self-end text-zinc-500 sm:size-4"
                              aria-hidden="true"
                            />
                          </ListboxButton>

                          <transition
                            leave-active-class="transition ease-in duration-100"
                            leave-from-class="opacity-100"
                            leave-to-class="opacity-0"
                          >
                            <ListboxOptions
                              class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-lg border border-y border-zinc-800/70 border-t-zinc-800 bg-zinc-900/90 p-0.5 text-base ring shadow-md shadow-black/50 ring-zinc-950/85 backdrop-blur-md focus:outline-none sm:text-sm"
                            >
                              <ListboxOption
                                as="template"
                                v-for="repo in githubRepos"
                                :key="repo.id"
                                :value="repo"
                                v-slot="{ active, selected }"
                              >
                                <li
                                  :class="[
                                    active
                                      ? 'border-t-white/6 from-white/6 to-white/6 text-white shadow outline-none'
                                      : 'from-transparent to-transparent text-zinc-300',
                                    'relative mt-0.5 cursor-pointer rounded-[6.5px] border-t border-transparent bg-linear-to-b/oklch py-2 pr-9 pl-3 transition select-none first:mt-0',
                                  ]"
                                >
                                  <div class="flex items-center">
                                    <img
                                      :src="repo.owner.avatarUrl"
                                      alt=""
                                      class="size-5 shrink-0 rounded-full ring ring-zinc-950/25 outline -outline-offset-1 outline-white/25"
                                    />
                                    <span
                                      :class="[
                                        selected
                                          ? 'font-semibold'
                                          : 'font-normal',
                                        'ml-3 block truncate text-xs tracking-wide text-zinc-400',
                                      ]"
                                      >{{
                                        selectedInstallation?.account.login
                                      }}/
                                    </span>
                                    <span
                                      :class="[
                                        selected
                                          ? 'font-semibold'
                                          : 'font-normal',
                                        'ml-1 block truncate tracking-wide',
                                      ]"
                                      >{{ repo.name }}</span
                                    >
                                  </div>

                                  <span
                                    v-if="selected"
                                    :class="[
                                      active ? 'text-white' : 'text-blue-500',
                                      'absolute inset-y-0 right-0 flex items-center pr-4 transition',
                                    ]"
                                  >
                                    <CheckIcon
                                      class="size-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                </li>
                              </ListboxOption>
                            </ListboxOptions>
                          </transition>
                        </div>
                      </Listbox>
                    </div>

                    <!-- TEAMS -->
                    <!-- TEAMS -->
                    <!-- TEAMS -->
                    <!-- TEAMS -->
                    <div>
                      <div
                        v-if="
                          selectedInstallation &&
                          inviteType === 'team' &&
                          selectedInstallation.account.type === 'User'
                        "
                        class="flex items-center gap-x-1.5 rounded-full border-y border-t-white/5 border-b-zinc-950/20 bg-red-300/5 px-2 py-1 text-sm text-red-200 shadow"
                      >
                        <InformationCircleIcon class="size-4" />
                        Installation must be an Organization
                      </div>

                      <Listbox
                        as="div"
                        v-model="selectedTeam"
                        v-if="
                          selectedInstallation &&
                          inviteType === 'team' &&
                          selectedInstallation.account.type === 'Organization'
                        "
                      >
                        <ListboxLabel class="text-sm text-zinc-200"
                          >Select Team</ListboxLabel
                        >
                        <div class="relative mt-2">
                          <ListboxButton
                            class="bg-zinc-925 grid w-full cursor-default grid-cols-1 rounded-lg border-b border-t-zinc-950 border-b-zinc-800 py-2 pr-2 pl-3 text-left text-slate-200 inset-shadow-sm inset-shadow-zinc-950/60 transition"
                          >
                            <span
                              v-if="selectedTeam"
                              class="col-start-1 row-start-1 flex items-center gap-3 pr-6"
                            >
                              <img
                                :src="selectedInstallation.account.avatarUrl"
                                class="size-5 shrink-0 rounded-full ring ring-zinc-950/25 outline -outline-offset-1 outline-white/25"
                              />
                              <span class="block truncate">{{
                                selectedTeam?.name
                              }}</span>
                            </span>

                            <span
                              v-else-if="!githubTeamsLoaded"
                              class="col-start-1 row-start-1 flex items-center gap-3 pr-6"
                            >
                              <span
                                class="flex items-center gap-x-1.5 truncate text-zinc-400"
                              >
                                <svg
                                  class="size-4 animate-spin text-zinc-400"
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
                                Loading...</span
                              >
                            </span>

                            <span
                              v-else
                              class="col-start-1 row-start-1 flex items-center gap-3 pr-6"
                            >
                              <span class="block truncate text-zinc-400"
                                >{{ githubTeams.length }} Team{{
                                  githubTeams.length != 1 ? 's' : ''
                                }}</span
                              >
                            </span>

                            <ChevronUpDownIcon
                              class="col-start-1 row-start-1 size-5 self-center justify-self-end text-zinc-500 sm:size-4"
                              aria-hidden="true"
                            />
                          </ListboxButton>

                          <transition
                            leave-active-class="transition ease-in duration-100"
                            leave-from-class="opacity-100"
                            leave-to-class="opacity-0"
                          >
                            <ListboxOptions
                              class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-lg border border-y border-zinc-800/70 border-t-zinc-800 bg-zinc-900/90 p-0.5 text-base ring shadow-md shadow-black/50 ring-zinc-950/85 backdrop-blur-md focus:outline-none sm:text-sm"
                            >
                              <ListboxOption
                                as="template"
                                v-for="team in githubTeams"
                                :key="team.id"
                                :value="team"
                                v-slot="{ active, selected }"
                              >
                                <li
                                  :class="[
                                    active
                                      ? 'border-t-white/6 from-white/6 to-white/6 text-white shadow outline-none'
                                      : 'from-transparent to-transparent text-zinc-300',
                                    'relative mt-0.5 cursor-pointer rounded-[6.5px] border-t border-transparent bg-linear-to-b/oklch py-2 pr-9 pl-3 transition select-none first:mt-0',
                                  ]"
                                >
                                  <div class="flex items-center">
                                    <img
                                      :src="
                                        selectedInstallation.account.avatarUrl
                                      "
                                      alt=""
                                      class="size-5 shrink-0 rounded-full ring ring-zinc-950/25 outline -outline-offset-1 outline-white/25"
                                    />
                                    <span
                                      :class="[
                                        selected
                                          ? 'font-semibold'
                                          : 'font-normal',
                                        'ml-3 block truncate text-xs tracking-wide text-zinc-400',
                                      ]"
                                      >{{
                                        selectedInstallation?.account.login
                                      }}/
                                    </span>
                                    <span
                                      :class="[
                                        selected
                                          ? 'font-semibold'
                                          : 'font-normal',
                                        'ml-1 block truncate tracking-wide',
                                      ]"
                                      >{{ team.name }}</span
                                    >
                                  </div>

                                  <span
                                    v-if="selected"
                                    :class="[
                                      active ? 'text-white' : 'text-blue-500',
                                      'absolute inset-y-0 right-0 flex items-center pr-4 transition',
                                    ]"
                                  >
                                    <CheckIcon
                                      class="size-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                </li>
                              </ListboxOption>
                            </ListboxOptions>
                          </transition>
                        </div>
                      </Listbox>
                    </div>
                    <div
                      v-if="formError.length > 0"
                      class="flex items-center gap-x-1.5 rounded-full border-y border-t-white/5 border-b-zinc-950/20 bg-red-300/5 px-2 py-1 text-sm text-red-200 shadow"
                    >
                      <InformationCircleIcon class="size-4" />
                      {{ formError }}
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
                    class="flex cursor-pointer items-center gap-x-1.5 rounded-[7px] border-t border-t-blue-400 bg-linear-to-b/oklch from-blue-600 to-blue-800 px-3 py-1 text-sm font-medium tracking-wide text-blue-50 inset-shadow-sm ring-1 ring-zinc-950 transition [text-shadow:_0px_2px_2px_rgba(0,0,0,0.35)] hover:border-t-blue-300 hover:from-blue-500 hover:to-blue-700 hover:text-white active:border-t-blue-950 active:from-blue-800 active:to-blue-800 active:inset-shadow-black/50"
                    type="submit"
                  >
                    <svg
                      class="size-4 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      v-if="savingBenefit"
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
                    {{ savingBenefit ? 'Adding...' : 'Add Benefit' }}
                  </button>
                </div>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
