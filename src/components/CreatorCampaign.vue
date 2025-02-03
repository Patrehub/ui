<script setup lang="tsx">
import type { PatreonCampaign } from '@/api'
import { ChevronDownIcon } from '@heroicons/vue/16/solid'

import { ref } from 'vue'

const dropDownOpen = ref(false)

const { campaign } = defineProps<{
  campaign: PatreonCampaign
  isLoading?: boolean
}>()

function cleanSummary(summary: string) {
  let element = document.createElement('div')

  element.innerHTML = summary

  return element.innerText
}
</script>

<template>
  <div
    class="bg-zinc-925 rounded-t-[25px] rounded-b-[25px] border-b border-b-zinc-700/50 inset-shadow-sm inset-shadow-zinc-950"
  >
    <div
      class="relative h-52 overflow-clip rounded-3xl border border-zinc-800 border-t-zinc-700/60 bg-[hsl(240,_5%,_8%)] p-3 text-zinc-300 ring ring-zinc-950"
    >
      <div
        class="pointer-events-none absolute inset-0 rounded-[15px] bg-cover bg-center"
        :style="{
          backgroundImage: `url('${campaign.imageUrl}')`,
          maskImage: 'linear-gradient(to top, transparent 25%, black 100%)',
        }"
      ></div>

      <div class="relative flex h-full flex-col-reverse justify-between">
        <div class="flex items-end justify-between">
          <div class="flex items-end gap-x-2.5">
            <img
              :src="campaign.avatarPhotoUrl"
              class="size-13 rounded-full bg-slate-500 object-cover ring ring-zinc-950 ring-offset-zinc-700 outline -outline-offset-1 outline-white/20"
            />

            <div class="flex flex-col">
              <div class="flex items-center gap-x-2.5">
                <h3 class="text-2xl font-medium text-white">
                  {{ campaign.name }}
                </h3>
                <a
                  target="_blank"
                  :href="`https://www.patreon.com/${campaign.url}`"
                  class="group text-sm tracking-wide"
                >
                  <div
                    class="flex items-center gap-x-0.5 text-zinc-300 transition hover:text-zinc-100"
                  >
                    <img
                      src="/patreon.svg"
                      class="size-4 opacity-80 transition group-hover:opacity-100"
                    />
                    /{{ campaign.url.replace('https://www.patreon.com/', '') }}
                  </div>
                </a>
              </div>

              <p class="mt-1 text-sm text-zinc-400">
                {{ cleanSummary(campaign.summary) }}
              </p>
            </div>
          </div>

          <div class="flex gap-x-2">
            <div
              class="rounded-xl border border-white/10 bg-white/5 px-2 py-1 text-sm font-medium tracking-wide text-zinc-200 ring shadow ring-zinc-950/10 backdrop-blur-sm [text-shadow:_0px_1px_2px_rgba(0,0,0,0.3)]"
            >
              {{ campaign.patronCount }} Patrons
            </div>
            <div
              class="hidden rounded-xl border border-white/10 bg-white/5 px-2 py-1 text-sm font-medium tracking-wide text-zinc-200 ring shadow ring-zinc-950/10 backdrop-blur-sm [text-shadow:_0px_1px_2px_rgba(0,0,0,0.3)] md:block"
            >
              {{ campaign.rewards?.length }} Tiers
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
