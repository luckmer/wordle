import { globalData, guessRows } from "../constants";
import wordColorsClass from "../tileAnimations/tileAnimations";
import dictionary from "../../json/dictionary.json";
import localStoragePanel from "../localStorage/localStorage";
import randomWord from "../generators/randomWord/randomWordGenerator";
import { tileAnimation } from "../tileAnimations/tileAnimations";

class keyActionsClass extends wordColorsClass {
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
    globalData.guessRowsPanel[globalData.rowIndex][globalData.gameRowIndex] =
      letter;
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
    globalData.guessRowsPanel[globalData.rowIndex][globalData.gameRowIndex] =
      "";
    tileAnimation.removeBlackBorder(tile);
    localStoragePanel.saveArrayOfWords();
  };

  handleNewGame = () => {
    globalData.rowIndex = 0;
    globalData.gameRowIndex = 0;
    globalData.gameOver = false;
    globalData.secretWord = randomWord.returnRandomWord();
    globalData.guessRowsPanel = guessRows;
    localStoragePanel.saveArrayOfWords();
  };

  handleSubmit = () => {
    tileAnimation.rotateTile(globalData.rowIndex);
    tileAnimation.setTileColor(globalData.rowIndex);
    localStoragePanel.saveArrayOfWords();

    if (globalData.gameOver) {
      tileAnimation.createErrorAlert("game over");
      return;
    }

    const rowData =
      globalData.guessRowsPanel[
        globalData.rowIndex > 5 ? 5 : globalData.rowIndex
      ];
    const currentRowPanel = rowData.includes("");
    const word = rowData.join("").toLocaleLowerCase();
    const secretWord = globalData.secretWord;

    if (!dictionary.includes(word) || currentRowPanel) {
      const shakeRow = document.getElementById(
        `${globalData.rowIndex}`
      ) as HTMLElement;
      tileAnimation.shakeRow(shakeRow);
      tileAnimation.createErrorAlert(
        currentRowPanel ? "Not enough letters" : "Not in word list"
      );
      return;
    }

    if (globalData.rowIndex === 5 && word !== secretWord) {
      globalData.gameOver = true;
      return;
    }

    if (word === secretWord) {
      tileAnimation.createErrorAlert("game over");
      globalData.gameOver = true;
      return;
    }

    if (globalData.rowIndex < 5) {
      globalData.rowIndex++;
      globalData.gameRowIndex = 0;
    }
  };
}

export default keyActionsClass;
