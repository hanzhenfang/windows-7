//toast 使用方法
//1.在别的vue组件内 import ToastCreator from "@/component/toast/toast.ts"
//2.const toast = new ToastCreator([,options]),
//3.必须添加一个配置对象 {message:"string",duration?:number,position?:string}
//4.然后调用toast.present()方法即可
//5.一般必填 message 选项,如果不填写duration和position,则采用默认值1500ms,和底部

import { h, render } from "vue"
import ShutDownModal from "./ShutDown.vue"

export class ShutDownModalCreator {
  container: HTMLElement
  isShow: boolean
  bodyEl: HTMLBodyElement
  closeModal: () => void
  constructor() {
    this.bodyEl = document.body as HTMLBodyElement
    this.container = document.createElement("div")
    this.closeModal = this.dismiss.bind(this)
    this.isShow = false
  }

  present() {
    const modal = h(ShutDownModal, { closeModal: this.closeModal })
    render(modal, this.container)
    this.bodyEl.insertBefore(this.container, document.body.firstChild!)
    this.isShow = true
    this.bodyEl.addEventListener("click", this.closeModal)

    let timerID: number = -1
    let scaleValue = 0
    timerID = window.setInterval(() => {
      if (scaleValue > 50) {
        clearInterval(timerID)
        return
      }
      scaleValue = scaleValue + 15
      this.bodyEl.style.filter = `grayscale(${scaleValue}%)`
    }, 200)
  }

  dismiss() {
    if (this.container && this.isShow) {
      render(null, this.container)
      document.body.removeChild(this.container)
      this.isShow = false

      this.bodyEl.style.filter = "grayscale(0)"
      document.body?.removeEventListener("click", this.closeModal)
    }
  }
}
