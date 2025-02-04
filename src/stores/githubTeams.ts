import { defineStore } from 'pinia'
import {
  Configuration,
  DefaultApi,
  ResponseError,
  type GithubTeam,
} from '@/api'

const config: Configuration = new Configuration({
  credentials: 'include',
})
const api = new DefaultApi(config)

export const useGitHubTeamsStore = defineStore({
  id: 'githubTeams',
  state: () => ({
    githubTeams: Array<GithubTeam>(),
    isLoading: false,
  }),
  getters: {
    getGitHubTeams(state) {
      return state.githubTeams
    },
  },
  actions: {
    async fetchGitHubTeams(installationId: string) {
      try {
        this.isLoading = true
        const resp = await api.getGithubTeams({
          installationId: installationId,
        })
        this.githubTeams = resp
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
