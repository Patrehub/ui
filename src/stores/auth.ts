import { defineStore } from 'pinia'
import router from '@/router'

const getLocalUser = () => {
  const user = localStorage.getItem('user')
  if (!user || user === 'undefined') {
    return null
  }
  const wrapped = JSON.parse(user)
  if (!wrapped) {
    return null
  }
  const { profile, expires } = wrapped
  const now = Date.now()
  if (expires && now > expires) {
    return null
  }
  return profile
}

const saveLocalUser = (profile: any, expires_in: number) => {
  const expires = Date.now() + expires_in * 1000
  const user = { profile, expires }
  localStorage.setItem('user', JSON.stringify(user))
}

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: getLocalUser(),
    returnUrl: null,
  }),
  actions: {
    async login() {
      const wwwUrl = import.meta.env.VITE_WWW_URL ?? 'https://www.patrehub.com'
      const apiUrl = import.meta.env.VITE_API_URL ?? 'https://api.patrehub.com'

      const urlPath = `/auth/patreon?redirect=${encodeURIComponent(wwwUrl)}`
      const opts = {
        method: 'GET',
        credentials: 'include' as RequestCredentials,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
      const response = await fetch(`${apiUrl}${urlPath}`, opts)
      if (response.ok) {
        const { url } = await response.json()
        window.location.href = url
      }

      if (response.status >= 300) {
        const body = await response.text()
        console.error(`Error: ${response.status} - ${body}`)
        router.push('/error?message=Failed to connect to GitHub')
      }
    },
    logout() {
      this.user = null
      localStorage.removeItem('user')
      router.push('/')
    },
    async codeExchange(path: string, code: any, state: any) {
      const wwwUrl = import.meta.env.VITE_WWW_URL ?? 'https://www.patrehub.com'
      const apiUrl = import.meta.env.VITE_API_URL ?? 'https://api.patrehub.com'
      const isPatreon = path.startsWith('/auth/patreon/')
      const urlPath = isPatreon ? '/auth/patreon' : '/auth/github'

      const opts = {
        method: 'POST',
        credentials: 'include' as RequestCredentials,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          state,
          redirect: encodeURIComponent(wwwUrl),
        }),
      }
      const response = await fetch(`${apiUrl}${urlPath}`, opts)
      // debugger

      if (response.status === 401) {
        this.logout()
        router.push('/')
      }

      // maybe do something else here.
      if (response.status === 403) {
        this.logout()
        router.push('/')
      }

      if (response.status >= 300) {
        const body = await response.text()
        console.error(`Error: ${response.status} - ${body}`)
        router.push('/')
      }

      if (response.ok && isPatreon) {
        const { token, profile } = await response.json()
        this.user = profile

        saveLocalUser(profile, token.expires_in)
      }

      router.push(this.returnUrl || '/dashboard')
    },
  },
})
