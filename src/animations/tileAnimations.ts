import { globalData } from "../globalData/globalData";
import { gameDictionary } from "../constants/notifications";
import { buttonsCollections, toaster } from "../imports";
import { matchTheSameElements, removeDuplicate, timer } from "../utils";

interface IColorProps {
  wordsPerRow: string;
  secretWord: string;
  index: number;
  row: HTMLElement;
  buttonColors: Array<{ color: string; word: string }>;
  wordsWithNoCopies: string[];
}

class tileAnimationsClass {
  readonly SHORT_ANIMATION_BLOCK = 200;
  readonly INCORRECT_INDEX_RESULT = -1;
  readonly BOTTOM_OF_GAME_GRID = 5;
  readonly END_OF_ARRAY_INDEX = 4;
  readonly TIME_DIVIDER = 2;

  setBlackBorder = (tile: Element) => {
    if (globalData.darkMode) {
      tile.classList.add("dark_mode_text_border");
      return;
    }
    tile.classList.add("black_border");
  };
  removeBlackBorder = (tile: Element) => {
    if (globalData.darkMode) {
      tile.classList.remove("dark_mode_text_border");
      return;
    }
    tile.classList.remove("black_border");
  };
  removeFlipAnimation = (tile: Element) => tile.classList.remove("flip");
  setFlipAnimation = (tile: Element) => tile.classList.add("flip");

  setUndoFlip = (tile: Element) => {
    tile.classList.add("undoflip");
    tile.addEventListener(
      "transitionend",
      () => tile.classList.remove("undoflip"),
      true
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

  jumpTile = (rowCollection: HTMLElement[]) => {
    rowCollection.forEach((tile, index) => {
      setTimeout(() => {
        tile.classList.add("dance");
        tile.addEventListener(
          "animationend",
          () => {
            tile.classList.remove("dance");
          },
          true
        );
      }, timer(index));
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

  setButtonColor = (
    buttonsCollections: NodeListOf<HTMLButtonElement>,
    buttonColors: { color: string; word: string }[]
  ) => {
    const { guessRowsPanel } = JSON.parse(
      localStorage.getItem("words") as string
    );

    const hasNoWords = matchTheSameElements(guessRowsPanel);

    if (hasNoWords) return;

    buttonsCollections.forEach((button) => {
      const index = buttonColors.findIndex(
        (el) => el.word === (button.textContent as string).toLocaleLowerCase()
      );
      if (index === this.INCORRECT_INDEX_RESULT) return;
      const buttonColor = buttonColors[index];
      button.classList.value = "button";
      button.classList.add(buttonColor.color);
    });
  };

  rotateTile = (index: number) => {
    const gameRow = document.getElementById(`${index}`) as HTMLElement;
    const rowCollection = gameRow.querySelectorAll(
      ".row"
    ) as unknown as Array<HTMLElement>;

    const rowData =
      globalData.guessRowsPanel[
        globalData.rowIndex > this.BOTTOM_OF_GAME_GRID
          ? this.BOTTOM_OF_GAME_GRID
          : globalData.rowIndex
      ];
    const wordsPerRow = Array.from(rowCollection)
      .map((el: HTMLElement) => el.childNodes[0].textContent)
      .join("");

    if (wordsPerRow === "") return;
    const buttonColors: Array<{ color: string; word: string }> = [];
    const word = rowData.words.join("").toLocaleLowerCase();

    const wordsWithNoCopies = removeDuplicate(wordsPerRow);
    const secretWord = globalData.secretWord;

    rowCollection.forEach((row, index) => {
      setTimeout(
        () => this.setFlipAnimation(row),
        timer(index, this.TIME_DIVIDER)
      );
      row.addEventListener(
        "transitionend",
        () => {
          const wordsObj = { wordsPerRow, secretWord, index, row };
          this.setColorByTile({ ...wordsObj, buttonColors, wordsWithNoCopies });
          this.removeFlipAnimation(row);
          this.setUndoFlip(row);
          if (index === this.END_OF_ARRAY_INDEX) {
            setTimeout(
              () => this.setButtonColor(buttonsCollections, buttonColors),
              this.SHORT_ANIMATION_BLOCK
            );
          }
          if (
            index === this.END_OF_ARRAY_INDEX &&
            word === secretWord &&
            globalData.gameOver
          )
            this.jumpTile(rowCollection);
        },
        true
      );
    });

    setTimeout(() => {
      if (!globalData.gameOver) return;
      this.createErrorAlert(gameDictionary.YOU_WON);
    }, 1800);
  };

  setColorByTile = (props: IColorProps) => {
    const { wordsPerRow, secretWord, index, row } = props;
    const { buttonColors = [], wordsWithNoCopies } = props;
    if (wordsPerRow.length < this.BOTTOM_OF_GAME_GRID) return;
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
  };

  setTileColor = (index: number, wordStatus?: boolean) => {
    if (!wordStatus) return;
    const gameRow = document.getElementById(`${index}`) as HTMLElement;
    let rowCollection = gameRow.querySelectorAll(".row");
    const collectionsOfRow = rowCollection as unknown as Array<HTMLElement>;
    const wordsPerRow = Array.from(collectionsOfRow)
      .map((el: HTMLElement) => el.childNodes[0].textContent)
      .join("");

    if (wordsPerRow === "") return;
    const wordsWithNoCopies = removeDuplicate(wordsPerRow);
    const secretWord = globalData.secretWord;
    const buttonColors: Array<{ color: string; word: string }> = [];

    collectionsOfRow.forEach((row: HTMLElement, index: number) => {
      const wordsObj = { wordsPerRow, secretWord, index, row };
      this.setColorByTile({ ...wordsObj, buttonColors, wordsWithNoCopies });
    });
    this.setButtonColor(buttonsCollections, buttonColors);
  };
}

export const tileAnimation = new tileAnimationsClass();
export default tileAnimationsClass;
