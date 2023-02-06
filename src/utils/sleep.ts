export function sleep(sleepTime: number): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, sleepTime)
  })
}
