<script setup lang="ts">
import { ExclamationCircleIcon } from '@heroicons/vue/16/solid'
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
  type ColumnDef,
} from '@tanstack/vue-table'

const { data, columns } = defineProps<{
  data: any[]
  columns: ColumnDef<any, any>[]
  isLoading?: boolean
}>()

const table = useVueTable({
  get data() {
    return data
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
})
</script>

<template>
  <div
    class="rounded-2xl border border-zinc-800 bg-zinc-950 p-2 inset-shadow-sm inset-shadow-black"
  >
    <div
      class="overflow-clip rounded-lg border border-zinc-800/50 bg-zinc-900 px-4 sm:px-6 lg:px-8"
    >
      <div class="flow-root">
        <div class="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle">
            <table
              class="min-w-full border-separate border-spacing-0 overflow-clip rounded-[7px]"
            >
              <thead>
                <tr
                  v-for="headerGroup in table.getHeaderGroups()"
                  :key="headerGroup.id"
                  class="sticky top-0 z-10 shadow-xs shadow-zinc-950/70"
                >
                  <th
                    v-for="header in headerGroup.headers"
                    :key="header.id"
                    :colSpan="header.colSpan"
                    class="border-b border-b-zinc-800/50 bg-[hsla(240,_4%,_12%,_0.9)] py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-zinc-50 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                  >
                    <FlexRender
                      v-if="!header.isPlaceholder"
                      :render="header.column.columnDef.header"
                      :props="header.getContext()"
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-if="table.getRowModel().rows.length === 0"
                  class="text-center text-zinc-400"
                >
                  <td class="py-4 text-center" colspan="99">
                    <span
                      v-if="isLoading !== undefined && isLoading"
                      class="flex items-center justify-center gap-x-1.5 text-sm tracking-wide text-zinc-500"
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
                      Loading...
                    </span>

                    <span
                      v-else-if="!isLoading"
                      class="flex items-center justify-center gap-x-1.5 text-sm tracking-wide text-zinc-500"
                    >
                      <ExclamationCircleIcon class="size-4" />
                      No data
                    </span>
                  </td>
                </tr>
                <tr
                  v-else
                  v-for="row in table.getRowModel().rows"
                  :key="row.id"
                  class="group inset-shadow-2xs inset-shadow-[hsl(240,_6%,_12%)] even:bg-[hsl(240,_6%,_11%)]"
                >
                  <td
                    v-for="cell in row.getVisibleCells()"
                    :key="cell.id"
                    class="py-4 pr-3 pl-4 text-sm text-zinc-200 sm:pl-6 lg:pl-8"
                  >
                    <FlexRender
                      :render="cell.column.columnDef.cell"
                      :props="cell.getContext()"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
