import { h, render, Ref, ref } from "vue"
import ShutDownModal from "./ShutDown.vue"

export class ShutDownModalCreator {
  container: HTMLElement
  isShow: Ref<boolean>
  bodyEl: HTMLBodyElement
  appEl: HTMLDivElement
  closeModal: () => void
  constructor() {
    this.bodyEl = document.body as HTMLBodyElement
    this.appEl = document.getElementById("app") as HTMLDivElement
    this.container = document.createElement("div")
    this.closeModal = this.dismiss.bind(this)
    this.isShow = ref<boolean>(false)
  }

  present() {
    const modal = h(ShutDownModal, { closeModal: this.closeModal })
    render(modal, this.container)
    this.bodyEl.insertBefore(this.container, document.body.firstChild!)
    this.isShow.value = true
    this.bodyEl.addEventListener("click", this.closeModal)

    let timerID: number = -1
    let scaleValue = 0
    timerID = window.setInterval(() => {
      if (scaleValue > 50) {
        clearInterval(timerID)
        return
      }
      scaleValue = scaleValue + 15
      this.appEl.style.filter = `grayscale(${scaleValue}%)`
    }, 200)
  }

  dismiss() {
    if (this.container && this.isShow.value) {
      render(null, this.container)
      document.body.removeChild(this.container)
      this.isShow.value = false
      this.appEl.style.filter = "grayscale(0)"
      document.body?.removeEventListener("click", this.closeModal)
    }
  }
}
