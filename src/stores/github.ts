import { defineStore } from 'pinia'
import router from '@/router'

import {
  Configuration,
  DefaultApi,
  ResponseError,
  type GithubAccount,
} from '@/api'

const config: Configuration = new Configuration({
  credentials: 'include',
})
const api = new DefaultApi(config)

export const useGitHubStore = defineStore({
  id: 'github',
  state: () => ({
    returnUrl: null,
    isConnecting: false,
    isLoading: false,
    githubProfile: null as GithubAccount | null,
    error: false,
  }),
  actions: {
    async fetchGitHubProfile() {
      try {
        this.isLoading = true
        const resp = await api.getGithubProfile()
        this.githubProfile = resp
        this.isLoading = false
      } catch (err) {
        this.isLoading = false
        this.error = true

        if (err instanceof ResponseError) {
          // alert(err.response.body)
          console.log(err.response.body)
          return
        }

        // alert(err)
        console.log(err)
      }
    },

    async connect() {
      const wwwUrl = import.meta.env.VITE_WWW_URL ?? 'https://www.patrehub.com'
      const apiUrl = import.meta.env.VITE_API_URL ?? 'https://api.patrehub.com'
      const urlPath = `/auth/github?redirect=${encodeURIComponent(wwwUrl)}`
      const opts = {
        method: 'GET',
        credentials: 'include' as RequestCredentials,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }

      try {
        this.isConnecting = true
        const response = await fetch(`${apiUrl}${urlPath}`, opts)
        if (response.ok) {
          const { url } = await response.json()
          window.location.href = url
        }
        if (response.status >= 300) {
          const body = await response.text()
          throw new Error(`Error: ${response.status} - ${body}`)
        }
      } catch (error) {
        console.error(error)
        router.push('/error?message=Failed to connect to GitHub')
      } finally {
        this.isConnecting = false
      }
    },
    disconnect() {
      router.push('/')
    },
  },
})
