import { globalData } from "../constants";
import { removeDuplicate } from "../utils";

const toaster = document.querySelector(".toaster") as Element;

class tileAnimationsClass {
  setBlackBorder = (tile: Element) => {
    tile.classList.add("black_border");
  };

  removeBlackBorder = (tile: Element) => {
    tile.classList.remove("black_border");
  };

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

    rowCollection.forEach((el: HTMLElement, i: number) => {
      if (wordsPerRow.length === 5) {
        if (secretWord[i] === wordsPerRow[i]) {
          el.classList.add("correct");
          buttonColors.push({
            color: "correct",
            word: el.textContent as string,
          });
        } else if (secretWord.includes(wordsWithNoCopies[i])) {
          el.classList.add("present");
          buttonColors.push({
            color: "present",
            word: el.textContent as string,
          });
        } else {
          el.classList.add("primary");
          buttonColors.push({
            color: "primary",
            word: el.textContent as string,
          });
        }
      }
    });
    buttonsCollections.forEach((button) => {
      const index = buttonColors.findIndex(
        (el) => el.word === (button.textContent as string).toLocaleLowerCase()
      );
      if (index === -1) return;
      const buttonColor = buttonColors[index];
      button.classList.add(buttonColor.color);
    });
  };
}

export const tileAnimation = new tileAnimationsClass();
export default tileAnimationsClass;
