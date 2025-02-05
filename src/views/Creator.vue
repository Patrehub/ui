<script setup lang="tsx">
import CreatorCampaigns from '@/components/CreatorCampaigns.vue'
import { computed, onMounted, ref, watch } from 'vue'

import { usePatreonProfileStore } from '@/stores'
import { useBenefitsStore } from '@/stores/benefits'
import type { Benefit, PatreonReward } from '@/api'

import { PlusIcon } from '@heroicons/vue/16/solid'

import InstallationModal from '../components/InstallationModal.vue'
import { TrashIcon } from '@heroicons/vue/24/outline'
import { ExclamationCircleIcon } from '@heroicons/vue/16/solid'

const isLoading = ref(true)

const store = usePatreonProfileStore()
const patreonProfile = computed(() => {
  return store.getPatreonProfile
})

const benefitsStore = useBenefitsStore()
const benefits = computed(() => {
  return benefitsStore.getBenefits
})

type BenefitRecord = {
  [key: string]: [Benefit]
}
const sortedBenefits = ref<BenefitRecord>({})

const isOpen = ref(false)
function setIsOpen(value: boolean) {
  isOpen.value = value
}

const tier = ref<PatreonReward | null>(null)
function setTier(newTier: any) {
  tier.value = newTier
  setIsOpen(true)
}

onMounted(async () => {
  isLoading.value = true
  await benefitsStore.fetchBenefits()
  isLoading.value = false
})

watch(benefits, () => {
  let obj: BenefitRecord = {}

  benefits.value.forEach((benefit: Benefit) => {
    if (!obj[benefit.tierId]) {
      obj[benefit.tierId] = [benefit]
    } else {
      obj[benefit.tierId].push(benefit)
    }
  })

  sortedBenefits.value = obj
})

const isDeleting = ref(false)

async function deleteBenefit(id: string) {
  isDeleting.value = true
  await benefitsStore.deleteBenefit(id)
  isDeleting.value = false

  await benefitsStore.fetchBenefits()
}

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
  <main class="flex-auto">
    <div class="mt-12 sm:px-8">
      <div class="mx-auto w-full max-w-7xl lg:px-8">
        <div class="relative px-4 sm:px-8 lg:px-12">
          <div class="mx-auto max-w-2xl lg:max-w-5xl">
            <header class="max-w-2xl">
              <h1
                class="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100"
              >
                Creator Dashboard
              </h1>
            </header>
            <div class="mt-6">
              <CreatorCampaigns />
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
                    class="h-66 animate-pulse rounded-2xl border border-zinc-700/50 bg-zinc-800"
                  ></div>
                </div>

                <div
                  v-if="!isLoading && patreonProfile?.campaign"
                  class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
                >
                  <div
                    v-for="(tier, i) in patreonProfile?.campaign.rewards"
                    class="relative rounded-2xl border-y border-zinc-700/50 border-t-white/10 border-b-zinc-950/50 bg-radial-[at_0%_0%] from-white/6 to-white/3 p-4 shadow-md"
                  >
                    <div class="relative">
                      <p
                        class="text-base font-medium tracking-wider text-zinc-200"
                      >
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

                      <div class="mt-3 flex items-center justify-between">
                        <p class="text-sm font-medium tracking-wide text-white">
                          Repo Benefits
                        </p>

                        <button
                          class="ring-zinc-925 flex cursor-pointer items-center gap-x-0.5 rounded-lg border-t border-t-white/6 bg-white/5 p-0.5 px-2 text-sm tracking-wide shadow inset-shadow-transparent transition hover:bg-white/10 active:bg-white/3"
                          @click="setTier(tier)"
                        >
                          <PlusIcon class="size-4 text-zinc-200" />
                        </button>
                      </div>

                      <div
                        class="mt-2 border-y border-t-zinc-950 border-b-white/9"
                      ></div>

                      <div class="mt-2 gap-1.5 space-y-0.5">
                        <button
                          v-if="!sortedBenefits[tier.id]"
                          @click="setTier(tier)"
                          class="group flex w-full cursor-pointer items-center justify-center gap-x-1.5 rounded-lg border-y border-transparent bg-white/0 px-1 py-1 text-center text-sm font-normal text-zinc-300/70 transition hover:border-t-white/10 hover:border-b-zinc-950/30 hover:bg-white/5 hover:text-white hover:shadow"
                        >
                          Add Benefit
                        </button>

                        <div
                          v-for="bene in sortedBenefits[tier.id]"
                          class="group flex items-center justify-between gap-x-1.5 rounded-xl border-y border-transparent bg-white/0 px-1 py-0.5 pr-1.5 transition hover:border-t-white/10 hover:border-b-zinc-950/30 hover:bg-white/5 hover:shadow"
                        >
                          <div class="flex items-center gap-x-2">
                            <div class="my-1 ml-1">
                              <img
                                src="/github.svg"
                                class="size-5.5 rounded-full bg-linear-to-b from-zinc-500 to-zinc-700 p-1 shadow"
                              />
                            </div>
                            <p
                              class="cursor-default text-sm tracking-wide text-zinc-300"
                            >
                              {{
                                bene.type === 'team'
                                  ? bene.type
                                  : bene.repository
                              }}
                            </p>
                          </div>

                          <button
                            class="cursor-pointer rounded-full text-white/80 transition group-hover:opacity-100 hover:bg-white/5 hover:text-white/98 lg:opacity-0"
                            @click="() => deleteBenefit(bene.id)"
                          >
                            <svg
                              v-if="isDeleting"
                              class="m-1 size-4.5 animate-spin text-white"
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

                            <TrashIcon v-else class="m-1 size-4.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <InstallationModal :tier="tier" v-model:isOpen="isOpen" />
  </main>
</template>
