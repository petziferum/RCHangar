import { useDisplay } from 'vuetify'
import { defineStore } from 'pinia'

export const useAppStore = defineStore("appStore", () => {
    const { mobile } = useDisplay()
  return { mobile }
})