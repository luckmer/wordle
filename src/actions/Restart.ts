import randomWord from "../generators/randomWord/randomWordGenerator";
import {
  BLIND_CORRECT,
  BLIND_PRESENT,
  CORRECT,
  globalData,
  LIGHT_PRIMARY,
  PRESENT,
  PRIMARY,
} from "../globalData/globalData";
import localStoragePanel from "../localStorage/localStorage";
import { timer } from "../utils";
import restartButtonAnimation from "../animations/restartButtonAnimations";
import { restartSvg } from "../imports";

export class RestartClass extends restartButtonAnimation {
  clearGloblaDataState = () => {
    globalData.rowIndex = 0;
    globalData.gameRowIndex = 0;
    globalData.gameOver = false;
    globalData.secretWord = "";
    globalData.guessRowsPanel = [
      { words: ["", "", "", "", ""], acceptedWord: false },
      { words: ["", "", "", "", ""], acceptedWord: false },
      { words: ["", "", "", "", ""], acceptedWord: false },
      { words: ["", "", "", "", ""], acceptedWord: false },
      { words: ["", "", "", "", ""], acceptedWord: false },
      { words: ["", "", "", "", ""], acceptedWord: false },
    ];
    globalData.secretWord = randomWord.returnRandomWord();
  };

  clearGameState = () => {
    globalData.isAbleToType = false;
    const arr = globalData.guessRowsPanel
      .map((words, index) => {
        const arrayOfWords = words.words.filter((word) => word !== "");
        const obj = { rowIndex: index, childElementIndex: arrayOfWords.length };
        return arrayOfWords.length ? obj : -1;
      })
      .filter((position) => position !== -1);
    const lastElementIndexesPosition = arr[arr.length - 1] as {
      [key: string]: number;
    };
    globalData.guessRowsPanel.forEach((_, rowIndex) => {
      const gameRow = document.getElementById(`${rowIndex}`) as HTMLElement;
      const gameRowCollection = gameRow.querySelectorAll(".row");
      gameRowCollection.forEach((rowCollection, rowCollectionIndex) => {
        this.setFlipClearAnimation(
          rowCollection,
          rowCollectionIndex,
          rowIndex,
          lastElementIndexesPosition
        );
      });
    });
  };

  clearKeyBoardState = () => {
    const keyboard = document.querySelector(".row_container") as Element;
    const keyboardRows = keyboard?.querySelectorAll(".row");
    const darkMode = globalData.darkMode;
    const HighContrastModeFlag = globalData.HighContrastModeFlag;

    keyboardRows.forEach((keyBoardRow) => {
      const keyBoardButtons = keyBoardRow.querySelectorAll("button");
      keyBoardButtons.forEach((button, index) => {
        const clearArray = setInterval(() => {
          if (darkMode) {
            button.classList.add("darkKeyCaps");
          } else button.classList.remove(LIGHT_PRIMARY);
          if (HighContrastModeFlag) {
            button.classList.remove(BLIND_CORRECT);
            button.classList.remove(BLIND_PRESENT);
          }
          button.classList.remove(PRESENT);
          button.classList.remove(CORRECT);
          button.classList.remove(PRIMARY);
          setTimeout(() => clearInterval(clearArray), timer(index, 2));
        });
      });
    });
  };

  handleInitiateNewGame = () => {
    globalData.secretWord = "";
    this.clearGameState();
    this.clearKeyBoardState();
    this.clearGloblaDataState();
    localStoragePanel.saveArrayOfWords();
  };

  initiateNewGame = () => {
    restartSvg.addEventListener("click", (e) => {
      const hasNoText = globalData.guessRowsPanel
        .map(({ words }) => words.filter((word) => word !== "").length)
        .every((el) => el === 0);
      if (hasNoText) return;
      globalData.clearGame = true;
      this.rotateRestartGameIcon(e);
      this.handleInitiateNewGame();
    });
  };
}
const restart = new RestartClass();
export default restart;
