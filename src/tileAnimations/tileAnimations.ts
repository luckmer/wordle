const toaster = document.querySelector('.toaster') as Element

class tileAnimationsClass {

    setBlackBorder = (tile: Element) => {
        tile.classList.add('black_border')
    }

    removeBlackBorder = (tile: Element) => {
        tile.classList.remove('black_border')
    }

    changeScale = (tile: Element) => {
        tile.classList.add("size")
        tile.addEventListener(
          "animationend",
          () => tile.classList.remove("size"),
          {once: true}
        )
    }

    createErrorAlert = (message: string, duration = 500) => {
        const alert = document.createElement("div")
        alert.textContent = message
        alert.classList.add("alert")
        toaster.prepend(alert)
        setTimeout(() => {
            alert.classList.add("hide")
            alert.addEventListener("transitionend", () => alert.remove())
        }, duration)
    }

    shakeRow = (row: HTMLElement) => {
        row.classList.add("shake")
        row.addEventListener(
          "animationend",
          () => row.classList.remove("shake"),
          {once: true}
        )

    }

    setTileColor = () => {

    }
}


export const tileAnimation = new tileAnimationsClass()
export default tileAnimationsClass

