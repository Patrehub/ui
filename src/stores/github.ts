import { defineStore } from 'pinia'
import router from '@/router'

export const useGitHubStore = defineStore({
  id: 'github',
  state: () => ({
    returnUrl: null,
    is_connecting: false,
  }),
  actions: {
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
        this.is_connecting = true
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
        this.is_connecting = false
      }
    },
    disconnect() {
      router.push('/')
    },
  },
})
