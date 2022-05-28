const restartSvg = document.querySelector(".restart") as Element;
import randomWord from "../generators/randomWord/randomWordGenerator";
import { globalData, guessRows } from "../constants";
import localStoragePanel from "../localStorage/localStorage";
import guessRowsGenerator from "../generators/guessRows/guessRowsGenerator";
import { timer } from "../utils";

class RestartClass {
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
    globalData.guessRowsPanel.forEach((_, index) => {
      const gameRow = document.getElementById(`${index}`) as HTMLElement;
      let gameRowCollection = gameRow.querySelectorAll(".row");
      gameRowCollection.forEach((rowCollection, index) => {
        const clearArray = setInterval(() => {
          rowCollection.className = "row";
          setTimeout(() => clearInterval(clearArray), timer(index, 2));
        });
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
          button.className = "button";
          setTimeout(() => clearInterval(clearArray), timer(index, 2));
        });
      });
    });
  };

  handleInitiateNewGame = () => {
    this.clearGloblaDataState();
    this.clearGameState();
    this.clearKeyBoardState();
    localStoragePanel.saveArrayOfWords();
    guessRowsGenerator.clearGrid();
  };

  initiateNewGame = () => {
    restartSvg.addEventListener("click", () => this.handleInitiateNewGame());
  };
}

const restart = new RestartClass();
export default restart;
