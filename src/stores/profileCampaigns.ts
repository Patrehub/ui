import { defineStore } from 'pinia'
import { Configuration, DefaultApi, ResponseError, type Campaign } from '@/api'

const config: Configuration = new Configuration({
  credentials: 'include',
})
const api = new DefaultApi(config)

export const useProfileCampaignsStore = defineStore({
  id: 'ProfileCampaigns',
  state: () => ({
    ProfileCampaigns: Array<Campaign>(),
    isLoading: false,
  }),
  getters: {
    getProfileCampaigns(state) {
      return state.ProfileCampaigns
    },
  },
  actions: {
    async fetchProfileCampaigns() {
      try {
        this.isLoading = true
        const resp = await api.getProfileCampaigns()
        this.ProfileCampaigns = resp
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
