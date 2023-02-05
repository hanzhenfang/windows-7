import { defineStore } from "pinia"

import { isMobile } from "@/utils/isMobile"

interface RootState {
  isMobile: boolean
}

export const useRootStore = defineStore("root", {
  state: (): RootState => {
    return {
      isMobile: !!isMobile(),
    }
  },
  actions: {
    initStore: () => {},
  },
})
