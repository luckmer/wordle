const restartSvg = document.querySelector(".restart") as Element;
import randomWord from "../generators/randomWord/randomWordGenerator";
import { globalData, guessRows } from "../constants";
import localStoragePanel from "../localStorage/localStorage";
import guessRowsGenerator from "../generators/guessRows/guessRowsGenerator";

class RestartClass {
  handleInitiateNewGame = () => {
    globalData.rowIndex = 0;
    globalData.gameRowIndex = 0;
    globalData.gameOver = false;
    globalData.secretWord = randomWord.returnRandomWord();
    globalData.guessRowsPanel = guessRows;
    localStoragePanel.saveArrayOfWords();
    guessRowsGenerator.clearGrid();
  };

  initiateNewGame = () => {
    restartSvg.addEventListener("click", () => this.handleInitiateNewGame());
  };
}

const restart = new RestartClass();
export default restart;
