const restartSvg = document.querySelector(".restart") as Element;
import randomWord from "../generators/randomWord/randomWordGenerator";
import { globalData } from "../constants";
import localStoragePanel from "../localStorage/localStorage";
import { timer } from "../utils";
import restartButtonAnimation from "../animations/restartButtonAnimations";

export class RestartClass extends restartButtonAnimation {
  clearGloblaDataState = () => {
    globalData.rowIndex = 0;
    globalData.gameRowIndex = 0;
    globalData.gameOver = false;
    globalData.secretWord = randomWord.returnRandomWord();
    globalData.guessRowsPanel = [
      { words: ["", "", "", "", ""], acceptedWord: false },
      { words: ["", "", "", "", ""], acceptedWord: false },
      { words: ["", "", "", "", ""], acceptedWord: false },
      { words: ["", "", "", "", ""], acceptedWord: false },
      { words: ["", "", "", "", ""], acceptedWord: false },
      { words: ["", "", "", "", ""], acceptedWord: false },
    ];
  };

  clearGameState = () => {
    globalData.guessRowsPanel.forEach((_, rowIndex) => {
      const gameRow = document.getElementById(`${rowIndex}`) as HTMLElement;
      const gameRowCollection = gameRow.querySelectorAll(".row");
      gameRowCollection.forEach((rowCollection, rowCollectionIndex) => {
        this.setFlipClearAnimation(rowCollection, rowCollectionIndex, rowIndex);
      });
    });
  };

  clearKeyBoardState = () => {
    const keyboard = document.querySelector(".row_container") as Element;
    const keyboardRows = keyboard?.querySelectorAll(".row");
    keyboardRows.forEach((keyBoardRow) => {
      const keyBoardButtons = keyBoardRow.querySelectorAll("button");
      keyBoardButtons.forEach((button, index) => {
        const clearArray = setInterval(() => {
          if (button.className === "button action") {
            button.className = "button action";
          } else button.className = "button";
          setTimeout(() => clearInterval(clearArray), timer(index, 2));
        });
      });
    });
  };

  handleInitiateNewGame = () => {
    this.clearGloblaDataState();
    this.clearKeyBoardState();
    this.clearGameState();
    localStoragePanel.saveArrayOfWords();
  };

  initiateNewGame = () => {
    restartSvg.addEventListener("click", (e) => {
      globalData.clearGame = true;
      this.rotateRestartGameIcon(e);
      this.handleInitiateNewGame();
    });
  };
}
const restart = new RestartClass();
export default restart;
