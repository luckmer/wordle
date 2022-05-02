import {globalData} from "../constants";
import wordColorsClass from "../colors/wordColors";
import dictionary from "../../json/dictionary.json"
import localStoragePanel from "../localStorage/localStorage";


class keyActionsClass extends wordColorsClass {

    handleClickRoot = (e: MouseEvent) => {
        const letter = (e.target as HTMLTextAreaElement).textContent as string;
        switch (letter) {
            case  '«' : {
                this.handleClear();
                break;
            }
            case 'ENTER' : {
                this.handleSubmit();
                break;
            }
            default: {
                this.handleClick(letter);
                break;
            }
        }
    }

    handleClick = (letter: string) => {
        if (globalData.gameRowIndex >= 5) return
        const tile = document.getElementById(`${globalData.rowIndex}.${globalData.gameRowIndex}`) as Element;
        tile.textContent = letter;
        globalData.guessRowsPanel[globalData.rowIndex][globalData.gameRowIndex] = letter;
        globalData.gameRowIndex++
        localStoragePanel.saveArrayOfWords()

    }

    handleClear = () => {
        if (globalData.gameRowIndex <= 0) return
        globalData.gameRowIndex--
        const tile = document.getElementById(`${globalData.rowIndex}.${globalData.gameRowIndex}`) as Element;
        tile.textContent = '';
        globalData.guessRowsPanel[globalData.rowIndex][globalData.gameRowIndex] = '';
        localStoragePanel.saveArrayOfWords()
    }

    handleSubmit = () => {
        try {
            const currentRowPanel = globalData.guessRowsPanel[globalData.rowIndex].includes('')
            if (currentRowPanel) return
            // const secretWord = globalData.secretWord
            const word = globalData.guessRowsPanel[globalData.rowIndex].join("")
            // const word = globalData.guessRowsPanel[globalData.rowIndex].join("")


            if (!dictionary.includes(word)) return
            if (globalData.rowIndex < 5) {
                globalData.rowIndex++
                globalData.gameRowIndex = 0
            }
        } catch (err) {
            console.error(err)
        }

    }
}

export default keyActionsClass


