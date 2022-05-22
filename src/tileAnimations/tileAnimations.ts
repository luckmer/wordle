import { globalData } from "../constants";
import { removeDuplicate } from "../utils";

const toaster = document.querySelector(".toaster") as Element;

class tileAnimationsClass {
  setBlackBorder = (tile: Element) => tile.classList.add("black_border");
  removeBlackBorder = (tile: Element) => tile.classList.remove("black_border");
  removeFlipAnimation = (tile: Element) => tile.classList.remove("flip");
  setFlipAnimation = (tile: Element) => tile.classList.add("flip");
  setUndoFlip = (tile: Element) => tile.classList.add("undoflip");

  private setColorByTile(
    wordsPerRow: string,
    secretWord: string,
    index: number,
    row: HTMLElement,
    buttonColors: { color: string; word: string }[],
    wordsWithNoCopies: string[]
  ) {
    if (wordsPerRow.length < 5) return;
    if (secretWord[index] === wordsPerRow[index]) {
      row.classList.add("correct");
      buttonColors.push({ color: "correct", word: row.textContent as string });
      return;
    }
    if (secretWord.includes(wordsWithNoCopies[index])) {
      row.classList.add("present");
      buttonColors.push({ color: "present", word: row.textContent as string });
      return;
    }
    row.classList.add("primary");
    buttonColors.push({ color: "primary", word: row.textContent as string });
  }

  private setButtonColor(
    buttonsCollections: NodeListOf<HTMLButtonElement>,
    buttonColors: { color: string; word: string }[]
  ) {
    buttonsCollections.forEach((button) => {
      const index = buttonColors.findIndex(
        (el) => el.word === (button.textContent as string).toLocaleLowerCase()
      );
      if (index === -1) return;
      const buttonColor = buttonColors[index];
      button.classList.add(buttonColor.color);
    });
  }

  changeScale = (tile: Element) => {
    tile.classList.add("size");
    tile.addEventListener("animationend", () => tile.classList.remove("size"), {
      once: true,
    });
  };

  createErrorAlert = (message: string, duration = 750) => {
    const alert = document.createElement("div");
    alert.textContent = message;
    alert.classList.add("alert");
    toaster.prepend(alert);
    setTimeout(() => {
      alert.classList.add("hide");
      alert.addEventListener("transitionend", () => alert.remove());
    }, duration);
  };

  shakeRow = (row: HTMLElement) => {
    row.classList.add("shake");
    row.addEventListener("animationend", () => row.classList.remove("shake"), {
      once: true,
    });
  };

  rotateTile = (index: number) => {
    const gameRow = document.getElementById(`${index}`) as HTMLElement;
    const rowCollection = gameRow.querySelectorAll(
      ".row"
    ) as unknown as Array<HTMLElement>;
    const buttonsCollections = document.querySelectorAll("button");
    const wordsPerRow = Array.from(rowCollection)
      .map((el: HTMLElement) => el.childNodes[0].textContent)
      .join("");

    if (wordsPerRow === "") return;

    const wordsWithNoCopies = removeDuplicate(wordsPerRow);
    const secretWord = globalData.secretWord;
    const buttonColors: Array<{ color: string; word: string }> = [];

    rowCollection.forEach((row, index) => {
      setTimeout(() => this.setFlipAnimation(row), (index * 500) / 2);

      row.addEventListener(
        "transitionend",
        () => {
          this.setColorByTile(
            wordsPerRow,
            secretWord,
            index,
            row,
            buttonColors,
            wordsWithNoCopies
          );
          this.removeFlipAnimation(row);
          this.setUndoFlip(row);
        },
        {
          once: true,
        }
      );
    });
    this.setButtonColor(buttonsCollections, buttonColors);
  };

  jumpTile = (index: number) => {
    console.log(index);
  };

  setTileColor = (index: number) => {
    const gameRow = document.getElementById(`${index}`) as HTMLElement;
    const rowCollection = gameRow.querySelectorAll(
      ".row"
    ) as unknown as Array<HTMLElement>;
    const buttonsCollections = document.querySelectorAll("button");
    const wordsPerRow = Array.from(rowCollection)
      .map((el: HTMLElement) => el.childNodes[0].textContent)
      .join("");

    if (wordsPerRow === "") return;

    const wordsWithNoCopies = removeDuplicate(wordsPerRow);
    const secretWord = globalData.secretWord;
    const buttonColors: Array<{ color: string; word: string }> = [];

    rowCollection.forEach((row: HTMLElement, index: number) => {
      this.setColorByTile(
        wordsPerRow,
        secretWord,
        index,
        row,
        buttonColors,
        wordsWithNoCopies
      );
    });
    this.setButtonColor(buttonsCollections, buttonColors);
  };
}

export const tileAnimation = new tileAnimationsClass();
export default tileAnimationsClass;
