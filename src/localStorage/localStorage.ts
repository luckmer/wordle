import {globalData} from "../constants";


class localStorageClass {

    saveArrayOfWords = () => {
        const obj = {
            guessRowsPanel: globalData.guessRowsPanel,
            rowIndex: globalData.rowIndex,
            gameRowIndex: globalData.gameRowIndex,
            gameOver: globalData.gameOver,
            secretWord: globalData.secretWord
        }
        localStorage.setItem('words', JSON.stringify(obj))
    }

    loadSavedArray = () => {
        const localStorageData = localStorage.getItem('words')
        if (!localStorageData) return
        const index = JSON.parse(localStorageData)
        globalData.guessRowsPanel = index.guessRowsPanel;
        globalData.rowIndex = index.rowIndex;
        globalData.gameRowIndex = index.gameRowIndex;
        globalData.gameOver = index.gameOver;
        globalData.secretWord = index.secretWord;


    }
}
const localStoragePanel = new localStorageClass()

export default localStoragePanel