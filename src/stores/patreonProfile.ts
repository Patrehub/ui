import { defineStore } from 'pinia'
import {
  Configuration,
  DefaultApi,
  ResponseError,
  type PatreonUser,
} from '@/api'

const config: Configuration = new Configuration({
  credentials: 'include',
})
const api = new DefaultApi(config)

export const usePatreonProfileStore = defineStore({
  id: 'patreonProfile',
  state: () => ({
    patreonProfile: null as PatreonUser | null,
    isLoading: false,
  }),
  getters: {
    getPatreonProfile(state) {
      return state.patreonProfile
    },
  },
  actions: {
    async fetchPatreonProfile() {
      try {
        this.isLoading = true
        const resp = await api.getPatreonProfile()
        this.patreonProfile = resp
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
