const restartSvg = document.querySelector(".restart") as Element;
import randomWord from "../generators/randomWord/randomWordGenerator";
import { globalData } from "../constants";
import localStoragePanel from "../localStorage/localStorage";
import { boardContainer } from "../generators/guessRows/guessRowsGenerator";
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
      let gameRowCollection = gameRow.querySelectorAll(".row");
      gameRowCollection.forEach((rowCollection, rowCollectionIndex) => {
        const clearArray = setInterval(() => {
          rowCollection.className = "row";
          setTimeout(
            () => clearInterval(clearArray),
            timer(rowCollectionIndex, 2)
          );
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
          if (button.className === "button action") {
            button.className = "button action";
          } else button.className = "button";
          setTimeout(() => clearInterval(clearArray), timer(index, 2));
        });
      });
    });
  };

  clearGrid = () => {
    const rows = Array.from(boardContainer.querySelectorAll(".row"));
    rows.forEach((rowElement) => {
      rowElement.classList.value = "row";
      const rowChild = rowElement.childNodes[0] as unknown as Element;
      rowChild.classList.value = "tile";
      rowChild.textContent = "";
    });
  };

  handleInitiateNewGame = () => {
    this.clearGloblaDataState();
    this.clearGameState();
    this.clearKeyBoardState();
    localStoragePanel.saveArrayOfWords();
    this.clearGrid();
  };

  initiateNewGame = () => {
    restartSvg.addEventListener("click", (e) => {
      this.rotateRestartGameIcon(e);
      this.handleInitiateNewGame();
    });
  };
}
const restart = new RestartClass();
export default restart;
