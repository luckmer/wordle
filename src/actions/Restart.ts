import randomWord from "../generators/randomWord/randomWordGenerator";
import { globalData } from "../constants/globalData";
import localStoragePanel from "../localStorage/localStorage";
import { timer } from "../utils";
import restartButtonAnimation from "../animations/restartButtonAnimations";
import { restartSvg } from "../imports";

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
