import { defineStore } from 'pinia'
import {
  Configuration,
  DefaultApi,
  ResponseError,
  type PatreonUser,
  type Webhook,
} from '@/api'

const config: Configuration = new Configuration({
  credentials: 'include',
})
const api = new DefaultApi(config)

export const useWebhooksStore = defineStore({
  id: 'webhooks',
  state: () => ({
    webhooks: Array<Webhook>(),
    isLoading: false,
  }),
  getters: {
    getPatreonProfile(state) {
      return state.webhooks
    },
  },
  actions: {
    async fetchWebhooks() {
      try {
        this.isLoading = true
        const resp = await api.getWebhooks()
        this.webhooks = resp
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

    async createWebhook() {
      try {
        this.isLoading = true
        await api.postWebhook()
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

    async deleteWebhook(webhookId: string) {
      try {
        this.isLoading = true
        await api.deleteWebhook({
          id: webhookId,
        })
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
