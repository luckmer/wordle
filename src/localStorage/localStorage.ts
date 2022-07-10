import { globalData } from "../constants/globalData";

interface IObjectInterface {
  rowIndex: number;
  gameRowIndex: number;
  gameOver: boolean;
  secretWord: string;
  guessRowsPanel: {
    words: string[];
    acceptedWord: boolean;
  }[];
  keys: string[][];
}

class localStorageClass {
  saveArrayOfWords = () => {
    const objects: { [key: string]: IObjectInterface } = {};
    Object.keys(globalData).forEach(
      (el, i) => (objects[el] = Object.values(globalData)[i])
    );

    localStorage.setItem("words", JSON.stringify(objects));
  };

  loadSavedArray = () => {
    const localStorageData = localStorage.getItem("words");
    if (!localStorageData) return;
    const index = JSON.parse(localStorageData);
    globalData.darkMode = index.darkMode;
    globalData.guessRowsPanel = index.guessRowsPanel;
    globalData.rowIndex = index.rowIndex;
    globalData.gameRowIndex = index.gameRowIndex;
    globalData.gameOver = index.gameOver;
    globalData.secretWord = index.secretWord;
  };
}
const localStoragePanel = new localStorageClass();

export default localStoragePanel;
