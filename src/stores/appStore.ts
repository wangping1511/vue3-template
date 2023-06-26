import { acceptHMRUpdate, defineStore } from 'pinia'

export const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    count: 0,
  }),
  actions: {

  },
  persist: true,
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAppStore as any, import.meta.hot))
