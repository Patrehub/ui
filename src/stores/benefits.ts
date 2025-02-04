import { defineStore } from 'pinia'
import { Configuration, DefaultApi, ResponseError, type Benefit } from '@/api'

const config: Configuration = new Configuration({
  credentials: 'include',
})
const api = new DefaultApi(config)

export const useBenefitsStore = defineStore({
  id: 'benefits',
  state: () => ({
    benefits: Array<Benefit>(),
    isLoading: false,
  }),
  getters: {
    getBenefits(state) {
      return state.benefits
    },
  },
  actions: {
    async fetchBenefits() {
      try {
        this.isLoading = true
        const resp = await api.postBenefit({})
        // this.benefits = resp
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
