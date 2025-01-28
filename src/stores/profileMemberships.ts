import { defineStore } from 'pinia'
import {
  Configuration,
  DefaultApi,
  ResponseError,
  type Membership,
} from '@/api'

const config: Configuration = new Configuration({
  credentials: 'include',
})
const api = new DefaultApi(config)

export const useProfileMembershipsStore = defineStore({
  id: 'profileMemberships',
  state: () => ({
    profileMemberships: Array<Membership>(),
    isLoading: false,
  }),
  getters: {
    getProfileMemberships(state) {
      return state.profileMemberships
    },
  },
  actions: {
    async fetchProfileMemberships() {
      try {
        this.isLoading = true
        const resp = await api.getProfileMemberships()
        this.profileMemberships = resp
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
