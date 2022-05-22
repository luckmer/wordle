import { globalData } from "../constants";
import { removeDuplicate } from "../utils";

const toaster = document.querySelector(".toaster") as Element;

class tileAnimationsClass {
  setBlackBorder = (tile: Element) => tile.classList.add("black_border");
  removeBlackBorder = (tile: Element) => tile.classList.remove("black_border");
  removeFlipAnimation = (tile: Element) => tile.classList.remove("flip");
  setFlipAnimation = (tile: Element) => tile.classList.add("flip");
  setUndoFlip = (tile: Element) => {
    tile.classList.add("undoflip");
    tile.addEventListener(
      "transitionend",
      () => tile.classList.remove("undoflip"),
      { once: true }
    );
  };

  changeScale = (tile: Element) => {
    tile.classList.add("size");
    tile.addEventListener(
      "animationend",
      () => tile.classList.remove("size"),
      true
    );
  };

  shakeRow = (row: HTMLElement) => {
    row.classList.add("shake");
    row.addEventListener(
      "animationend",
      () => row.classList.remove("shake"),
      true
    );
  };

  setButtonColor(
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

  jumpTile = (rowCollection: HTMLElement[]) => {
    rowCollection.forEach((tile, index) => {
      setTimeout(() => {
        tile.classList.add("dance");
        tile.addEventListener(
          "animationend",
          () => {
            tile.classList.remove("dance");
            if (index === 4) this.createErrorAlert("You win!");
          },
          { once: true }
        );
      }, (index * 500) / 5);
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

  rotateTile = (index: number) => {
    const buttonColors: Array<{ color: string; word: string }> = [];
    const gameRow = document.getElementById(`${index}`) as HTMLElement;
    const rowCollection = gameRow.querySelectorAll(
      ".row"
    ) as unknown as Array<HTMLElement>;
    const rowData =
      globalData.guessRowsPanel[
        globalData.rowIndex > 5 ? 5 : globalData.rowIndex
      ];
    const word = rowData.join("").toLocaleLowerCase();
    const buttonsCollections = document.querySelectorAll("button");

    const wordsPerRow = Array.from(rowCollection)
      .map((el: HTMLElement) => el.childNodes[0].textContent)
      .join("");

    if (wordsPerRow === "") return;

    const wordsWithNoCopies = removeDuplicate(wordsPerRow);
    const secretWord = globalData.secretWord;

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
          if (index === 4 && word === secretWord) {
            this.jumpTile(rowCollection);
          }
        },
        {
          once: true,
        }
      );
    });

    this.setButtonColor(buttonsCollections, buttonColors);
  };

  setColorByTile(
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
