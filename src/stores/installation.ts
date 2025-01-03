import { defineStore } from 'pinia'
import {
  Configuration,
  DefaultApi,
  ResponseError,
  type Installation,
  type PostInstallationRequest,
} from '@/api'
import { v4 as uuidv4 } from 'uuid'

const config: Configuration = new Configuration({
  credentials: 'include',
})
const api = new DefaultApi(config)

export const useInstallationStore = defineStore({
  id: 'installation',
  state: () => ({
    installations: Array<Installation>(),
  }),
  getters: {
    getInstallations(state) {
      return state.installations
    },
  },
  actions: {
    async fetchInstallations() {
      try {
        const resp = await api.getInstallations()
        this.installations = resp
      } catch (err) {
        if (err instanceof ResponseError) {
          alert(err.response.body)
          console.log(err.response.body)
          return
        }

        alert(err)
        console.log(err)
      }
    },
    async createInstallation(name: string) {
      try {
        const postInstallationRequest: PostInstallationRequest = {
          id: uuidv4(),
          name: name,
        }
        await api.createInstallation({ postInstallationRequest })
        this.fetchInstallations()
      } catch (err) {
        if (err instanceof ResponseError) {
          const { error: msg } = await err.response.json()
          alert(msg)
          console.log(msg)
          return
        }

        alert(err)
        console.log(err)
      }
    },
  },
})
