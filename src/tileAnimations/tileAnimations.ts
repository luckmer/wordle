class tileAnimationsClass {

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

