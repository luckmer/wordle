const toaster = document.querySelector('.toaster') as Element

class tileAnimationsClass {


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

