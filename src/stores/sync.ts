import { defineStore } from 'pinia'
import { Configuration, DefaultApi, ResponseError } from '@/api'

const config: Configuration = new Configuration({
  credentials: 'include',
})
const api = new DefaultApi(config)

export const useSyncStore = defineStore({
  id: 'sync',
  state: () => ({
    isLoading: false,
  }),
  actions: {
    async sync() {
      try {
        this.isLoading = true
        const resp = await api.postSync()
        this.isLoading = false
      } catch (err) {
        this.isLoading = false

        if (err instanceof ResponseError) {
          alert(err.response.body)
          console.log(err.response.body)
          return
        }

        alert(err)
        console.log(err)
      }
    },
  },
})
