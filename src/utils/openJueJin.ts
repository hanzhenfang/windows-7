import { isMobile } from "@/utils/isMobile"

export function openPersonalJueJin() {
  if (isMobile()) {
    window.location.href = "https://juejin.cn/user/3065861918435437"
  } else {
    window.open("https://juejin.cn/user/3065861918435437")
  }
}
