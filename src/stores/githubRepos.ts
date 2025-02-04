import { defineStore } from 'pinia'
import {
  Configuration,
  DefaultApi,
  ResponseError,
  type GithubRepository,
} from '@/api'

const config: Configuration = new Configuration({
  credentials: 'include',
})
const api = new DefaultApi(config)

export const useGithubReposStore = defineStore({
  id: 'githubRepos',
  state: () => ({
    githubRepos: Array<GithubRepository>(),
    isLoading: false,
  }),
  getters: {
    getGithubRepos(state) {
      return state.githubRepos
    },
  },
  actions: {
    async fetchGithubRepos(installationId: string) {
      try {
        this.isLoading = true
        const resp = await api.getGithubRepositories({
          installationId: installationId,
        })
        this.githubRepos = resp
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
