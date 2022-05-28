import { globalData } from "../constants";
import tileAnimations from "../animations/tileAnimations";
import dictionary from "../../json/dictionary.json";
import localStoragePanel from "../localStorage/localStorage";
import { tileAnimation } from "../animations/tileAnimations";
import { gameDictionary } from "../constants/notifications";

class keyActionsClass extends tileAnimations {
  handleClickRoot = (e: MouseEvent) => {
    const letter = (e.target as HTMLTextAreaElement).textContent as string;
    switch (letter) {
      case "«": {
        ``;
        this.handleClear();
        break;
      }
      case "ENTER": {
        this.handleSubmit();
        break;
      }
      default: {
        this.handleClick(letter);
        break;
      }
    }
  };

  handleClick = (letter: string) => {
    if (globalData.gameRowIndex >= 5 || globalData.gameOver) return;

    const tile = document.getElementById(
      `${globalData.rowIndex}.${globalData.gameRowIndex}`
    ) as Element;

    tile.textContent = letter;
    globalData.guessRowsPanel[globalData.rowIndex].words[
      globalData.gameRowIndex
    ] = letter;

    tileAnimation.setBlackBorder(tile);
    tileAnimation.changeScale(tile);
    globalData.gameRowIndex++;
    localStoragePanel.saveArrayOfWords();
  };

  handleClear = () => {
    if (globalData.gameRowIndex <= 0 || globalData.gameOver) return;

    globalData.gameRowIndex--;

    const tile = document.getElementById(
      `${globalData.rowIndex}.${globalData.gameRowIndex}`
    ) as Element;

    tile.textContent = "";
    globalData.guessRowsPanel[globalData.rowIndex].words[
      globalData.gameRowIndex
    ] = "";
    tileAnimation.removeBlackBorder(tile);
    localStoragePanel.saveArrayOfWords();
  };

  handleSubmit = () => {
    const rowData =
      globalData.guessRowsPanel[
        globalData.rowIndex > 5 ? 5 : globalData.rowIndex
      ];
    globalData.guessRowsPanel[
      globalData.rowIndex > 5 ? 5 : globalData.rowIndex
    ].acceptedWord = true;
    const currentRowPanel = rowData.words.includes("");
    const word = rowData.words.join("").toLocaleLowerCase();
    const secretWord = globalData.secretWord;

    if (globalData.gameOver) {
      tileAnimation.createErrorAlert(gameDictionary.GAME_OVER);
      localStoragePanel.saveArrayOfWords();
      return;
    }

    if (!dictionary.includes(word) || currentRowPanel) {
      const shakeRow = document.getElementById(
        `${globalData.rowIndex}`
      ) as HTMLElement;
      tileAnimation.shakeRow(shakeRow);
      tileAnimation.createErrorAlert(
        currentRowPanel
          ? gameDictionary.NOT_ENOUGH_LETTERS
          : gameDictionary.NOT_IN_WORD_LIST
      );
      return;
    }

    if (globalData.rowIndex === 5 && word !== secretWord) {
      tileAnimation.rotateTile(globalData.rowIndex);
      globalData.gameOver = true;
      localStoragePanel.saveArrayOfWords();
      return;
    }

    if (word === secretWord) {
      tileAnimation.rotateTile(globalData.rowIndex);
      localStoragePanel.saveArrayOfWords();
      globalData.gameOver = true;
      return;
    }

    if (globalData.rowIndex < 5) {
      tileAnimation.rotateTile(globalData.rowIndex);
      globalData.rowIndex++;
      globalData.gameRowIndex = 0;
      localStoragePanel.saveArrayOfWords();
    }
  };
}

export default keyActionsClass;
