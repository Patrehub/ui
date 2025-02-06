import { defineStore } from 'pinia'
import {
  Configuration,
  DefaultApi,
  ResponseError,
  type GetGithubInstallationsResponse,
} from '@/api'

const config: Configuration = new Configuration({
  credentials: 'include',
})
const api = new DefaultApi(config)

export const useGithubInstallationsStore = defineStore({
  id: 'githubInstallations',
  state: () => ({
    githubInstallations: null as GetGithubInstallationsResponse | null,
    isLoading: false,
    error: false,
  }),
  getters: {
    getGithubInstallations(state) {
      return state.githubInstallations
    },
  },
  actions: {
    async fetchGithubInstallations() {
      try {
        this.isLoading = true
        const resp = await api.getGithubInstallations()
        this.githubInstallations = resp
        this.isLoading = false
      } catch (err) {
        this.isLoading = false
        this.error = true

        if (err instanceof ResponseError) {
          // alert(err.response.body)
          console.log(err.response.body)
          return
        }

        alert(err)
        // console.log(err)
      }
    },
  },
})
