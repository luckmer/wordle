import {
  BLIND_CORRECT,
  BLIND_PRESENT,
  CORRECT,
  globalData,
  LIGHT_PRIMARY,
  PRESENT,
  PRIMARY,
} from "../globalData/globalData";
import { gameDictionary } from "../constants/notifications";
import { toaster } from "../imports";
import { matchTheSameElements, removeDuplicate, timer } from "../utils";

interface IColorProps {
  wordsPerRow: string;
  secretWord: string;
  index: number;
  row: HTMLElement;
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

  setButtonColor = (buttonsCollections: NodeListOf<HTMLButtonElement>) => {
    const { guessRowsPanel } = JSON.parse(
      localStorage.getItem("words") as string
    );

    const hasNoWords = matchTheSameElements(guessRowsPanel);

    if (hasNoWords) return;
    const noCopies: { color: string; word: string }[] = [];
    const secretWord = globalData.secretWord;
    const correctAnswerColor = globalData.HighContrastModeFlag
      ? BLIND_CORRECT
      : CORRECT;
    const presentAnswerColor = globalData.HighContrastModeFlag
      ? BLIND_PRESENT
      : PRESENT;
    const primaryAnswerColor = globalData.darkMode ? PRIMARY : LIGHT_PRIMARY;

    const buttonColors = globalData.guessRowsPanel
      .map(({ words }) => words)
      .map((wordArray) => {
        return wordArray.map((word, index) => {
          if (secretWord[index] === word[0]) {
            return {
              color: correctAnswerColor,
              word: Array.isArray(word) ? word[0] : word,
            };
          }
          if (secretWord.includes(word[0])) {
            return {
              color: presentAnswerColor,
              word: Array.isArray(word) ? word[0] : word,
            };
          }
          return {
            color: primaryAnswerColor,
            word: Array.isArray(word) ? word[0] : word,
          };
        });
      })
      .reduce(
        (array, isArray) =>
          Array.isArray(array) ? array.concat(isArray) : array,
        []
      );

    for (let i = 0; i < buttonColors.length; i++) {
      const el = buttonColors[i];
      const index = noCopies.findIndex((word) => word.word === el.word);
      if (index === -1) {
        noCopies.push(el);
      } else noCopies[index] = { ...noCopies[index], color: el.color };
    }

    buttonsCollections.forEach((button) => {
      const index = noCopies.findIndex(
        (el) => el.word === button.textContent?.toLocaleLowerCase()
      );
      if (index === -1) return;
      button.classList.value = "button";
      button.classList.add(noCopies[index].color);
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
          this.setColorByTile({ ...wordsObj, wordsWithNoCopies });
          this.removeFlipAnimation(row);
          this.setUndoFlip(row);
          if (index === this.END_OF_ARRAY_INDEX) {
            setTimeout(
              () => this.setButtonColor(document.querySelectorAll("button")),
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
    const { wordsPerRow, index, row } = props;
    const { wordsWithNoCopies } = props;
    if (wordsPerRow.length < this.BOTTOM_OF_GAME_GRID) return;

    const correctAnswerColor = globalData.HighContrastModeFlag
      ? BLIND_CORRECT
      : CORRECT;

    const presentAnswerColor = globalData.HighContrastModeFlag
      ? BLIND_PRESENT
      : PRESENT;

    const primaryAnswerColor = globalData.darkMode ? PRIMARY : LIGHT_PRIMARY;

    const secretWord = globalData.secretWord;

    if (secretWord[index] === wordsPerRow[index]) {
      if (row.classList.contains(presentAnswerColor)) {
        row.classList.remove(presentAnswerColor);
      }
      row.classList.add(correctAnswerColor);

      return;
    }
    if (secretWord.includes(wordsWithNoCopies[index])) {
      if (row.classList.contains(correctAnswerColor)) {
        row.classList.remove(correctAnswerColor);
      }
      row.classList.add(presentAnswerColor);

      return;
    }

    row.classList.add(primaryAnswerColor);
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

    collectionsOfRow.forEach((row: HTMLElement, index: number) => {
      const wordsObj = { wordsPerRow, secretWord, index, row };
      this.setColorByTile({ ...wordsObj, wordsWithNoCopies });
    });
    this.setButtonColor(document.querySelectorAll("button"));
  };
}

export const tileAnimation = new tileAnimationsClass();
export default tileAnimationsClass;
